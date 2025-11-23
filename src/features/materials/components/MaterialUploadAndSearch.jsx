import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card } from "@/shared/components/ui/card";
import { Upload, Search, Loader2, ExternalLink, Image as ImageIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

export default function MaterialUploadAndSearch({ onMaterialSelected, category }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [similarResults, setSimilarResults] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Upload the file
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setUploadedImage(file_url);
      toast.success("Image uploaded! Now finding similar materials...");

      // Find similar materials
      await findSimilarMaterials(file_url);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    }
    setIsUploading(false);
  };

  const findSimilarMaterials = async (imageUrl) => {
    setIsSearching(true);
    try {
      // Use LLM to analyze the image and search for similar materials
      const prompt = `Analyze this ${category || 'pool'} material image and find similar products available online.
      
Image URL: ${imageUrl}

Identify:
- Material type (tile, stone, finish, etc.)
- Color palette
- Texture and pattern
- Style (modern, traditional, natural, etc.)
- Brand if visible

Then search for similar products with:
- Product names and manufacturers
- Where to purchase
- Approximate pricing
- Installation considerations

Return structured data with at least 3-5 similar options.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        file_urls: [imageUrl],
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            analysis: {
              type: "object",
              properties: {
                material_type: { type: "string" },
                colors: { type: "array", items: { type: "string" } },
                style: { type: "string" },
                texture: { type: "string" }
              }
            },
            similar_products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  brand: { type: "string" },
                  description: { type: "string" },
                  price_range: { type: "string" },
                  where_to_buy: { type: "string" },
                  url: { type: "string" }
                }
              }
            }
          }
        }
      });

      setSimilarResults(result);
      toast.success(`Found ${result.similar_products?.length || 0} similar materials!`);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to find similar materials");
    }
    setIsSearching(false);
  };

  const handleGoogleLensSearch = () => {
    if (uploadedImage) {
      // Open Google Lens with the uploaded image
      window.open(`https://lens.google.com/uploadbyurl?url=${encodeURIComponent(uploadedImage)}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2 justify-center md:justify-start">
              <ImageIcon className="w-5 h-5 text-cyan-600" />
              Upload Your Inspiration
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Upload a photo of a material you love and we'll find similar options for you
            </p>
            
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                as="span"
                disabled={isUploading}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </>
                )}
              </Button>
            </label>
          </div>

          {uploadedImage && (
            <div className="flex-shrink-0">
              <img
                src={uploadedImage}
                alt="Uploaded material"
                className="w-32 h-32 object-cover rounded-lg border-2 border-white shadow-lg"
              />
              <Button
                onClick={handleGoogleLensSearch}
                variant="outline"
                size="sm"
                className="w-full mt-2"
              >
                <Search className="w-3 h-3 mr-1" />
                Google Lens
              </Button>
            </div>
          )}
        </div>
      </Card>

      {isSearching && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-600 mx-auto mb-3" />
          <p className="text-slate-600">Searching for similar materials...</p>
        </div>
      )}

      {similarResults?.similar_products && similarResults.similar_products.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-slate-900">Similar Materials Found</h4>
            {similarResults.analysis && (
              <div className="text-sm text-slate-600">
                <span className="font-semibold">{similarResults.analysis.style}</span>
                {" • "}
                {similarResults.analysis.colors?.join(", ")}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {similarResults.similar_products.map((product, idx) => (
              <Card key={idx} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-bold text-slate-900">{product.name}</h5>
                    <p className="text-sm text-cyan-600 font-semibold">{product.brand}</p>
                  </div>
                  {product.price_range && (
                    <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                      {product.price_range}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-slate-600 mb-3">{product.description}</p>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => onMaterialSelected && onMaterialSelected(product)}
                    size="sm"
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                  >
                    Select This
                  </Button>
                  {product.url && (
                    <Button
                      as="a"
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      variant="outline"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                
                {product.where_to_buy && (
                  <p className="text-xs text-slate-500 mt-2">
                    Available at: {product.where_to_buy}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}