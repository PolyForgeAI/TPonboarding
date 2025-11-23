import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Database, Map, Leaf, TrendingUp, Users, Lightbulb, AlertCircle, Image as ImageIcon, Target, ExternalLink } from "lucide-react";

export default function ResearchViewer({ isOpen, onClose, submission }) {
  if (!submission) return null;

  const hasResearch = submission.property_data || submission.gis_data || submission.environmental_analysis;

  if (!hasResearch) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{submission?.contact_name} - No Research Yet</DialogTitle>
          </DialogHeader>
          <div className="py-12 text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-amber-500" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Research Data Available</h3>
            <p className="text-gray-600 mb-6">
              This project hasn't had research run yet. Click "Run Research" to generate comprehensive property and market analysis.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{submission?.contact_name} - Comprehensive Research Analysis</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="concepts" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="concepts">
              <Lightbulb className="w-4 h-4 mr-2" />
              Design Ideas
            </TabsTrigger>
            <TabsTrigger value="photos">
              <ImageIcon className="w-4 h-4 mr-2" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="property">
              <Database className="w-4 h-4 mr-2" />
              Property
            </TabsTrigger>
            <TabsTrigger value="gis">
              <Map className="w-4 h-4 mr-2" />
              GIS
            </TabsTrigger>
            <TabsTrigger value="environmental">
              <Leaf className="w-4 h-4 mr-2" />
              Environment
            </TabsTrigger>
            <TabsTrigger value="market">
              <TrendingUp className="w-4 h-4 mr-2" />
              Market
            </TabsTrigger>
            <TabsTrigger value="customer">
              <Users className="w-4 h-4 mr-2" />
              Customer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="concepts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Lightbulb className="w-6 h-6 text-teal-700" />
                  Preliminary Design Concepts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {submission.design_prompt_sent && (
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                    <details>
                      <summary className="text-sm font-bold text-blue-900 cursor-pointer hover:text-blue-700">🤖 LLM Design Prompt Sent (Click to View)</summary>
                      <pre className="mt-3 text-xs bg-white p-3 rounded border border-blue-200 overflow-x-auto whitespace-pre-wrap">{submission.design_prompt_sent}</pre>
                    </details>
                  </div>
                )}
                {submission.design_concepts && submission.design_concepts.length > 0 ? (
                  submission.design_concepts.map((concept, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border-2 border-teal-200">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{concept.concept_name}</h3>
                        <Badge className="bg-teal-700 text-lg px-4 py-1">{concept.style}</Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-semibold text-gray-700 mb-1">Pool Dimensions</div>
                            <div className="text-lg font-medium text-gray-900">{concept.pool_dimensions}</div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-700 mb-1">Estimated Cost Range</div>
                            <div className="text-lg font-medium text-teal-700">{concept.estimated_cost_range}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2">Key Features</div>
                          <ul className="space-y-1">
                            {concept.key_features?.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-2 text-gray-900">
                                <span className="w-2 h-2 bg-teal-700 rounded-full"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 space-y-4">
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2">Layout Description</div>
                          <p className="text-gray-900 leading-relaxed">{concept.layout_description}</p>
                        </div>
                        
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2">Why This Works</div>
                          <p className="text-gray-900 leading-relaxed">{concept.why_it_fits}</p>
                        </div>

                        {concept.traffic_flow_notes && (
                          <div>
                            <div className="text-sm font-semibold text-gray-700 mb-2">Traffic Flow Considerations</div>
                            <p className="text-gray-700 leading-relaxed italic">{concept.traffic_flow_notes}</p>
                          </div>
                        )}

                        {concept.sight_line_notes && (
                          <div>
                            <div className="text-sm font-semibold text-gray-700 mb-2">Sight Lines & Views</div>
                            <p className="text-gray-700 leading-relaxed italic">{concept.sight_line_notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-center py-8">No design concepts generated yet</p>
                )}

                {submission.preliminary_recommendations && submission.preliminary_recommendations.length > 0 && (
                  <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-xl">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-amber-700" />
                      General Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {submission.preliminary_recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-700 font-bold">•</span>
                          <span className="text-gray-900">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-teal-700" />
                  Property Photos & Visual Research
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Google Maps Embed */}
                {submission.property_data?.property_latitude && submission.property_data?.property_longitude && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">📍 Aerial Satellite View</h4>
                    <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border-2 border-teal-200">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${submission.property_data.property_latitude},${submission.property_data.property_longitude}&zoom=19&maptype=satellite`}
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">🔗 Property Research Links</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {submission.property_data?.google_maps_link && (
                      <a
                        href={submission.property_data.google_maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg transition-all"
                      >
                        <div className="text-3xl">🗺️</div>
                        <div>
                          <div className="font-semibold text-blue-900">Google Maps</div>
                          <div className="text-xs text-blue-700">View property location</div>
                        </div>
                      </a>
                    )}

                    {submission.property_data?.zillow_link && (
                      <a
                        href={submission.property_data.zillow_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg transition-all"
                      >
                        <div className="text-3xl">🏠</div>
                        <div>
                          <div className="font-semibold text-purple-900">Zillow Listing</div>
                          <div className="text-xs text-purple-700">Property details & photos</div>
                        </div>
                      </a>
                    )}

                    {submission.property_data?.redfin_link && (
                      <a
                        href={submission.property_data.redfin_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-lg transition-all"
                      >
                        <div className="text-3xl">🏘️</div>
                        <div>
                          <div className="font-semibold text-red-900">Redfin</div>
                          <div className="text-xs text-red-700">Market data & photos</div>
                        </div>
                      </a>
                    )}

                    {submission.property_data?.google_images_search_link && (
                      <a
                        href={submission.property_data.google_images_search_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg transition-all"
                      >
                        <div className="text-3xl">🖼️</div>
                        <div>
                          <div className="font-semibold text-green-900">Google Images</div>
                          <div className="text-xs text-green-700">Search property images</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {!submission.property_data?.property_latitude && !submission.property_data?.google_maps_link && (
                  <div className="text-center py-8 bg-amber-50 rounded-lg border border-amber-200">
                    <AlertCircle className="w-12 h-12 mx-auto mb-2 text-amber-600" />
                    <p className="text-amber-900 font-medium">No visual data found - run research to generate maps and links</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="property" className="space-y-4">
            <VerboseDataSection
              title="Property Intelligence"
              icon={<Database className="w-5 h-5 text-teal-700" />}
              data={submission.property_data}
            />
          </TabsContent>

          <TabsContent value="gis" className="space-y-4">
            <VerboseDataSection
              title="GIS & Zoning Data"
              icon={<Map className="w-5 h-5 text-teal-700" />}
              data={submission.gis_data}
            />
          </TabsContent>

          <TabsContent value="environmental" className="space-y-4">
            <VerboseDataSection
              title="Environmental Analysis"
              icon={<Leaf className="w-5 h-5 text-teal-700" />}
              data={submission.environmental_analysis}
            />
          </TabsContent>

          <TabsContent value="market" className="space-y-4">
            <VerboseDataSection
              title="Market Analysis"
              icon={<TrendingUp className="w-5 h-5 text-teal-700" />}
              data={submission.market_analysis}
            />
          </TabsContent>

          <TabsContent value="customer" className="space-y-4">
            <VerboseDataSection
              title="Customer Research"
              icon={<Users className="w-5 h-5 text-teal-700" />}
              data={submission.customer_research}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose} className="bg-teal-700">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function VerboseDataSection({ title, icon, data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.llm_prompt_sent && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
            <details>
              <summary className="text-sm font-bold text-blue-900 cursor-pointer hover:text-blue-700">🤖 LLM Prompt Sent (Click to View)</summary>
              <pre className="mt-3 text-xs bg-white p-3 rounded border border-blue-200 overflow-x-auto whitespace-pre-wrap">{data.llm_prompt_sent}</pre>
            </details>
          </div>
        )}
        {data.data_disclaimer && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900 font-medium"><strong>Data Disclaimer:</strong> {data.data_disclaimer}</p>
          </div>
        )}
        <div className="space-y-4">
          {Object.entries(data).map(([key, value]) => {
            if (key === 'data_disclaimer' || key === 'llm_prompt_sent' || 
                key === 'google_maps_link' || key === 'google_maps_satellite_link' || 
                key === 'zillow_link' || key === 'redfin_link' || 
                key === 'google_images_search_link' || key === 'property_latitude' || 
                key === 'property_longitude') return null;
            
            return (
              <div key={key} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="text-sm font-bold text-teal-700 uppercase tracking-wide mb-2">
                  {key.replace(/_/g, ' ')}
                </div>
                <div className="text-base text-gray-900">
                  {Array.isArray(value) ? (
                    <ul className="space-y-1 ml-4">
                      {value.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-teal-700">•</span>
                          <span>{typeof item === 'object' ? JSON.stringify(item, null, 2) : item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : typeof value === 'object' ? (
                    <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>
                  ) : (
                    <span className="leading-relaxed">{value || '—'}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}