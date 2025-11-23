
import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  FileText,
  Home,
  User,
  Sparkles,
  DollarSign,
  MapPin,
  Briefcase,
  Heart,
  TrendingUp,
  CheckCircle,
  Loader2,
  Image as ImageIcon,
  Lightbulb,
  Ruler,
  MapPinned,
  AlertTriangle,
  Lock,
  Eye, // New icon
  Palette // New icon
} from "lucide-react";
import { motion } from "framer-motion";
import PDFExportButton from "@/features/dossier/components/PDFExportButton";
import Pool3DViewer from "../components/visualization/Pool3DViewer"; // New component
import PropertyImageGallery from "@/features/sales/components/PropertyImageGallery"; // New component
import ROICalculator from "@/features/sales/components/ROICalculator"; // New component
import ConceptComparison from "@/features/sales/components/ConceptComparison"; // New component
import MaterialZoomViewer from "@/features/materials/components/MaterialZoomViewer"; // New component
import TimelineVisualization from "../components/construction/TimelineVisualization"; // New component
import VirtualWalkthrough from "../components/customer/VirtualWalkthrough"; // New component
import CommunicationTimeline from "../components/results/CommunicationTimeline";
import NoCommunicationBlackHole from "../components/results/NoCommunicationBlackHole";

export default function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [submission, setSubmission] = useState(null);
  const [materials, setMaterials] = useState([]); // New state

  const { data: submissions, isLoading, error } = useQuery({
    queryKey: ["submission-by-token", token],
    queryFn: async () => {
      if (!token) return null;
      const results = await base44.entities.OnboardingSubmission.filter(
        { access_token: token },
        "-created_date",
        1
      );
      return results;
    },
    enabled: !!token,
  });

  const { data: allMaterials } = useQuery({ // New query
    queryKey: ['materials'],
    queryFn: () => base44.entities.Material.list(),
    initialData: [],
  });

  useEffect(() => {
    if (submissions && submissions.length > 0) {
      setSubmission(submissions[0]);
    }
  }, [submissions]);

  useEffect(() => { // New useEffect
    if (allMaterials) {
      setMaterials(allMaterials);
    }
  }, [allMaterials]);

  // No token provided
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh p-6">
        <Card className="max-w-md glass">
          <CardContent className="pt-6 text-center">
            <Lock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Required</h2>
            <p className="text-slate-600 mb-6">
              You need a valid access link to view this dossier. Please check your email for the results link.
            </p>
            <Button onClick={() => navigate(createPageUrl("Welcome"))} className="bg-gradient-to-r from-cyan-600 to-blue-600">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-600" />
      </div>
    );
  }

  // Token not found
  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh p-6">
        <Card className="max-w-md glass">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Dossier Not Found</h2>
            <p className="text-slate-600 mb-6">
              This access link is invalid or the dossier has been removed. Please contact Timeless Pools if you believe this is an error.
            </p>
            <Button onClick={() => navigate(createPageUrl("Welcome"))}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl shadow-floating">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  Your Genesis Project Dossier
                </h1>
                <p className="text-slate-600 mt-1">
                  Complete analysis, research, and custom design concepts
                </p>
              </div>
            </div>
            <PDFExportButton submission={submission} />
          </div>
        </motion.div>

        <Tabs defaultValue="concepts" className="space-y-6">
          <TabsList className="glass grid w-full grid-cols-4 lg:grid-cols-11 h-auto p-1">
            <TabsTrigger value="concepts" className="text-xs md:text-sm">Concepts</TabsTrigger>
            <TabsTrigger value="communication" className="text-xs md:text-sm">Next Steps</TabsTrigger>
            <TabsTrigger value="3d" className="text-xs md:text-sm">3D View</TabsTrigger>
            <TabsTrigger value="walkthrough" className="text-xs md:text-sm">Walkthrough</TabsTrigger>
            <TabsTrigger value="materials" className="text-xs md:text-sm">Materials</TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs md:text-sm">Timeline</TabsTrigger>
            <TabsTrigger value="roi" className="text-xs md:text-sm">ROI</TabsTrigger>
            <TabsTrigger value="property" className="text-xs md:text-sm">Property</TabsTrigger>
            <TabsTrigger value="images" className="text-xs md:text-sm">Images</TabsTrigger>
            <TabsTrigger value="gis" className="text-xs md:text-sm">GIS</TabsTrigger>
            <TabsTrigger value="raw" className="text-xs md:text-sm">Data</TabsTrigger>
          </TabsList>

          {/* NEW: Communication & Next Steps Tab */}
          <TabsContent value="communication" className="space-y-6">
            <CommunicationTimeline submission={submission} />
            <NoCommunicationBlackHole submission={submission} />
          </TabsContent>

          {/* Design Concepts Tab */}
          <TabsContent value="concepts" className="space-y-6">
            {submission.design_concepts && submission.design_concepts.length > 0 ? (
              <>
                <div className="glass p-6 rounded-2xl border-2 border-cyan-200/50 mb-6 shadow-soft">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-cyan-600" />
                    Your Custom Design Concepts
                  </h2>
                  <p className="text-slate-700">
                    Based on Timeless Pools' intentional design methodology, we've created {submission.design_concepts.length} unique concepts tailored to your vision, property constraints, and lifestyle.
                  </p>
                </div>

                <ConceptComparison concepts={submission.design_concepts} />

                <div className="grid lg:grid-cols-2 gap-6">
                  {submission.design_concepts.map((concept, idx) => (
                    <ConceptCard
                      key={idx}
                      concept={concept}
                      imageUrl={submission.concept_images?.[idx]}
                      layoutUrl={submission.site_layout_images?.[idx]}
                      index={idx}
                    />
                  ))}
                </div>
              </>
            ) : (
              <LoadingState message="Generating your custom design concepts..." additionalText="This may take 3-5 minutes" />
            )}
          </TabsContent>

          {/* 3D View Tab - New */}
          <TabsContent value="3d" className="space-y-6">
            {submission.design_concepts?.map((concept, idx) => (
              <Pool3DViewer key={idx} concept={concept} />
            ))}
          </TabsContent>

          {/* Virtual Walkthrough Tab - New */}
          <TabsContent value="walkthrough" className="space-y-6">
            {submission.design_concepts?.map((concept, idx) => (
              <VirtualWalkthrough
                key={idx}
                concept={concept}
                images={submission.concept_images}
              />
            ))}
          </TabsContent>

          {/* Materials Tab - New */}
          <TabsContent value="materials">
            <MaterialZoomViewer
              materials={materials}
              selectedMaterials={submission.material_selections}
            />
          </TabsContent>

          {/* Timeline Tab - New */}
          <TabsContent value="timeline">
            <TimelineVisualization
              constructionRoadmap={submission.construction_roadmap}
              startDate={new Date()} // Placeholder for actual start date
            />
          </TabsContent>

          {/* ROI Tab - New */}
          <TabsContent value="roi" className="space-y-6">
            {submission.design_concepts?.map((concept, idx) => (
              <ROICalculator key={idx} submission={submission} concept={concept} />
            ))}
          </TabsContent>

          {/* Property Images Tab - New */}
          <TabsContent value="images">
            <PropertyImageGallery submission={submission} />
          </TabsContent>

          {/* Overview Tab (Original, not used in updated TabsList) 
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SummaryCard
                icon={<User className="w-6 h-6" />}
                title="Contact"
                gradient="from-blue-500 to-cyan-500"
              >
                <InfoItem label="Name" value={submission.contact_name} />
                <InfoItem label="Email" value={submission.contact_email} />
                <InfoItem label="Phone" value={submission.contact_phone} />
              </SummaryCard>

              <SummaryCard
                icon={<MapPin className="w-6 h-6" />}
                title="Property Location"
                gradient="from-purple-500 to-pink-500"
              >
                <InfoItem label="Address" value={submission.property_address} />
                <InfoItem 
                  label="City" 
                  value={`${submission.property_city || ''}, ${submission.property_state || ''}`} 
                />
                <InfoItem label="ZIP" value={submission.property_zip} />
              </SummaryCard>

              <SummaryCard
                icon={<DollarSign className="w-6 h-6" />}
                title="Budget & Timeline"
                gradient="from-emerald-500 to-teal-500"
              >
                <InfoItem label="Budget" value={submission.budget_range} />
                <InfoItem label="Timeline" value={submission.timeline} />
              </SummaryCard>
            </div>
          </TabsContent>
          */}

          {/* Property Research Tab */}
          <TabsContent value="property" className="space-y-6">
            <Card className="border-none shadow-elevated bento-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-cyan-600" />
                  Property Intelligence Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submission.property_data ? (
                  <div className="space-y-4">
                    {submission.property_data.data_disclaimer && (
                      <div className="glass p-4 rounded-xl border-2 border-amber-300/50">
                        <p className="text-sm text-amber-900">
                          <strong>Disclaimer:</strong> {submission.property_data.data_disclaimer}
                        </p>
                      </div>
                    )}

                    <DataSection
                      title="Property Valuation"
                      data={[
                        { label: "Estimated Value", value: submission.property_data.estimated_value },
                        { label: "Tax Assessment", value: submission.property_data.tax_assessment },
                        { label: "Property Type", value: submission.property_data.property_type },
                        { label: "Year Built", value: submission.property_data.year_built },
                      ]}
                    />
                    <DataSection
                      title="Lot Details"
                      data={[
                        { label: "Lot Dimensions", value: submission.property_data.lot_dimensions },
                        { label: "Square Footage", value: submission.property_data.lot_square_footage },
                        { label: "Lot Shape", value: submission.property_data.lot_shape },
                        { label: "Topography", value: submission.property_data.topography },
                        { label: "Zoning", value: submission.property_data.zoning },
                      ]}
                    />
                    <DataSection
                      title="Neighborhood & Market"
                      data={[
                        { label: "Neighborhood Info", value: submission.property_data.neighborhood_info },
                        { label: "Pool Penetration", value: submission.property_data.neighborhood_pool_penetration },
                        { label: "Average Pool Cost", value: submission.property_data.average_pool_cost_zip },
                        { label: "Typical Pool Size", value: submission.property_data.typical_pool_size_area },
                      ]}
                    />
                  </div>
                ) : (
                  <LoadingState message="Property research in progress..." additionalText="This usually takes 2-3 minutes" />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* GIS & Setbacks Tab */}
          <TabsContent value="gis" className="space-y-6">
            <Card className="border-none shadow-elevated bento-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinned className="w-5 h-5 text-cyan-600" />
                  GIS Data & Building Setbacks
                </CardTitle>
                <p className="text-sm text-slate-600 mt-2">
                  Critical constraints from city records and zoning regulations
                </p>
              </CardHeader>
              <CardContent>
                {submission.gis_data ? (
                  <div className="space-y-6">
                    {submission.gis_data.data_disclaimer && (
                      <div className="glass p-4 rounded-xl border-2 border-amber-300/50">
                        <p className="text-sm text-amber-900">
                          <strong>Disclaimer:</strong> {submission.gis_data.data_disclaimer}
                        </p>
                      </div>
                    )}

                    {submission.gis_data.official_plot_map_url && (
                      <div>
                        <h4 className="font-bold mb-2">Official Plot Map</h4>
                        <img
                          src={submission.gis_data.official_plot_map_url}
                          alt="Property plot map"
                          className="w-full rounded-lg border border-slate-300"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                        {submission.gis_data.plot_map_retrieval_notes && (
                          <p className="text-xs text-slate-500 mt-2">{submission.gis_data.plot_map_retrieval_notes}</p>
                        )}
                      </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-4">
                      <SetbackCard label="Front Setback" value={submission.gis_data.front_setback} />
                      <SetbackCard label="Side Setback (L)" value={submission.gis_data.side_setback_left} />
                      <SetbackCard label="Side Setback (R)" value={submission.gis_data.side_setback_right} />
                      <SetbackCard label="Rear Setback" value={submission.gis_data.rear_setback} />
                    </div>

                    <div className="p-5 glass rounded-xl border-2 border-amber-300/50">
                      <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                        <Ruler className="w-5 h-5" />
                        Pool-Specific Setbacks
                      </h4>
                      <p className="text-amber-800">{submission.gis_data.pool_setback || "Standard setbacks apply."}</p>
                    </div>

                    <DataSection
                      title="Additional Constraints"
                      data={[
                        { label: "Parcel Number", value: submission.gis_data.parcel_number },
                        { label: "Legal Description", value: submission.gis_data.legal_description },
                        { label: "Utility Easements", value: submission.gis_data.utility_easements },
                        { label: "HOA Restrictions", value: submission.gis_data.hoa_restrictions },
                        { label: "Buildable Area", value: submission.gis_data.buildable_area_calculation },
                      ]}
                    />
                  </div>
                ) : (
                  <LoadingState message="Researching GIS data..." />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inspiration Tab (Original, not used in updated TabsList)
          <TabsContent value="inspiration" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-cyan-600" />
                  Inspiration Photo Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submission.inspiration_images?.length > 0 ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Your Uploaded Photos ({submission.inspiration_images.length})</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {submission.inspiration_images.map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`Inspiration ${idx + 1}`}
                            className="w-full h-40 object-cover rounded-lg shadow-md"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    </div>

                    {submission.inspiration_analysis && (
                      <div className="space-y-4">
                        <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
                          <h4 className="font-bold text-purple-900 mb-3">AI Analysis</h4>
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-purple-700">Dominant Style:</span>
                              <p className="text-purple-900">{submission.inspiration_analysis.dominant_style || "N/A"}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-purple-700">Overall Aesthetic:</span>
                              <p className="text-purple-900">{submission.inspiration_analysis.overall_aesthetic || "N/A"}</p>
                            </div>
                          </div>
                        </div>

                        {submission.inspiration_analysis.color_palette?.length > 0 && (
                          <div>
                            <strong className="text-sm text-gray-700">Color Palette:</strong>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {submission.inspiration_analysis.color_palette.map((color, idx) => (
                                <Badge key={idx} className="bg-purple-100 text-purple-800">{color}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No inspiration photos were uploaded.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          */}

          {/* Customer Insights Tab (Original, not used in updated TabsList)
          <TabsContent value="customer" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-cyan-600" />
                  Customer Personalization Research
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submission.customer_research ? (
                  <div className="space-y-6">
                    {submission.customer_research.professional_background && (
                      <InsightCard
                        icon={<Briefcase className="w-5 h-5" />}
                        title="Professional Background"
                        content={submission.customer_research.professional_background}
                        color="blue"
                      />
                    )}
                    
                    {submission.customer_research.interests_hobbies?.length > 0 && (
                      <InsightCard
                        icon={<Heart className="w-5 h-5" />}
                        title="Interests & Hobbies"
                        content={
                          <div className="flex flex-wrap gap-2">
                            {submission.customer_research.interests_hobbies.map((interest) => (
                              <Badge key={interest} className="bg-pink-100 text-pink-800">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        }
                        color="pink"
                      />
                    )}

                    {submission.customer_research.personalization_insights && (
                      <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl">
                        <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-cyan-600" />
                          Personalization Insights
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {submission.customer_research.personalization_insights}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <LoadingState message="Customer research in progress..." />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          */}

          {/* Raw Data Tab */}
          <TabsContent value="raw">
            <Card className="border-none shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Complete Raw Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-900 text-emerald-400 p-6 rounded-xl overflow-auto text-xs font-mono max-h-[600px] shadow-inner">
                  {JSON.stringify(submission, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Component definitions
function ConceptCard({ concept, imageUrl, layoutUrl, index }) {
  const colors = ["from-cyan-500 to-blue-500", "from-purple-500 to-fuchsia-500", "from-emerald-500 to-teal-500"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-none shadow-floating card-lift overflow-hidden">
        <div className={`h-1 bg-gradient-to-r ${colors[index % 3]}`} />

        {imageUrl && (
          <div className="relative h-64 overflow-hidden">
            <img src={imageUrl} alt={concept.name} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white mb-1">{concept.name}</h3>
              <p className="text-white/90 text-sm">{concept.tagline}</p>
            </div>
          </div>
        )}

        <CardContent className="p-6 space-y-4">
          <p className="text-slate-700 leading-relaxed">{concept.description}</p>

          {/* Timeless Pools Methodology Insights */}
          {concept.intentional_design_rationale && (
            <div className="p-4 glass rounded-xl border-2 border-cyan-300/50">
              <h4 className="font-semibold text-cyan-900 mb-2">Intentional Design</h4>
              <p className="text-sm text-cyan-800">{concept.intentional_design_rationale}</p>
            </div>
          )}

          {concept.lines_of_sight_analysis && (
            <div className="p-4 glass rounded-xl border-2 border-purple-300/50">
              <h4 className="font-semibold text-purple-900 mb-2">Lines of Sight</h4>
              <p className="text-sm text-purple-800">{concept.lines_of_sight_analysis}</p>
            </div>
          )}

          {concept.traffic_flow_analysis && (
            <div className="p-4 glass rounded-xl border-2 border-emerald-300/50">
              <h4 className="font-semibold text-emerald-900 mb-2">Traffic Flow</h4>
              <p className="text-sm text-emerald-800">{concept.traffic_flow_analysis}</p>
            </div>
          )}

          {layoutUrl && (
            <div>
              <h4 className="font-semibold mb-2">2D Site Layout</h4>
              <img src={layoutUrl} alt="Site layout" className="w-full rounded-lg border border-slate-300" />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-3 neu rounded-xl">
              <span className="text-xs text-slate-500">Pool Size</span>
              <p className="font-semibold text-slate-900">{concept.pool_dimensions || "N/A"}</p>
            </div>
            <div className="p-3 neu rounded-xl">
              <span className="text-xs text-slate-500">Estimated Cost</span>
              <p className="font-semibold text-slate-900">{concept.estimated_cost || "N/A"}</p>
            </div>
          </div>

          {concept.key_features?.length > 0 && (
            <div>
              <strong className="text-sm text-slate-700 mb-2 block">Key Features:</strong>
              <div className="flex flex-wrap gap-2">
                {concept.key_features.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">{feature}</Badge>
                ))}
              </div>
            </div>
          )}

          {concept.why_this_fits && (
            <div className="p-4 glass rounded-xl border-2 border-cyan-300/50">
              <strong className="text-sm text-cyan-900 mb-2 block">Why This Fits You:</strong>
              <p className="text-sm text-cyan-800">{concept.why_this_fits}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SummaryCard({ icon, title, gradient, children }) {
  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} bg-opacity-10 text-white`}>
            {icon}
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {children}
      </CardContent>
    </Card>
  );
}

function SetbackCard({ label, value }) {
  return (
    <div className="p-4 neu text-center">
      <Ruler className="w-6 h-6 text-blue-600 mx-auto mb-2" />
      <span className="text-xs text-slate-600 block mb-1">{label}</span>
      <p className="text-xl font-bold text-slate-900">{value || "N/A"}</p>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <span className="text-xs text-gray-500">{label}</span>
      <p className="font-medium text-gray-900">{value || "—"}</p>
    </div>
  );
}

function DataSection({ title, data }) {
  return (
    <div className="border-l-4 border-cyan-500 pl-4">
      <h4 className="font-semibold text-slate-900 mb-3">{title}</h4>
      <div className="space-y-2">
        {data.map((item, idx) => (
          <div key={idx}>
            <span className="text-sm text-slate-600">{item.label}:</span>
            <p className="text-slate-900 ml-2">{item.value || "Not available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightCard({ icon, title, content, color }) {
  const colorClasses = {
    blue: "from-blue-50 to-cyan-50 border-blue-200",
    pink: "from-pink-50 to-rose-50 border-pink-200",
    purple: "from-purple-50 to-pink-50 border-purple-200",
    emerald: "from-emerald-50 to-teal-50 border-emerald-200",
  };

  return (
    <div className={`p-5 bg-gradient-to-r ${colorClasses[color]} border rounded-xl`}>
      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h4>
      {typeof content === 'string' ? (
        <p className="text-gray-700 leading-relaxed">{content}</p>
      ) : (
        content
      )}
    </div>
  );
}

function LoadingState({ message, additionalText }) {
  return (
    <div className="text-center py-12">
      <Loader2 className="w-12 h-12 animate-spin text-cyan-600 mx-auto mb-4" />
      <p className="text-slate-600">{message}</p>
      {additionalText && <p className="text-sm text-slate-500 mt-2">{additionalText}</p>}
    </div>
  );
}
