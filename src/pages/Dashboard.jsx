import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { 
  Users, 
  CheckCircle, 
  Clock, 
  Search, 
  Eye, 
  Mail, 
  Phone, 
  MapPin,
  Home,
  Briefcase,
  TrendingUp,
  FileDown
} from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => base44.entities.OnboardingSubmission.list("-created_date"),
    initialData: [],
  });

  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.contact_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.property_address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: submissions.length,
    completed: submissions.filter((s) => s.status === "completed").length,
    inProgress: submissions.filter((s) => s.status === "in_progress").length,
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Address", "Budget", "Timeline", "Status", "Submitted Date"];
    const rows = submissions.map(sub => [
      sub.contact_name,
      sub.contact_email,
      sub.contact_phone,
      `${sub.property_address} ${sub.property_city} ${sub.property_state} ${sub.property_zip}`,
      sub.budget_range,
      sub.timeline,
      sub.status,
      format(new Date(sub.created_date), "yyyy-MM-dd")
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell || ''}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pool-onboarding-submissions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Customer Onboarding Dashboard
            </h1>
            <p className="text-gray-600">
              View enriched customer data with automatic property and customer research
            </p>
          </div>
          <Button 
            onClick={exportToCSV}
            variant="outline"
            className="gap-2"
          >
            <FileDown className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-gray-900">
                  {stats.total}
                </span>
                <Users className="w-10 h-10 text-cyan-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Completed (Enriched)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-green-600">
                  {stats.completed}
                </span>
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-amber-600">
                  {stats.inProgress}
                </span>
                <Clock className="w-10 h-10 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Table */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Budget Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Enriched</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{submission.contact_name}</div>
                        <div className="text-sm text-gray-500">
                          {submission.contact_email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {submission.property_address || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        {submission.budget_range || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          submission.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          submission.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }
                      >
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {submission.property_data && submission.customer_research ? (
                        <Badge className="bg-blue-100 text-blue-800">
                          ✓ Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">
                          Processing...
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(submission.created_date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Details Dialog */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={() => setSelectedSubmission(null)}
      >
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Complete Customer Profile & Research</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="property">Property Research</TabsTrigger>
                <TabsTrigger value="customer">Customer Insights</TabsTrigger>
                <TabsTrigger value="vision">Vision & Features</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <Section title="Contact Information" icon={<Mail className="w-5 h-5" />}>
                  <InfoRow label="Name" value={selectedSubmission.contact_name} />
                  <InfoRow label="Email" value={selectedSubmission.contact_email} />
                  <InfoRow label="Phone" value={selectedSubmission.contact_phone} />
                </Section>

                <Section title="Property" icon={<MapPin className="w-5 h-5" />}>
                  <InfoRow
                    label="Address"
                    value={`${selectedSubmission.property_address}, ${selectedSubmission.property_city}, ${selectedSubmission.property_state} ${selectedSubmission.property_zip}`}
                  />
                </Section>

                <Section title="Budget & Timeline">
                  <InfoRow label="Budget Range" value={selectedSubmission.budget_range} />
                  <InfoRow label="Timeline" value={selectedSubmission.timeline} />
                </Section>
              </TabsContent>

              <TabsContent value="property" className="space-y-6 mt-6">
                <Section title="Automated Property Research" icon={<Home className="w-5 h-5" />}>
                  {selectedSubmission.property_data ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <DataCard label="Estimated Value" value={selectedSubmission.property_data.estimated_value} />
                        <DataCard label="Property Type" value={selectedSubmission.property_data.property_type} />
                        <DataCard label="Year Built" value={selectedSubmission.property_data.year_built} />
                        <DataCard label="Lot Size" value={selectedSubmission.property_data.lot_size} />
                        <DataCard label="Zoning" value={selectedSubmission.property_data.zoning} />
                        <DataCard label="Avg Pool Cost (Area)" value={selectedSubmission.property_data.average_pool_cost_area} />
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <strong className="text-blue-900">Neighborhood Info:</strong>
                        <p className="text-sm text-blue-800 mt-2">{selectedSubmission.property_data.neighborhood_info}</p>
                      </div>
                      {selectedSubmission.property_data.easements_notes && (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <strong className="text-amber-900">⚠️ Easements & Restrictions:</strong>
                          <p className="text-sm text-amber-800 mt-2">{selectedSubmission.property_data.easements_notes}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">Property research data not yet available</p>
                  )}
                </Section>
              </TabsContent>

              <TabsContent value="customer" className="space-y-6 mt-6">
                <Section title="Customer Research & Insights" icon={<Briefcase className="w-5 h-5" />}>
                  {selectedSubmission.customer_research ? (
                    <div className="space-y-4">
                      {selectedSubmission.customer_research.professional_background && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <strong className="text-blue-900">Professional Background:</strong>
                          <p className="text-sm text-blue-800 mt-2">{selectedSubmission.customer_research.professional_background}</p>
                        </div>
                      )}
                      {selectedSubmission.customer_research.interests_hobbies?.length > 0 && (
                        <div>
                          <strong className="text-sm text-gray-700">Interests & Hobbies:</strong>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedSubmission.customer_research.interests_hobbies.map(interest => (
                              <Badge key={interest} className="bg-pink-100 text-pink-800">{interest}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedSubmission.customer_research.style_indicators?.length > 0 && (
                        <div>
                          <strong className="text-sm text-gray-700">Style Indicators:</strong>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedSubmission.customer_research.style_indicators.map(style => (
                              <Badge key={style} className="bg-purple-100 text-purple-800">{style}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedSubmission.customer_research.personalization_insights && (
                        <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg">
                          <strong className="text-cyan-900">💡 Personalization Insights:</strong>
                          <p className="text-sm text-cyan-800 mt-2">{selectedSubmission.customer_research.personalization_insights}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">Customer research data not yet available</p>
                  )}
                </Section>
              </TabsContent>

              <TabsContent value="vision" className="space-y-6 mt-6">
                <Section title="Pool Vision">
                  <p className="text-gray-700">{selectedSubmission.pool_vision}</p>
                </Section>

                <Section title="Features">
                  {selectedSubmission.must_haves?.length > 0 && (
                    <div className="mb-4">
                      <strong className="text-sm text-gray-600">Must-Haves:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedSubmission.must_haves.map((feature) => (
                          <Badge key={feature} className="bg-amber-100 text-amber-800">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedSubmission.nice_to_haves?.length > 0 && (
                    <div>
                      <strong className="text-sm text-gray-600">Nice-to-Haves:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedSubmission.nice_to_haves.map((feature) => (
                          <Badge key={feature} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Section>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
      <span className="text-sm font-medium text-gray-600 md:w-40">{label}:</span>
      <span className="text-gray-900">{value || "—"}</span>
    </div>
  );
}

function DataCard({ label, value }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <span className="text-xs text-gray-500">{label}</span>
      <p className="font-semibold text-gray-900 mt-1">{value || "N/A"}</p>
    </div>
  );
}