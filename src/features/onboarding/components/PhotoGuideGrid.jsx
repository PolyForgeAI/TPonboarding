import React, { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Camera, CheckCircle, Info, Upload, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

// Comprehensive photo checklist (inspired by Airbnb property photography guide)
const PHOTO_CHECKLIST = [
  {
    category: "Corner Views",
    description: "Stand in each corner, photograph toward opposite corner",
    photos: [
      { id: "corner_nw_to_se", label: "Northwest → Southeast", priority: "required", icon: "📐" },
      { id: "corner_ne_to_sw", label: "Northeast → Southwest", priority: "required", icon: "📐" },
      { id: "corner_sw_to_ne", label: "Southwest → Northeast", priority: "required", icon: "📐" },
      { id: "corner_se_to_nw", label: "Southeast → Northwest", priority: "required", icon: "📐" },
    ]
  },
  {
    category: "Adjacent Corner Views",
    description: "Capture diagonal perspectives of your space",
    photos: [
      { id: "adjacent_nw_to_ne", label: "Northwest → Northeast", priority: "required", icon: "📐" },
      { id: "adjacent_ne_to_se", label: "Northeast → Southeast", priority: "required", icon: "📐" },
      { id: "adjacent_se_to_sw", label: "Southeast → Southwest", priority: "required", icon: "📐" },
      { id: "adjacent_sw_to_nw", label: "Southwest → Northwest", priority: "required", icon: "📐" },
    ]
  },
  {
    category: "Side Yards & Access",
    description: "Show how you access the backyard",
    photos: [
      { id: "side_yard_left", label: "Left Side Yard", priority: "important", icon: "🚪" },
      { id: "side_yard_right", label: "Right Side Yard", priority: "important", icon: "🚪" },
      { id: "rear_access", label: "Rear Access (if any)", priority: "optional", icon: "🚪" },
    ]
  },
  {
    category: "Utilities & Infrastructure",
    description: "Critical for planning permits and construction",
    photos: [
      { id: "gas_meter", label: "Gas Meter Location", priority: "required", icon: "🔧" },
      { id: "electrical_meter", label: "Electrical Meter", priority: "required", icon: "⚡" },
      { id: "electrical_panel", label: "Inside Electrical Panel (breakers visible)", priority: "required", icon: "⚡" },
      { id: "pool_equipment", label: "Existing Pool Equipment (if remodel)", priority: "conditional", icon: "⚙️" },
    ]
  },
  {
    category: "Front Yard & Approach",
    description: "Shows access for construction trucks and materials",
    photos: [
      { id: "front_yard", label: "Front Yard Overview", priority: "important", icon: "🏡" },
      { id: "driveway", label: "Driveway / Access Path", priority: "important", icon: "🚛" },
      { id: "street_view", label: "Street View of Home", priority: "optional", icon: "🏘️" },
    ]
  },
  {
    category: "House Views",
    description: "How the pool area relates to your home",
    photos: [
      { id: "house_back_wide", label: "Back of House (wide shot)", priority: "required", icon: "🏠" },
      { id: "house_back_close", label: "Back of House (close-up)", priority: "optional", icon: "🏠" },
      { id: "sliding_doors", label: "Doors/Windows to Backyard", priority: "important", icon: "🚪" },
    ]
  },
  {
    category: "Existing Pool (Remodel Only)",
    description: "Comprehensive documentation of current pool",
    photos: [
      { id: "pool_full_view", label: "Full Pool Overview", priority: "conditional", icon: "🏊" },
      { id: "pool_coping_closeup", label: "Coping Close-up", priority: "conditional", icon: "🧱" },
      { id: "pool_tile_closeup", label: "Tile Close-up", priority: "conditional", icon: "🎨" },
      { id: "pool_finish", label: "Pool Finish (underwater if possible)", priority: "conditional", icon: "💎" },
      { id: "pool_deck", label: "Deck Material & Condition", priority: "conditional", icon: "🪵" },
    ]
  }
];

export default function PhotoGuideGrid({ data, updateData }) {
  const [uploadedPhotos, setUploadedPhotos] = useState(data.property_images || []);
  const [uploading, setUploading] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);

  const isRemodel = data.project_type === "remodel" || data.project_type === "addition";

  const handleFileUpload = async (photoId, file) => {
    if (!file) return;

    setUploading(prev => ({ ...prev, [photoId]: true }));
    toast.loading(`Uploading ${file.name}...`);

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      
      const newPhoto = {
        id: photoId,
        url: file_url,
        filename: file.name,
        uploaded_at: new Date().toISOString()
      };

      const updated = [...uploadedPhotos.filter(p => p.id !== photoId), newPhoto];
      setUploadedPhotos(updated);
      updateData({ property_images: updated });

      toast.dismiss();
      toast.success(`✓ ${file.name} uploaded`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.dismiss();
      toast.error("Upload failed. Please try again.");
    }

    setUploading(prev => ({ ...prev, [photoId]: false }));
  };

  const removePhoto = (photoId) => {
    const updated = uploadedPhotos.filter(p => p.id !== photoId);
    setUploadedPhotos(updated);
    updateData({ property_images: updated });
    toast.success("Photo removed");
  };

  const getPhotoForId = (photoId) => uploadedPhotos.find(p => p.id === photoId);

  const getCompletionStats = () => {
    const allPhotos = PHOTO_CHECKLIST.flatMap(cat => cat.photos);
    const requiredPhotos = allPhotos.filter(p => p.priority === "required");
    const importantPhotos = allPhotos.filter(p => p.priority === "important");
    
    const requiredUploaded = requiredPhotos.filter(p => getPhotoForId(p.id)).length;
    const importantUploaded = importantPhotos.filter(p => getPhotoForId(p.id)).length;
    const totalUploaded = uploadedPhotos.length;

    return {
      required: { uploaded: requiredUploaded, total: requiredPhotos.length },
      important: { uploaded: importantUploaded, total: importantPhotos.length },
      total: totalUploaded
    };
  };

  const stats = getCompletionStats();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Property Photo Checklist</h3>
        <p className="text-gray-600 text-lg">
          Follow this guide to capture comprehensive photos. We need these to create accurate designs.
        </p>
      </div>

      {/* Progress Summary */}
      <div className="p-6 glass rounded-2xl border-2 border-cyan-300/50">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-slate-900">Upload Progress</h4>
          <Badge className={stats.required.uploaded === stats.required.total ? "bg-green-600" : "bg-amber-600"}>
            {stats.total} photos uploaded
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-700">Required Photos:</span>
            <span className="font-bold text-slate-900">{stats.required.uploaded} / {stats.required.total}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-700">Important Photos:</span>
            <span className="font-bold text-slate-900">{stats.important.uploaded} / {stats.important.total}</span>
          </div>
        </div>
      </div>

      {/* Photo Guide Tutorial */}
      <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <strong>Photography Tips (inspired by Airbnb's guide):</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Use landscape orientation (hold phone horizontally)</li>
              <li>Shoot during daylight (morning or afternoon best)</li>
              <li>Stand in corners for perspective shots</li>
              <li>Capture wide views, not close-ups (we need context)</li>
              <li>Include the sky in outdoor shots (shows context)</li>
              <li>For utility meters: get close enough to read labels</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Photo Checklist by Category */}
      {PHOTO_CHECKLIST.map((category) => {
        // Skip conditional categories if not applicable
        if (category.category === "Existing Pool (Remodel Only)" && !isRemodel) {
          return null;
        }

        const categoryPhotos = category.photos.filter(p => 
          p.priority !== "conditional" || isRemodel
        );
        const uploadedCount = categoryPhotos.filter(p => getPhotoForId(p.id)).length;
        const isExpanded = expandedCategory === category.category;

        return (
          <Card key={category.category} className="overflow-hidden">
            <button
              onClick={() => setExpandedCategory(isExpanded ? null : category.category)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="text-left">
                <h5 className="font-bold text-slate-900">{category.category}</h5>
                <p className="text-sm text-slate-600">{category.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={uploadedCount === categoryPhotos.length ? "bg-green-600" : "bg-slate-400"}>
                  {uploadedCount} / {categoryPhotos.length}
                </Badge>
                <Camera className="w-5 h-5 text-slate-400" />
              </div>
            </button>

            {isExpanded && (
              <CardContent className="p-4 bg-slate-50 border-t">
                <div className="grid md:grid-cols-2 gap-4">
                  {categoryPhotos.map((photo) => {
                    const uploaded = getPhotoForId(photo.id);
                    const isUploading = uploading[photo.id];

                    return (
                      <div key={photo.id} className={cn(
                        "p-4 rounded-lg border-2 transition-all",
                        uploaded ? "bg-green-50 border-green-300" : "bg-white border-slate-200"
                      )}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{photo.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{photo.label}</p>
                              <Badge variant="outline" className="text-xs mt-1">
                                {photo.priority}
                              </Badge>
                            </div>
                          </div>
                          {uploaded && <CheckCircle className="w-5 h-5 text-green-600" />}
                        </div>

                        {uploaded ? (
                          <div className="space-y-2">
                            <img 
                              src={uploaded.url} 
                              alt={photo.label}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removePhoto(photo.id)}
                              className="w-full"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Remove & Re-upload
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(photo.id, e.target.files[0])}
                              className="hidden"
                              id={`upload-${photo.id}`}
                              disabled={isUploading}
                            />
                            <label htmlFor={`upload-${photo.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full"
                                disabled={isUploading}
                                asChild
                              >
                                <span>
                                  {isUploading ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-600 mr-2" />
                                      Uploading...
                                    </>
                                  ) : (
                                    <>
                                      <Upload className="w-4 h-4 mr-2" />
                                      Upload Photo
                                    </>
                                  )}
                                </span>
                              </Button>
                            </label>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}