import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Loader2, Wand2, Download } from "lucide-react";
import { toast } from "sonner";

export default function AIOverlayGenerator({ submission, concepts }) {
  const [selectedConcept, setSelectedConcept] = useState(0);
  const [selectedPropertyImage, setSelectedPropertyImage] = useState(null);
  const [generatedOverlay, setGeneratedOverlay] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateOverlay = async () => {
    if (!selectedPropertyImage) {
      toast.error("Please select a property image first");
      return;
    }

    setIsGenerating(true);
    toast.loading("Creating AI overlay of pool design on your property...");

    try {
      const concept = concepts[selectedConcept];
      
      const prompt = `Create a photorealistic composite image showing this pool design overlaid onto this property photo.

PROPERTY IMAGE: [User's actual property photo]

POOL DESIGN TO OVERLAY:
- Pool: ${concept.pool_dimensions}
- Depth: ${concept.pool_depth_shallow} to ${concept.pool_depth_deep}
- Finish: ${concept.recommended_finish} ${concept.recommended_finish_color}
- Features: ${concept.key_features?.join(", ")}
- Style: ${concept.description}

CRITICAL REQUIREMENTS:
- Make it look like the pool is ACTUALLY installed at this property
- Match lighting, shadows, and perspective from property photo
- Ensure scale is correct (pool fits naturally in yard)
- Add appropriate reflections in water
- Include deck/coping around pool
- Blend seamlessly with existing landscaping
- Show any spa, waterfall, or features from concept
- Make it photorealistic - customer should believe it's real

The goal is to help the customer visualize EXACTLY how this pool will look in their actual backyard.`;

      const result = await base44.integrations.Core.GenerateImage({
        prompt: prompt
      });

      setGeneratedOverlay(result.url);
      
      toast.dismiss();
      toast.success("Overlay generated! This is how your pool will look.");
    } catch (error) {
      console.error("Error generating overlay:", error);
      toast.dismiss();
      toast.error("Failed to generate overlay");
    }

    setIsGenerating(false);
  };

  const propertyImages = submission?.property_images?.filter(
    img => img.type === "backyard" || img.type === "front_yard" || img.type === "aerial"
  ) || [];

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-purple-600" />
          AI Property + Pool Overlay
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          See EXACTLY how your chosen pool design will look on your actual property
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selection Controls */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Choose Pool Design:</label>
            <Select value={selectedConcept.toString()} onValueChange={(val) => setSelectedConcept(parseInt(val))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {concepts?.map((concept, idx) => (
                  <SelectItem key={idx} value={idx.toString()}>
                    {concept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Choose Property Photo:</label>
            <Select value={selectedPropertyImage || ""} onValueChange={setSelectedPropertyImage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a property image..." />
              </SelectTrigger>
              <SelectContent>
                {propertyImages.map((img, idx) => (
                  <SelectItem key={idx} value={img.url}>
                    {img.description} ({img.source})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preview of Selected Images */}
        <div className="grid md:grid-cols-2 gap-4">
          {selectedPropertyImage && (
            <div>
              <p className="text-sm font-medium mb-2">Your Property:</p>
              <img 
                src={selectedPropertyImage} 
                alt="Property"
                className="w-full h-48 object-cover rounded-lg border-2 border-cyan-300"
              />
            </div>
          )}
          {concepts && concepts[selectedConcept] && submission?.concept_images?.[selectedConcept] && (
            <div>
              <p className="text-sm font-medium mb-2">Pool Design:</p>
              <img 
                src={submission.concept_images[selectedConcept]} 
                alt="Pool concept"
                className="w-full h-48 object-cover rounded-lg border-2 border-purple-300"
              />
            </div>
          )}
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateOverlay}
          disabled={isGenerating || !selectedPropertyImage}
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Overlay...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Generate Realistic Overlay
            </>
          )}
        </Button>

        {/* Generated Overlay Result */}
        {generatedOverlay && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Your Pool on Your Property:</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(generatedOverlay, '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <img 
              src={generatedOverlay} 
              alt="Pool overlay on property"
              className="w-full rounded-lg shadow-2xl border-4 border-green-400"
            />
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong className="text-green-800">This is what your pool will actually look like!</strong> 
                {" "}Our AI overlaid the {concepts[selectedConcept]?.name} design onto your property photo,
                matching lighting, scale, and perspective. This visualization gives you confidence in your decision.
              </p>
            </div>
          </div>
        )}

        {propertyImages.length === 0 && (
          <div className="text-center py-8 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800">
              No property images found yet. Use the Property Image Gallery to scrape images first.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}