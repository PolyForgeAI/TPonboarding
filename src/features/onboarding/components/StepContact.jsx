import React, { useEffect } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { User, Mail, Phone } from "lucide-react";

export default function StepContact({ data, updateData }) {
  useEffect(() => {
    if (!data.contact_name) {
      updateData({
        contact_name: "",
        contact_email: "",
        contact_phone: "",
      });
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Let's Get Started</h3>
        <p className="text-gray-600 text-lg">
          First, we'd love to know who we're designing for.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-600" />
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

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-600" />
            Email Address
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
            <Phone className="w-4 h-4 text-cyan-600" />
            Phone Number
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
  );
}