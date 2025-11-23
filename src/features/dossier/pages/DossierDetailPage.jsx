import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/shared/lib/supabaseClient";
import { DossierService } from "@/features/dossier/services/dossierService";
import AdminLayout from "@/features/admin/components/AdminLayout";
import { motion } from "framer-motion";
import { FileText, AlertTriangle, Lightbulb, TrendingUp, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";

export default function DossierDetail() {
    const { id } = useParams(); // Submission ID
    const [submission, setSubmission] = useState(null);
    const [dossier, setDossier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Fetch Submission
            const { data: subData, error: subError } = await supabase
                .from('OnboardingSubmission')
                .select('*')
                .eq('id', id)
                .single();
            if (subError) throw subError;
            setSubmission(subData);

            // Fetch Dossier
            const dossierData = await DossierService.getDossier(id);
            setDossier(dossierData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        setGenerating(true);
        try {
            const newDossier = await DossierService.generateDossier(id);
            setDossier(newDossier);
        } catch (error) {
            console.error("Failed to generate:", error);
        } finally {
            setGenerating(false);
        }
    };

    if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;
    if (!submission) return <AdminLayout><div>Submission not found</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="mb-6">
                <Link to="/AdminDashboard" className="text-muted-foreground hover:text-primary flex items-center gap-2 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">
                            {submission.contact_name || 'Client'} Dossier
                        </h1>
                        <p className="text-muted-foreground">
                            Strategic analysis for {submission.property_city || 'Unknown Location'} Project
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            {generating ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Lightbulb className="w-4 h-4 mr-2" />}
                            {dossier ? 'Regenerate Analysis' : 'Generate AI Dossier'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Client Profile */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                        <CardHeader>
                            <CardTitle className="font-serif">Client Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-xs uppercase text-muted-foreground font-bold">Contact</label>
                                <div className="text-foreground">{submission.contact_email}</div>
                                <div className="text-foreground">{submission.contact_phone}</div>
                            </div>
                            <Separator className="bg-white/10" />
                            <div>
                                <label className="text-xs uppercase text-muted-foreground font-bold">Vision</label>
                                <p className="text-sm text-foreground italic">"{submission.pool_vision}"</p>
                            </div>
                            <Separator className="bg-white/10" />
                            <div>
                                <label className="text-xs uppercase text-muted-foreground font-bold">Budget & Timeline</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <Badge variant="outline">{submission.budget_range}</Badge>
                                    <Badge variant="outline">{submission.timeline}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: AI Analysis */}
                <div className="lg:col-span-2 space-y-6">
                    {!dossier ? (
                        <Card className="bg-card/50 border-dashed border-white/20 flex items-center justify-center h-64">
                            <div className="text-center text-muted-foreground">
                                <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No analysis generated yet.</p>
                                <Button variant="link" onClick={handleGenerate}>Run AI Analysis</Button>
                            </div>
                        </Card>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            {/* Executive Summary */}
                            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 mb-6">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-primary">
                                        <FileText className="w-5 h-5" /> Executive Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg leading-relaxed text-foreground/90">
                                        {dossier.executive_summary}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Strategy & Insights */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="bg-card/50 border-white/10">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-amber-400">
                                            <Lightbulb className="w-5 h-5" /> Key Insights
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {dossier.key_insights && dossier.key_insights.map((insight, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm">
                                                    <CheckCircle className="w-4 h-4 text-amber-400/50 mt-0.5 shrink-0" />
                                                    {insight}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card/50 border-white/10">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-red-400">
                                            <AlertTriangle className="w-5 h-5" /> Red Flags
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-foreground/80">{dossier.red_flags || "No critical red flags detected."}</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Upsell Opportunities */}
                            <Card className="bg-card/50 border-white/10 mt-6">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-emerald-400">
                                        <TrendingUp className="w-5 h-5" /> Strategic Upsells
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {dossier.upsell_opportunities && dossier.upsell_opportunities.map((opp, i) => (
                                            <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5">
                                                <div className="font-bold text-emerald-400">{opp.item}</div>
                                                <div className="text-xs text-muted-foreground">{opp.reason}</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
