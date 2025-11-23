import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { User, Mail, Phone, Home, Building, Users } from "lucide-react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const PROJECT_TYPES = [
  { value: "new_construction", label: "New Pool", description: "Starting from scratch" },
  { value: "remodel", label: "Remodel Existing", description: "Updating current pool" },
  { value: "addition", label: "Addition", description: "Adding features to existing" }
];

const libraries = ["places"];

export default function StepGetToKnowYou({ data, updateData }) {
  const [autocomplete, setAutocomplete] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    if (!data.contact_first_name) {
      updateData({
        contact_first_name: "",
        contact_last_name: "",
        contact_email: "",
        contact_phone: "",
        decision_maker_count: "1",
        decision_makers: [],
        property_address: "",
        property_city: "",
        property_state: "",
        property_zip: "",
        project_type: "",
      });
    }
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();

      if (place.formatted_address) {
        let street = "";
        let city = "";
        let state = "";
        let zip = "";

        place.address_components?.forEach((component) => {
          const types = component.types;
          if (types.includes("street_number")) {
            street = component.long_name + " ";
          }
          if (types.includes("route")) {
            street += component.long_name;
          }
          if (types.includes("locality")) {
            city = component.long_name;
          }
          if (types.includes("administrative_area_level_1")) {
            state = component.short_name;
          }
          if (types.includes("postal_code")) {
            zip = component.long_name;
          }
        });

        updateData({
          property_address: street || place.formatted_address,
          property_city: city,
          property_state: state,
          property_zip: zip,
        });
      }
    }
  };

  const handleDecisionMakerChange = (value) => {
    const count = parseInt(value);
    updateData({
      decision_maker_count: value,
      decision_makers: count === 1
        ? []
        : [
          {
            first_name: data.contact_first_name || "",
            last_name: data.contact_last_name || "",
            email: data.contact_email || "",
            phone: data.contact_phone || ""
          },
          { first_name: "", last_name: "", email: "", phone: "" }
        ]
    });
  };

  const updateDecisionMaker = (index, field, value) => {
    const makers = [...(data.decision_makers || [])];
    makers[index] = { ...makers[index], [field]: value };
    updateData({ decision_makers: makers });
  };

  return (
    <div className="space-y-8">
      {/* Hero Image */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
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
        Just a few quick details to get started.
      </p>

      {/* Decision Makers - FIRST */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-700" />
          Who Will Be Involved in Design Decisions?
        </h4>

        <RadioGroup
          value={data.decision_maker_count || "1"}
          onValueChange={handleDecisionMakerChange}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="one-person" />
            <Label htmlFor="one-person" className="cursor-pointer font-medium">Just me</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="two-people" />
            <Label htmlFor="two-people" className="cursor-pointer font-medium">Two people (e.g., spouse/partner)</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Contact Info for Person 1 */}
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-gray-900 border-b pb-2">
          {data.decision_maker_count === "2" ? "Person 1 Information" : "Your Information"}
        </h4>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first-name" className="text-base font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-teal-700" />
              First Name
            </Label>
            <Input
              id="first-name"
              placeholder="John"
              value={data.contact_first_name || ""}
              onChange={(e) => updateData({ contact_first_name: e.target.value })}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last-name" className="text-base font-medium">
              Last Name
            </Label>
            <Input
              id="last-name"
              placeholder="Smith"
              value={data.contact_last_name || ""}
              onChange={(e) => updateData({ contact_last_name: e.target.value })}
              className="h-12 text-base"
            />
          </div>
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

      {/* Person 2 Info (if Two People selected) */}
      {data.decision_maker_count === "2" && (
        <div className="space-y-6 p-6 bg-teal-50 rounded-xl border-2 border-teal-200">
          <h4 className="text-xl font-semibold text-gray-900">Person 2 Information</h4>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-base font-medium">First Name</Label>
              <Input
                placeholder="First name"
                value={data.decision_makers?.[1]?.first_name || ""}
                onChange={(e) => updateDecisionMaker(1, "first_name", e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-base font-medium">Last Name</Label>
              <Input
                placeholder="Last name"
                value={data.decision_makers?.[1]?.last_name || ""}
                onChange={(e) => updateDecisionMaker(1, "last_name", e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-base font-medium">Email</Label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={data.decision_makers?.[1]?.email || ""}
                onChange={(e) => updateDecisionMaker(1, "email", e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-base font-medium">Phone</Label>
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                value={data.decision_makers?.[1]?.phone || ""}
                onChange={(e) => updateDecisionMaker(1, "phone", e.target.value)}
                className="h-12"
              />
            </div>
          </div>
        </div>
      )}

      {/* Property Address with Autocomplete */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900 border-b pb-2">Property Location</h4>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-base font-medium flex items-center gap-2">
            <Home className="w-4 h-4 text-teal-700" />
            Property Address
          </Label>
          {isLoaded ? (
            <Autocomplete
              onLoad={setAutocomplete}
              onPlaceChanged={onPlaceChanged}
              options={{
                types: ["address"],
                componentRestrictions: { country: ["us", "ca"] },
              }}
            >
              <Input
                id="address"
                placeholder="Start typing your address..."
                value={data.property_address || ""}
                onChange={(e) => updateData({ property_address: e.target.value })}
                className="h-12 text-base"
              />
            </Autocomplete>
          ) : (
            <Input
              id="address"
              placeholder="Start typing your address..."
              value={data.property_address || ""}
              onChange={(e) => updateData({ property_address: e.target.value })}
              className="h-12 text-base"
            />
          )}
          <p className="text-sm text-gray-500">
            Start typing and select your address from the dropdown
          </p>
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
    </div>
  );
}