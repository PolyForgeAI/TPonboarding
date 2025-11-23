import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import PhotoGuideGrid from "./PhotoGuideGrid";

export default function StepProperty({ data, updateData }) {
  React.useEffect(() => {
    if (!data.property_address) {
      updateData({
        property_address: "",
        property_city: "",
        property_state: "",
        property_zip: "",
      });
    }
  }, []);

  const handleChange = (field, value) => {
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Property Information</h3>
        <p className="text-gray-600 text-lg">
          Tell us about your property and provide photos for accurate design work.
        </p>
      </div>

      <Tabs defaultValue="address" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="address">Address & Details</TabsTrigger>
          <TabsTrigger value="photos">Property Photos</TabsTrigger>
        </TabsList>

        {/* Address Tab */}
        <TabsContent value="address" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Street Address *</Label>
              <Input
                value={data.property_address || ""}
                onChange={(e) => handleChange("property_address", e.target.value)}
                placeholder="123 Main Street"
              />
            </div>
            <div>
              <Label>City *</Label>
              <Input
                value={data.property_city || ""}
                onChange={(e) => handleChange("property_city", e.target.value)}
                placeholder="Newport Beach"
              />
            </div>
            <div>
              <Label>State *</Label>
              <Input
                value={data.property_state || ""}
                onChange={(e) => handleChange("property_state", e.target.value)}
                placeholder="CA"
                maxLength={2}
              />
            </div>
            <div>
              <Label>ZIP Code *</Label>
              <Input
                value={data.property_zip || ""}
                onChange={(e) => handleChange("property_zip", e.target.value)}
                placeholder="92660"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Why we need your address:</strong> We'll use this to research property data, GIS information, 
              setback requirements, and local building codes. This helps us create realistic, buildable designs.
            </p>
          </div>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos">
          <PhotoGuideGrid data={data} updateData={updateData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}