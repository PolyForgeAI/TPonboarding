import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Image as ImageIcon, RefreshCw, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PropertyImageGallery({ submission }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (submission?.property_images) {
      setImages(submission.property_images);
    }
  }, [submission]);

  const scrapePropertyImages = async () => {
    setIsLoading(true);
    toast.loading("Searching for property images online...");

    try {
      const address = `${submission.property_address}, ${submission.property_city}, ${submission.property_state} ${submission.property_zip}`;
      
      const prompt = `Find and list ALL available image URLs for this property from public sources:
      Address: ${address}
      
      Search these sources:
      1. Google Street View - front of house
      2. Zillow listing photos (if available)
      3. Redfin listing photos (if available)
      4. Realtor.com photos
      5. Google Earth satellite view
      6. County assessor photos
      7. Any other real estate listing sites
      
      For each image found, provide:
      - Direct image URL
      - Source (Zillow, Street View, etc.)
      - Description (front yard, backyard, aerial, etc.)
      
      Return as many real, working image URLs as possible. These will be used to show the customer what their property looks like.
      
      IMPORTANT: Only include actual working image URLs that are publicly accessible.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            images: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  url: { type: "string" },
                  source: { type: "string" },
                  description: { type: "string" },
                  type: { 
                    type: "string",
                    enum: ["street_view", "aerial", "front_yard", "backyard", "side_yard", "listing_photo", "other"]
                  }
                }
              }
            },
            street_view_url: { type: "string" },
            google_maps_url: { type: "string" },
            zillow_url: { type: "string" },
            notes: { type: "string" }
          }
        }
      });

      const foundImages = result.images || [];
      
      // Add Google Street View if we have coordinates
      if (result.street_view_url) {
        foundImages.unshift({
          url: result.street_view_url,
          source: "Google Street View",
          description: "Front of property",
          type: "street_view"
        });
      }

      setImages(foundImages);
      
      // Save to submission
      await base44.entities.OnboardingSubmission.update(submission.id, {
        property_images: foundImages,
        image_sources: {
          google_maps_url: result.google_maps_url,
          zillow_url: result.zillow_url,
          notes: result.notes
        }
      });

      toast.dismiss();
      toast.success(`Found ${foundImages.length} property images!`);
    } catch (error) {
      console.error("Error scraping images:", error);
      toast.dismiss();
      toast.error("Failed to find property images");
    }

    setIsLoading(false);
  };

  const sourceColors = {
    "Google Street View": "bg-blue-100 text-blue-800",
    "Zillow": "bg-green-100 text-green-800",
    "Redfin": "bg-red-100 text-red-800",
    "Realtor.com": "bg-purple-100 text-purple-800",
    "Google Earth": "bg-cyan-100 text-cyan-800",
    "County Assessor": "bg-amber-100 text-amber-800"
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-600" />
            Property Images
          </CardTitle>
          <Button
            onClick={scrapePropertyImages}
            disabled={isLoading}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-cyan-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Find Property Images
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Automatically scraped from Zillow, Google Street View, and other public sources
        </p>
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No property images found yet</p>
            <Button onClick={scrapePropertyImages} disabled={isLoading}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Search for Images
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.url}
                    alt={img.description}
                    className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">Image unavailable</div>';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className={sourceColors[img.source] || "bg-gray-100 text-gray-800"}>
                      {img.source}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/70 text-white text-xs p-2 rounded">
                      {img.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-sm text-gray-600">
                {images.length} images found
              </span>
              <Button onClick={scrapePropertyImages} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Images
              </Button>
            </div>
          </>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.description}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className={sourceColors[selectedImage.source] || "bg-gray-100 text-gray-800"}>
                      {selectedImage.source}
                    </Badge>
                    <p className="mt-2">{selectedImage.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(selectedImage.url, '_blank');
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button
                className="absolute top-4 right-4 bg-white text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}