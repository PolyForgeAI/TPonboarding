import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Badge } from "@/shared/components/ui/badge";
import { Switch } from "@/shared/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Plus, Edit, Trash2, Search, Filter, Grid3x3, List, X } from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const CATEGORIES = [
  { value: "pool_shape", label: "Pool Shape" },
  { value: "spa_type", label: "Spa Type" },
  { value: "water_feature", label: "Water Feature" },
  { value: "fire_feature", label: "Fire Feature" },
  { value: "outdoor_kitchen", label: "Outdoor Kitchen" },
  { value: "seating_area", label: "Seating Area" },
  { value: "pergola_shade", label: "Pergola/Shade" },
  { value: "landscaping", label: "Landscaping" },
  { value: "lighting_feature", label: "Lighting Feature" },
  { value: "sports_recreation", label: "Sports/Recreation" }
];

export default function FeatureLibrary() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [imagePreview, setImagePreview] = useState(null);

  const { data: features = [], isLoading } = useQuery({
    queryKey: ['features'],
    queryFn: () => base44.entities.Feature.list('-sort_order', 200),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Feature.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['features'] });
      toast.success("Feature created successfully");
      setEditDialogOpen(false);
      setEditingFeature(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Feature.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['features'] });
      toast.success("Feature updated successfully");
      setEditDialogOpen(false);
      setEditingFeature(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Feature.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['features'] });
      toast.success("Feature deleted");
    },
  });

  const filteredFeatures = features.filter(f => {
    const matchesCategory = selectedCategory === "all" || f.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      f.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  const handleEdit = (feature) => {
    setEditingFeature(feature);
    setEditDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingFeature({
      name: "",
      category: "pool_shape",
      is_active: true,
      sort_order: 0,
      sub_features: [],
      design_considerations: [],
      compatible_with: []
    });
    setEditDialogOpen(true);
  };

  const handleToggleActive = async (feature) => {
    await updateMutation.mutateAsync({
      id: feature.id,
      data: { is_active: !feature.is_active }
    });
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(filteredFeatures);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updates = items.map((item, index) => 
      updateMutation.mutateAsync({
        id: item.id,
        data: { sort_order: index }
      })
    );

    await Promise.all(updates);
  };

  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Feature Library</h1>
          <p className="text-slate-600">Manage things we can build (pool shapes, water features, outdoor kitchens, etc.)</p>
        </div>

        <Card className="mb-6 shadow-elevated">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-64">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  size="icon"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="icon"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={handleCreate} className="bg-gradient-to-r from-cyan-600 to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </CardContent>
        </Card>

        {viewMode === "grid" ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="features-grid" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {filteredFeatures.map((feature, index) => (
                    <Draggable key={feature.id} draggableId={feature.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <FeatureCard
                            feature={feature}
                            onEdit={handleEdit}
                            onDelete={(id) => {
                              if (confirm("Delete this feature?")) deleteMutation.mutate(id);
                            }}
                            onToggleActive={handleToggleActive}
                            onImageClick={setImagePreview}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="features-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {filteredFeatures.map((feature, index) => (
                    <Draggable key={feature.id} draggableId={feature.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <FeatureListItem
                            feature={feature}
                            onEdit={handleEdit}
                            onDelete={(id) => {
                              if (confirm("Delete this feature?")) deleteMutation.mutate(id);
                            }}
                            onToggleActive={handleToggleActive}
                            onImageClick={setImagePreview}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        <FeatureEditDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          feature={editingFeature}
          onSave={(data) => {
            if (editingFeature?.id) {
              updateMutation.mutate({ id: editingFeature.id, data });
            } else {
              createMutation.mutate(data);
            }
          }}
        />

        <Dialog open={!!imagePreview} onOpenChange={() => setImagePreview(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{imagePreview?.name}</DialogTitle>
            </DialogHeader>
            <img src={imagePreview?.image_url} alt={imagePreview?.name} className="w-full rounded-lg" />
            <Button onClick={() => setImagePreview(null)}>Close</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function FeatureCard({ feature, onEdit, onDelete, onToggleActive, onImageClick }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all cursor-move">
      <div 
        className="h-48 bg-slate-100 flex items-center justify-center cursor-pointer"
        onClick={() => onImageClick(feature)}
      >
        {feature.image_url ? (
          <img src={feature.image_url} alt={feature.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-slate-400">No Image</span>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-slate-900">{feature.name}</h3>
          <Switch checked={feature.is_active} onCheckedChange={() => onToggleActive(feature)} />
        </div>
        <Badge variant="outline" className="mb-2">{CATEGORIES.find(c => c.value === feature.category)?.label}</Badge>
        {feature.sub_features?.length > 0 && (
          <p className="text-xs text-slate-600 mb-3">{feature.sub_features.length} sub-features</p>
        )}
        <div className="flex gap-1 flex-wrap mb-3">
          {feature.is_standard && <Badge className="bg-green-600 text-xs">Standard</Badge>}
          {feature.is_popular && <Badge className="bg-blue-600 text-xs">Popular</Badge>}
          {feature.is_premium && <Badge className="bg-purple-600 text-xs">Premium</Badge>}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(feature)} className="flex-1">
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(feature.id)}>
            <Trash2 className="w-3 h-3 text-red-600" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureListItem({ feature, onEdit, onDelete, onToggleActive, onImageClick }) {
  return (
    <Card className="hover:shadow-lg transition-all cursor-move">
      <CardContent className="p-4 flex items-center gap-4">
        <div 
          className="w-24 h-24 bg-slate-100 rounded flex-shrink-0 cursor-pointer"
          onClick={() => onImageClick(feature)}
        >
          {feature.image_url ? (
            <img src={feature.image_url} alt={feature.name} className="w-full h-full object-cover rounded" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900">{feature.name}</h3>
          <div className="flex gap-2 mt-1 flex-wrap">
            <Badge variant="outline">{CATEGORIES.find(c => c.value === feature.category)?.label}</Badge>
            {feature.typical_cost_range && <Badge variant="outline">{feature.typical_cost_range}</Badge>}
          </div>
          {feature.sub_features?.length > 0 && (
            <p className="text-xs text-slate-600 mt-1">{feature.sub_features.length} sub-features</p>
          )}
          <div className="flex gap-1 mt-2 flex-wrap">
            {feature.is_standard && <Badge className="bg-green-600 text-xs">Standard</Badge>}
            {feature.is_popular && <Badge className="bg-blue-600 text-xs">Popular</Badge>}
            {feature.is_premium && <Badge className="bg-purple-600 text-xs">Premium</Badge>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={feature.is_active} onCheckedChange={() => onToggleActive(feature)} />
          <Button size="sm" variant="outline" onClick={() => onEdit(feature)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(feature.id)}>
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureEditDialog({ open, onOpenChange, feature, onSave }) {
  const [formData, setFormData] = useState(feature || {});

  React.useEffect(() => {
    setFormData(feature || {});
  }, [feature]);

  const handleSave = () => {
    onSave(formData);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSubFeature = () => {
    const subFeatures = formData.sub_features || [];
    updateField('sub_features', [...subFeatures, { name: "", description: "", typical_cost: "" }]);
  };

  const updateSubFeature = (idx, field, value) => {
    const subFeatures = [...(formData.sub_features || [])];
    subFeatures[idx] = { ...subFeatures[idx], [field]: value };
    updateField('sub_features', subFeatures);
  };

  const removeSubFeature = (idx) => {
    const subFeatures = [...(formData.sub_features || [])];
    subFeatures.splice(idx, 1);
    updateField('sub_features', subFeatures);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{feature?.id ? "Edit Feature" : "Add Feature"}</DialogTitle>
          <DialogDescription>Configure feature details and sub-features</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input
                value={formData.name || ""}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g., Freeform Pool"
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Select value={formData.category} onValueChange={(val) => updateField('category', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description || ""}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Customer-facing description"
              rows={2}
            />
          </div>

          <div>
            <Label>Image URL (sample photo)</Label>
            <Input
              value={formData.image_url || ""}
              onChange={(e) => updateField('image_url', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Typical Cost Range</Label>
              <Input
                value={formData.typical_cost_range || ""}
                onChange={(e) => updateField('typical_cost_range', e.target.value)}
                placeholder="e.g., $50k-$80k"
              />
            </div>
            <div>
              <Label>Typical Dimensions</Label>
              <Input
                value={formData.typical_dimensions || ""}
                onChange={(e) => updateField('typical_dimensions', e.target.value)}
                placeholder="e.g., 20' x 40'"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <Switch
                checked={formData.is_standard || false}
                onCheckedChange={(val) => updateField('is_standard', val)}
              />
              <span className="text-sm">Standard</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={formData.is_popular || false}
                onCheckedChange={(val) => updateField('is_popular', val)}
              />
              <span className="text-sm">Popular</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={formData.is_premium || false}
                onCheckedChange={(val) => updateField('is_premium', val)}
              />
              <span className="text-sm">Premium</span>
            </label>
          </div>

          <div>
            <Label>Sub-Features</Label>
            <p className="text-xs text-slate-500 mb-2">e.g., for BBQ Island: Grill, Fridge, Sink</p>
            {(formData.sub_features || []).map((subFeature, idx) => (
              <Card key={idx} className="p-3 mb-2">
                <div className="flex gap-2 mb-2">
                  <Input
                    value={subFeature.name || ""}
                    onChange={(e) => updateSubFeature(idx, 'name', e.target.value)}
                    placeholder="Sub-feature name"
                    className="flex-1"
                  />
                  <Button size="icon" variant="ghost" onClick={() => removeSubFeature(idx)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={subFeature.description || ""}
                  onChange={(e) => updateSubFeature(idx, 'description', e.target.value)}
                  placeholder="Description"
                  className="mb-2"
                />
                <Input
                  value={subFeature.typical_cost || ""}
                  onChange={(e) => updateSubFeature(idx, 'typical_cost', e.target.value)}
                  placeholder="Typical cost"
                />
              </Card>
            ))}
            <Button size="sm" variant="outline" onClick={addSubFeature}>+ Add Sub-Feature</Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-700">
            {feature?.id ? "Save Changes" : "Create Feature"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}