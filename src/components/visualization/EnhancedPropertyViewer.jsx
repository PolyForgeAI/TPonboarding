import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { 
  Image as ImageIcon, 
  Map, 
  Satellite, 
  Camera, 
  RefreshCw, 
  Loader2,
  ExternalLink,
  Download,
  Grid3x3
} from "lucide-react";
import { toast } from "sonner";

export default function EnhancedPropertyViewer({ submission }) {
  const [images, setImages] = useState({
    street_view: [],
    aerial: [],
    listing: [],
    neighborhood: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (submission?.property_images) {
      categorizeImages(submission.property_images);
    }
  }, [submission]);

  const categorizeImages = (allImages) => {
    const categorized = {
      street_view: allImages.filter(img => img.type === "street_view"),
      aerial: allImages.filter(img => img.type === "aerial"),
      listing: allImages.filter(img => img.type === "listing_photo" || img.type === "front_yard" || img.type === "backyard"),
      neighborhood: allImages.filter(img => img.type === "other")
    };
    setImages(categorized);
  };

  const comprehensiveImageScrape = async () => {
    setIsLoading(true);
    toast.loading("Conducting comprehensive property image search...");

    try {
      const address = `${submission.property_address}, ${submission.property_city}, ${submission.property_state} ${submission.property_zip}`;
      
      const prompt = `COMPREHENSIVE PROPERTY IMAGE RESEARCH - Find EVERY available image for:
      ${address}
      
      REQUIRED SOURCES (search ALL of these):
      
      1. GOOGLE SERVICES:
         - Google Street View (front of house, multiple angles if available)
         - Google Earth (aerial/satellite view)
         - Google Maps (nearby streets, context)
      
      2. REAL ESTATE LISTINGS (past & present):
         - Zillow (if property was ever listed)
         - Redfin (if property was ever listed)
         - Realtor.com (if property was ever listed)
         - Trulia (if property was ever listed)
         - MLS photos if available
      
      3. PUBLIC RECORDS:
         - County Assessor photos
         - Permit photos (if renovations done)
         - Tax assessor images
      
      4. SOCIAL MEDIA & USER CONTENT:
         - Instagram location tags near address
         - Facebook Marketplace listings nearby
         - Nextdoor neighborhood photos
      
      5. MAPPING SERVICES:
         - Bing Maps Bird's Eye View
         - Apple Maps Look Around (if available)
         - Mapillary street-level imagery
      
      6. ARCHITECTURAL & DESIGN SITES:
         - Houzz (if property featured)
         - Pinterest (if property pinned)
      
      For EACH image found, provide:
      - Direct URL (must be working, publicly accessible)
      - Source name (e.g., "Google Street View", "Zillow 2019 Listing")
      - Type (street_view, aerial, front_yard, backyard, side_yard, listing_photo, other)
      - Description (what the image shows)
      - Date taken (if available)
      - Quality estimate (high/medium/low)
      
      IMPORTANT: 
      - Only include real, working image URLs
      - Prioritize high-resolution images
      - Include multiple angles if available
      - Note if images are outdated (old listings)
      
      Return as many images as possible - goal is 20-50+ images to give complete property picture.`;

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
                  },
                  date_taken: { type: "string" },
                  quality: { type: "string" }
                }
              }
            },
            search_summary: { type: "string" },
            sources_checked: { type: "array", items: { type: "string" } },
            total_found: { type: "number" },
            notes: { type: "string" }
          }
        }
      });

      const foundImages = result.images || [];
      categorizeImages(foundImages);
      
      // Save to submission
      await base44.entities.OnboardingSubmission.update(submission.id, {
        property_images: foundImages,
        image_sources: {
          search_summary: result.search_summary,
          sources_checked: result.sources_checked,
          total_found: result.total_found,
          notes: result.notes
        }
      });

      toast.dismiss();
      toast.success(`Found ${foundImages.length} property images from ${result.sources_checked?.length || 0} sources!`);
    } catch (error) {
      console.error("Error scraping images:", error);
      toast.dismiss();
      toast.error("Failed to complete image search");
    }

    setIsLoading(false);
  };

  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `property-image-${Date.now()}.jpg`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const ImageGrid = ({ imageList, emptyMessage }) => {
    if (imageList.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imageList.map((img, idx) => (
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
                e.target.parentElement.querySelector('.error-placeholder').style.display = 'flex';
              }}
            />
            <div className="error-placeholder hidden w-full h-48 bg-gray-200 rounded-lg items-center justify-center text-gray-400 text-xs">
              Image unavailable
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-2 left-2 right-2">
              <Badge className="bg-black/70 text-white text-xs">
                {img.source}
              </Badge>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-black/70 text-white text-xs p-2 rounded">
                {img.description}
              </div>
            </div>
            {img.date_taken && (
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-white/90 text-xs">
                  {img.date_taken}
                </Badge>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const totalImages = Object.values(images).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-cyan-600" />
              Complete Property Image Library
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              {totalImages} images from multiple sources
            </p>
          </div>
          <Button
            onClick={comprehensiveImageScrape}
            disabled={isLoading}
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
                Comprehensive Search
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              <Grid3x3 className="w-4 h-4 mr-2" />
              All ({totalImages})
            </TabsTrigger>
            <TabsTrigger value="street">
              <Camera className="w-4 h-4 mr-2" />
              Street ({images.street_view.length})
            </TabsTrigger>
            <TabsTrigger value="aerial">
              <Satellite className="w-4 h-4 mr-2" />
              Aerial ({images.aerial.length})
            </TabsTrigger>
            <TabsTrigger value="listing">
              <ImageIcon className="w-4 h-4 mr-2" />
              Listing ({images.listing.length})
            </TabsTrigger>
            <TabsTrigger value="neighborhood">
              <Map className="w-4 h-4 mr-2" />
              Area ({images.neighborhood.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ImageGrid 
              imageList={[...images.street_view, ...images.aerial, ...images.listing, ...images.neighborhood]}
              emptyMessage="No property images found yet. Click 'Comprehensive Search' to find images."
            />
          </TabsContent>

          <TabsContent value="street">
            <ImageGrid 
              imageList={images.street_view}
              emptyMessage="No street-level images found"
            />
          </TabsContent>

          <TabsContent value="aerial">
            <ImageGrid 
              imageList={images.aerial}
              emptyMessage="No aerial images found"
            />
          </TabsContent>

          <TabsContent value="listing">
            <ImageGrid 
              imageList={images.listing}
              emptyMessage="No listing photos found"
            />
          </TabsContent>

          <TabsContent value="neighborhood">
            <ImageGrid 
              imageList={images.neighborhood}
              emptyMessage="No neighborhood images found"
            />
          </TabsContent>
        </Tabs>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl w-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.description}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/90 text-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-cyan-600 mb-2">{selectedImage.source}</Badge>
                    <p className="text-lg">{selectedImage.description}</p>
                    {selectedImage.date_taken && (
                      <p className="text-sm text-gray-400 mt-1">Taken: {selectedImage.date_taken}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(selectedImage.url);
                      }}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(selectedImage.url, '_blank');
                      }}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                className="absolute top-4 right-4 bg-white text-black hover:bg-gray-200"
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