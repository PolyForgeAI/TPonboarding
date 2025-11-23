import React, { useState } from "react";
import { supabase } from "@/shared/lib/supabaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { Gift, Plus, Copy, Check } from "lucide-react";
import { format } from "date-fns";

export default function ReferralCodeManager() {
    const [newCode, setNewCode] = useState("");
    const [selectedReferrer, setSelectedReferrer] = useState("");
    const [copiedCode, setCopiedCode] = useState(null);
    const queryClient = useQueryClient();

    // Fetch all referral codes
    const { data: codes, isLoading } = useQuery({
        queryKey: ["referral-codes"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("AccessCode")
                .select(`
          *,
          referrer:OnboardingSubmission!AccessCode_referrer_id_fkey(
            id,
            contact_name,
            contact_email
          )
        `)
                .not("referral_code", "is", null)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });

    // Fetch potential referrers (completed submissions)
    const { data: referrers } = useQuery({
        queryKey: ["potential-referrers"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("OnboardingSubmission")
                .select("id, contact_name, contact_email")
                .eq("status", "completed")
                .order("created_date", { ascending: false })
                .limit(50);

            if (error) throw error;
            return data;
        },
    });

    // Create referral code mutation
    const createCodeMutation = useMutation({
        mutationFn: async ({ code, referrerId }) => {
            const { data, error } = await supabase
                .from("AccessCode")
                .insert({
                    code: code.toUpperCase(),
                    referral_code: code.toUpperCase(),
                    referrer_id: referrerId,
                    is_active: true,
                    max_uses: 1,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["referral-codes"]);
            setNewCode("");
            setSelectedReferrer("");
        },
    });

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const handleCreateCode = () => {
        if (!newCode || !selectedReferrer) return;
        createCodeMutation.mutate({ code: newCode, referrerId: selectedReferrer });
    };

    return (
        <div className="space-y-6">
            <Card className="border-none shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Gift className="w-6 h-6 text-amber-600" />
                        Golden Ticket Referral System
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Referral Code
                            </label>
                            <Input
                                placeholder="FRIEND-VIP"
                                value={newCode}
                                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                                className="font-mono"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Ambassador (Referrer)
                            </label>
                            <select
                                value={selectedReferrer}
                                onChange={(e) => setSelectedReferrer(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
                            >
                                <option value="">Select customer...</option>
                                {referrers?.map((ref) => (
                                    <option key={ref.id} value={ref.id}>
                                        {ref.contact_name} ({ref.contact_email})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            <Button
                                onClick={handleCreateCode}
                                disabled={!newCode || !selectedReferrer || createCodeMutation.isPending}
                                className="w-full bg-amber-600 hover:bg-amber-700"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Generate Code
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
                <CardHeader>
                    <CardTitle>Active Referral Codes</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8 text-gray-500">Loading...</div>
                    ) : codes?.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No referral codes yet. Create one above!
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Ambassador</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {codes?.map((code) => (
                                    <TableRow key={code.id}>
                                        <TableCell>
                                            <span className="font-mono font-bold text-amber-600">
                                                {code.referral_code}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {code.referrer ? (
                                                <div>
                                                    <div className="font-medium">{code.referrer.contact_name}</div>
                                                    <div className="text-sm text-gray-500">{code.referrer.contact_email}</div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">No referrer</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={code.is_active ? "default" : "secondary"}
                                                className={code.is_active ? "bg-green-100 text-green-800" : ""}
                                            >
                                                {code.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {code.created_at ? format(new Date(code.created_at), "MMM d, yyyy") : "—"}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleCopyCode(code.referral_code)}
                                            >
                                                {copiedCode === code.referral_code ? (
                                                    <Check className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
