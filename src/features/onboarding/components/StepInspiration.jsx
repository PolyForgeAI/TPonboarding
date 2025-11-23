import React, { useEffect, useState } from "react";
import { supabase } from "@/shared/lib/supabaseClient";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Image, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function StepInspiration({ data, updateData }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(data.inspiration_images || []);

  useEffect(() => {
    if (!data.inspiration_images) {
      updateData({ inspiration_images: [] });
    }
  }, []);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `submissions/${data.id || 'temp'}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('inspiration-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('inspiration-images')
          .getPublicUrl(filePath);

        return publicUrl;
      });

      const urls = await Promise.all(uploadPromises);

      const newImages = [...uploadedImages, ...urls];
      setUploadedImages(newImages);
      updateData({ inspiration_images: newImages });

      toast.success(`Uploaded ${files.length} image(s)`);
    } catch (error) {
      toast.error("Failed to upload images");
      console.error(error);
    }
    setUploading(false);
  };

  const removeImage = (urlToRemove) => {
    const newImages = uploadedImages.filter(url => url !== urlToRemove);
    setUploadedImages(newImages);
    updateData({ inspiration_images: newImages });
  };

  return (
    <div className="space-y-8">
      {/* Hero Image */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
        <img
          src="https://timelesspools.us/wp-content/uploads/2024/06/J-3.jpg"
          alt="Pool inspiration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent flex items-end p-6">
          <h3 className="text-3xl font-bold text-white">Inspiration Photos</h3>
        </div>
      </div>

      <div>
        <p className="text-gray-600 text-lg">
          Upload photos of pools, outdoor spaces, or design elements you love.
          Our AI will analyze them to understand your aesthetic preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cyan-400 transition-all">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="inspiration-upload"
            disabled={uploading}
          />
          <label htmlFor="inspiration-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              {uploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-cyan-600 animate-spin mb-4" />
                  <p className="text-gray-600">Uploading images...</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-cyan-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Click to upload inspiration photos
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG, or WEBP (max 10MB each)
                  </p>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Uploaded Images Grid */}
        {uploadedImages.length > 0 && (
          <div>
            <Label className="text-base font-medium mb-4 block">
              Your Inspiration Gallery ({uploadedImages.length})
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedImages.map((url, idx) => (
                <Card key={idx} className="relative group overflow-hidden">
                  <img
                    src={url}
                    alt={`Inspiration ${idx + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    onClick={() => removeImage(url)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            <strong>💡 Tip:</strong> Upload photos showing pools, landscaping, outdoor kitchens,
            lighting, water features, or any design elements you admire. The more variety, the better
            we can understand your taste!
          </p>
        </div>
      </div>
    </div>
  );
}