import React, { useEffect } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { User, Mail, Phone, Home, MapPin, Building, Users } from "lucide-react";

const PROJECT_TYPES = [
  { value: "new_construction", label: "New Pool", description: "Starting from scratch" },
  { value: "remodel", label: "Remodel Existing", description: "Updating current pool" },
  { value: "addition", label: "Addition", description: "Adding features to existing" }
];

export default function StepGetToKnowYou({ data, updateData }) {
  useEffect(() => {
    if (!data.contact_name) {
      updateData({
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        project_type: "",
        property_address: "",
        property_city: "",
        property_state: "",
        property_zip: "",
        decision_makers: []
      });
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Image */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
        <img
          src="https://timelesspools.us/wp-content/uploads/2025/03/Modern-Infinity-Edge-Pool.jpg"
          alt="Elegant poolside setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent flex items-end p-6">
          <h3 className="text-3xl font-bold text-white">Let's Get to Know You</h3>
        </div>
      </div>

      <p className="text-gray-600 text-lg">
        Help us understand who you are and what type of project you're considering.
      </p>

      {/* Contact Information */}
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-gray-900 border-b pb-2">Contact Information</h4>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-teal-700" />
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="John Smith"
            value={data.contact_name || ""}
            onChange={(e) => updateData({ contact_name: e.target.value })}
            className="h-12 text-base"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-700" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={data.contact_email || ""}
              onChange={(e) => updateData({ contact_email: e.target.value })}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-700" />
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={data.contact_phone || ""}
              onChange={(e) => updateData({ contact_phone: e.target.value })}
              className="h-12 text-base"
            />
          </div>
        </div>
      </div>

      {/* Project Type */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900 border-b pb-2">Project Type</h4>
        <RadioGroup
          value={data.project_type || ""}
          onValueChange={(value) => updateData({ project_type: value })}
          className="grid md:grid-cols-3 gap-4"
        >
          {PROJECT_TYPES.map((type) => (
            <div key={type.value} className="relative">
              <RadioGroupItem value={type.value} id={type.value} className="sr-only peer" />
              <Label
                htmlFor={type.value}
                className="flex flex-col p-4 rounded-xl border-2 border-gray-200 cursor-pointer peer-data-[state=checked]:border-teal-700 peer-data-[state=checked]:bg-teal-50 hover:border-gray-300 transition-all"
              >
                <Building className="w-6 h-6 text-teal-700 mb-2" />
                <span className="font-semibold text-gray-900">{type.label}</span>
                <span className="text-sm text-gray-600">{type.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Property Information */}
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-gray-900 border-b pb-2">Property Location</h4>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-base font-medium flex items-center gap-2">
            <Home className="w-4 h-4 text-teal-700" />
            Street Address
          </Label>
          <Input
            id="address"
            placeholder="123 Main Street"
            value={data.property_address || ""}
            onChange={(e) => updateData({ property_address: e.target.value })}
            className="h-12 text-base"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="city" className="text-base font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-700" />
              City
            </Label>
            <Input
              id="city"
              placeholder="Newport Beach"
              value={data.property_city || ""}
              onChange={(e) => updateData({ property_city: e.target.value })}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-base font-medium">State</Label>
            <Input
              id="state"
              placeholder="CA"
              value={data.property_state || ""}
              onChange={(e) => updateData({ property_state: e.target.value })}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zip" className="text-base font-medium">ZIP</Label>
            <Input
              id="zip"
              placeholder="92660"
              value={data.property_zip || ""}
              onChange={(e) => updateData({ property_zip: e.target.value })}
              className="h-12 text-base"
            />
          </div>
        </div>
      </div>

      {/* Decision Makers */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-700" />
          Who will be involved in design decisions?
        </h4>

        <RadioGroup
          value={data.decision_maker_count || "1"}
          onValueChange={(value) => {
            const count = parseInt(value);
            updateData({
              decision_maker_count: value,
              decision_makers: count === 1 ? [{ name: data.contact_name || "" }] : [{ name: "" }, { name: "" }]
            });
          }}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="one-person" />
            <Label htmlFor="one-person" className="cursor-pointer">Just me</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="two-people" />
            <Label htmlFor="two-people" className="cursor-pointer">Two people (e.g., me and spouse/partner)</Label>
          </div>
        </RadioGroup>

        {data.decision_maker_count === "2" && (
          <div className="space-y-4 mt-4 p-4 bg-teal-50 rounded-xl border-2 border-teal-200">
            <p className="text-sm text-teal-900 font-medium">Please provide names so we can capture preferences from both decision makers:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Person 1 Name</Label>
                <Input
                  placeholder="Your name"
                  value={data.decision_makers?.[0]?.name || ""}
                  onChange={(e) => {
                    const makers = [...(data.decision_makers || [{ name: "" }, { name: "" }])];
                    makers[0] = { name: e.target.value };
                    updateData({ decision_makers: makers });
                  }}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Person 2 Name</Label>
                <Input
                  placeholder="Partner/spouse name"
                  value={data.decision_makers?.[1]?.name || ""}
                  onChange={(e) => {
                    const makers = [...(data.decision_makers || [{ name: "" }, { name: "" }])];
                    makers[1] = { name: e.target.value };
                    updateData({ decision_makers: makers });
                  }}
                  className="h-10"
                />
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500">
          {data.decision_maker_count === "2"
            ? "We'll ask each person separately about their priorities and preferences."
            : "This helps us understand whose preferences to consider in the design."
          }
        </p>
      </div>
    </div>
  );
}