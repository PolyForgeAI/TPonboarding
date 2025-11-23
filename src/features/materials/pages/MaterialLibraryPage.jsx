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
import { Plus, Edit, Trash2, Search, Filter, Grid3x3, List, X, ChevronRight, ChevronDown, Layers } from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const CATEGORIES = [
  { value: "pool_finish", label: "Pool Finish" },
  { value: "waterline_tile", label: "Waterline Tile" },
  { value: "coping", label: "Coping" },
  { value: "deck_material", label: "Deck Material" },
  { value: "equipment", label: "Equipment" }
];

export default function MaterialLibrary() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [viewMode, setViewMode] = useState("hierarchy");
  const [imagePreview, setImagePreview] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedBrands, setExpandedBrands] = useState({});

  const { data: materials = [], isLoading } = useQuery({
    queryKey: ['materials'],
    queryFn: () => base44.entities.Material.list('-sort_order', 500),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Material.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      toast.success("Material created successfully");
      setEditDialogOpen(false);
      setEditingMaterial(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Material.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      toast.success("Material updated successfully");
      setEditDialogOpen(false);
      setEditingMaterial(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Material.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      toast.success("Material deleted");
    },
  });

  const filteredMaterials = materials.filter(m => {
    const matchesCategory = selectedCategory === "all" || m.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.color_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setEditDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingMaterial({
      name: "",
      category: "pool_finish",
      brand: "",
      product_line: "",
      color_name: "",
      is_active: true,
      sort_order: 0,
      pros: [],
      cons: []
    });
    setEditDialogOpen(true);
  };

  const handleToggleActive = async (material) => {
    await updateMutation.mutateAsync({
      id: material.id,
      data: { is_active: !material.is_active }
    });
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(filteredMaterials);
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

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const toggleBrand = (key) => {
    setExpandedBrands(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    const allCats = {};
    const allBrands = {};
    CATEGORIES.forEach(cat => {
      allCats[cat.value] = true;
      const brandsInCat = [...new Set(filteredMaterials.filter(m => m.category === cat.value).map(m => m.brand))];
      brandsInCat.forEach(brand => {
        allBrands[`${cat.value}-${brand}`] = true;
      });
    });
    setExpandedCategories(allCats);
    setExpandedBrands(allBrands);
  };

  const collapseAll = () => {
    setExpandedCategories({});
    setExpandedBrands({});
  };

  const organizedMaterials = CATEGORIES.map(cat => {
    const materialsInCat = filteredMaterials.filter(m => m.category === cat.value);
    const brandGroups = {};
    
    materialsInCat.forEach(material => {
      const brandKey = material.brand || "Unknown";
      if (!brandGroups[brandKey]) {
        brandGroups[brandKey] = [];
      }
      brandGroups[brandKey].push(material);
    });

    return {
      category: cat,
      brands: Object.entries(brandGroups).map(([brand, mats]) => ({
        brand,
        materials: mats
      }))
    };
  }).filter(group => group.brands.length > 0);

  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Material Library</h1>
          <p className="text-slate-600">Category → Brand → Colors/Styles hierarchy</p>
        </div>

        <Card className="mb-6 shadow-elevated">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search materials, brands, colors..."
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
                  variant={viewMode === "hierarchy" ? "default" : "outline"}
                  onClick={() => setViewMode("hierarchy")}
                  size="icon"
                  title="Hierarchy View"
                >
                  <Layers className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  size="icon"
                  title="Grid View"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="icon"
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={handleCreate} className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Material
              </Button>
            </div>
            {viewMode === "hierarchy" && (
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={expandAll}>Expand All</Button>
                <Button size="sm" variant="outline" onClick={collapseAll}>Collapse All</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {viewMode === "hierarchy" ? (
          <div className="space-y-4">
            {organizedMaterials.map(group => (
              <Card key={group.category.value} className="shadow-elevated">
                <CardHeader 
                  className="cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => toggleCategory(group.category.value)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {expandedCategories[group.category.value] ? (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                      )}
                      <CardTitle className="text-2xl">{group.category.label}</CardTitle>
                      <Badge variant="outline">{group.brands.reduce((sum, b) => sum + b.materials.length, 0)} materials</Badge>
                    </div>
                  </div>
                </CardHeader>
                {expandedCategories[group.category.value] && (
                  <CardContent className="pl-12 space-y-4">
                    {group.brands.map(brandGroup => {
                      const brandKey = `${group.category.value}-${brandGroup.brand}`;
                      return (
                        <div key={brandKey}>
                          <div 
                            className="flex items-center gap-2 mb-3 cursor-pointer hover:bg-slate-50 p-2 rounded"
                            onClick={() => toggleBrand(brandKey)}
                          >
                            {expandedBrands[brandKey] ? (
                              <ChevronDown className="w-4 h-4 text-slate-500" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-500" />
                            )}
                            <h3 className="font-bold text-lg text-slate-900">{brandGroup.brand}</h3>
                            <Badge>{brandGroup.materials.length}</Badge>
                          </div>
                          {expandedBrands[brandKey] && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-6">
                              {brandGroup.materials.map(material => (
                                <MaterialCard
                                  key={material.id}
                                  material={material}
                                  onEdit={handleEdit}
                                  onDelete={(id) => {
                                    if (confirm("Delete this material?")) deleteMutation.mutate(id);
                                  }}
                                  onToggleActive={handleToggleActive}
                                  onImageClick={setImagePreview}
                                  compact
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : viewMode === "grid" ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="materials-grid" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {filteredMaterials.map((material, index) => (
                    <Draggable key={material.id} draggableId={material.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <MaterialCard
                            material={material}
                            onEdit={handleEdit}
                            onDelete={(id) => {
                              if (confirm("Delete this material?")) deleteMutation.mutate(id);
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
            <Droppable droppableId="materials-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {filteredMaterials.map((material, index) => (
                    <Draggable key={material.id} draggableId={material.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <MaterialListItem
                            material={material}
                            onEdit={handleEdit}
                            onDelete={(id) => {
                              if (confirm("Delete this material?")) deleteMutation.mutate(id);
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

        <MaterialEditDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          material={editingMaterial}
          onSave={(data) => {
            if (editingMaterial?.id) {
              updateMutation.mutate({ id: editingMaterial.id, data });
            } else {
              createMutation.mutate(data);
            }
          }}
        />

        <Dialog open={!!imagePreview} onOpenChange={() => setImagePreview(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{imagePreview?.name}</DialogTitle>
              <DialogDescription>{imagePreview?.brand} - {imagePreview?.color_name}</DialogDescription>
            </DialogHeader>
            <img src={imagePreview?.image_url} alt={imagePreview?.name} className="w-full rounded-lg" />
            <Button onClick={() => setImagePreview(null)}>Close</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function MaterialCard({ material, onEdit, onDelete, onToggleActive, onImageClick, compact = false }) {
  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all ${compact ? 'cursor-move' : 'cursor-move'}`}>
      <div 
        className={`${compact ? 'h-32' : 'h-48'} bg-slate-100 flex items-center justify-center cursor-pointer`}
        onClick={() => onImageClick(material)}
      >
        {material.image_url ? (
          <img src={material.image_url} alt={material.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-slate-400 text-xs">No Image</span>
        )}
      </div>
      <CardContent className={compact ? "p-2" : "p-4"}>
        <div className="flex items-start justify-between mb-1">
          <h3 className={`font-bold text-slate-900 ${compact ? 'text-xs' : 'text-sm'}`}>
            {material.color_name || material.name}
          </h3>
          {!compact && <Switch checked={material.is_active} onCheckedChange={() => onToggleActive(material)} />}
        </div>
        {!compact && (
          <>
            <Badge variant="outline" className="text-xs mb-1">{material.brand}</Badge>
            <p className="text-xs text-slate-600 mb-2">{material.water_color || material.style || "—"}</p>
            <div className="flex gap-1 flex-wrap mb-3">
              {material.is_recommended && <Badge className="bg-purple-600 text-xs">Recommended</Badge>}
              {material.is_standard && <Badge className="bg-green-600 text-xs">Standard</Badge>}
              {material.is_popular && <Badge className="bg-blue-600 text-xs">Popular</Badge>}
            </div>
          </>
        )}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(material)} className="flex-1 text-xs">
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          {!compact && (
            <Button size="sm" variant="ghost" onClick={() => onDelete(material.id)}>
              <Trash2 className="w-3 h-3 text-red-600" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function MaterialListItem({ material, onEdit, onDelete, onToggleActive, onImageClick }) {
  return (
    <Card className="hover:shadow-lg transition-all cursor-move">
      <CardContent className="p-4 flex items-center gap-4">
        <div 
          className="w-20 h-20 bg-slate-100 rounded flex-shrink-0 cursor-pointer"
          onClick={() => onImageClick(material)}
        >
          {material.image_url ? (
            <img src={material.image_url} alt={material.name} className="w-full h-full object-cover rounded" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900">{material.name}</h3>
          <div className="flex gap-2 mt-1 flex-wrap">
            <Badge variant="outline">{CATEGORIES.find(c => c.value === material.category)?.label}</Badge>
            <Badge variant="outline">{material.brand}</Badge>
            {material.color_name && <Badge variant="outline">{material.color_name}</Badge>}
            {material.price_indicator && <Badge variant="outline">{material.price_indicator}</Badge>}
          </div>
          <div className="flex gap-1 mt-2 flex-wrap">
            {material.is_recommended && <Badge className="bg-purple-600 text-xs">Recommended</Badge>}
            {material.is_standard && <Badge className="bg-green-600 text-xs">Standard</Badge>}
            {material.is_popular && <Badge className="bg-blue-600 text-xs">Popular</Badge>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={material.is_active} onCheckedChange={() => onToggleActive(material)} />
          <Button size="sm" variant="outline" onClick={() => onEdit(material)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(material.id)}>
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MaterialEditDialog({ open, onOpenChange, material, onSave }) {
  const [formData, setFormData] = useState(material || {});

  React.useEffect(() => {
    setFormData(material || {});
  }, [material]);

  const handleSave = () => {
    onSave(formData);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPro = () => {
    const pros = formData.pros || [];
    updateField('pros', [...pros, ""]);
  };

  const addCon = () => {
    const cons = formData.cons || [];
    updateField('cons', [...cons, ""]);
  };

  const updatePro = (idx, value) => {
    const pros = [...(formData.pros || [])];
    pros[idx] = value;
    updateField('pros', pros);
  };

  const updateCon = (idx, value) => {
    const cons = [...(formData.cons || [])];
    cons[idx] = value;
    updateField('cons', cons);
  };

  const removePro = (idx) => {
    const pros = [...(formData.pros || [])];
    pros.splice(idx, 1);
    updateField('pros', pros);
  };

  const removeCon = (idx) => {
    const cons = [...(formData.cons || [])];
    cons.splice(idx, 1);
    updateField('cons', cons);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{material?.id ? "Edit Material" : "Add Material"}</DialogTitle>
          <DialogDescription>Configure material hierarchy: Category → Brand → Color/Style</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <Label>Brand *</Label>
              <Input
                value={formData.brand || ""}
                onChange={(e) => updateField('brand', e.target.value)}
                placeholder="e.g., Pebble Tec, Pebble Sheen, NPT"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Product Line</Label>
              <Input
                value={formData.product_line || ""}
                onChange={(e) => updateField('product_line', e.target.value)}
                placeholder="e.g., Original, Sheen, Fina"
              />
            </div>
            <div>
              <Label>Color Name</Label>
              <Input
                value={formData.color_name || ""}
                onChange={(e) => updateField('color_name', e.target.value)}
                placeholder="e.g., Tahoe Blue, Caribbean"
              />
            </div>
          </div>

          <div>
            <Label>Display Name *</Label>
            <Input
              value={formData.name || ""}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Full name shown to customers"
            />
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
            <Label>Image URL (REAL manufacturer swatch) *</Label>
            <Input
              value={formData.image_url || ""}
              onChange={(e) => updateField('image_url', e.target.value)}
              placeholder="https://... (get from Pebble Tec, MSI, etc.)"
            />
            {formData.image_url && (
              <img src={formData.image_url} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Water Color</Label>
              <Input
                value={formData.water_color || ""}
                onChange={(e) => updateField('water_color', e.target.value)}
                placeholder="e.g., Medium Blue"
              />
            </div>
            <div>
              <Label>Price Indicator</Label>
              <Select value={formData.price_indicator} onValueChange={(val) => updateField('price_indicator', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$">$ Budget</SelectItem>
                  <SelectItem value="$$">$$ Mid-range</SelectItem>
                  <SelectItem value="$$$">$$$ Premium</SelectItem>
                  <SelectItem value="$$$$">$$$$ Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Style</Label>
              <Input
                value={formData.style || ""}
                onChange={(e) => updateField('style', e.target.value)}
                placeholder="e.g., Modern, Natural"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <Switch
                checked={formData.is_recommended || false}
                onCheckedChange={(val) => updateField('is_recommended', val)}
              />
              <span className="text-sm">Highly Recommended</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={formData.is_standard || false}
                onCheckedChange={(val) => updateField('is_standard', val)}
              />
              <span className="text-sm">Standard Offering</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={formData.is_popular || false}
                onCheckedChange={(val) => updateField('is_popular', val)}
              />
              <span className="text-sm">Popular Choice</span>
            </label>
          </div>

          <div>
            <Label>Pros</Label>
            {(formData.pros || []).map((pro, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={pro}
                  onChange={(e) => updatePro(idx, e.target.value)}
                  placeholder="Pro/benefit"
                />
                <Button size="icon" variant="ghost" onClick={() => removePro(idx)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={addPro}>+ Add Pro</Button>
          </div>

          <div>
            <Label>Cons</Label>
            {(formData.cons || []).map((con, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={con}
                  onChange={(e) => updateCon(idx, e.target.value)}
                  placeholder="Con/consideration"
                />
                <Button size="icon" variant="ghost" onClick={() => removeCon(idx)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={addCon}>+ Add Con</Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            {material?.id ? "Save Changes" : "Create Material"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}