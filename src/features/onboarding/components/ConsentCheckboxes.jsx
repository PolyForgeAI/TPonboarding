import React from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { Shield, UserSearch, FileText } from "lucide-react";

export default function ConsentCheckboxes({ consents, updateConsents }) {
  const toggleConsent = (key) => {
    updateConsents({
      ...consents,
      [key]: !consents[key]
    });
  };

  return (
    <div className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-blue-600" />
        <h4 className="font-bold text-gray-900">Privacy & Consent</h4>
      </div>

      <div
        onClick={() => toggleConsent("property_research")}
        className="flex items-start space-x-3 p-4 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-all"
      >
        <Checkbox
          checked={consents?.property_research || false}
          onCheckedChange={(checked) => updateConsents({ ...consents, property_research: checked })}
          className="mt-1"
        />
        <div className="flex-1">
          <Label className="cursor-pointer font-medium text-gray-900">
            Property Information Research
          </Label>
          <p className="text-sm text-gray-600 mt-1">
            I consent to Timeless Pools researching publicly available property information 
            (assessor records, GIS data, zoning) to create a personalized project analysis.
          </p>
        </div>
      </div>

      <div
        onClick={() => toggleConsent("customer_research")}
        className="flex items-start space-x-3 p-4 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-all"
      >
        <Checkbox
          checked={consents?.customer_research || false}
          onCheckedChange={(checked) => updateConsents({ ...consents, customer_research: checked })}
          className="mt-1"
        />
        <div className="flex-1">
          <Label className="cursor-pointer font-medium text-gray-900">
            <UserSearch className="w-4 h-4 inline mr-1" />
            Personalization Research (Optional)
          </Label>
          <p className="text-sm text-gray-600 mt-1">
            I consent to Timeless Pools researching publicly available information about me 
            (professional background, interests) to personalize my design concepts.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            <strong>Optional:</strong> This helps us create a more tailored design but is not required.
          </p>
        </div>
      </div>

      <div
        onClick={() => toggleConsent("inspiration_photos")}
        className="flex items-start space-x-3 p-4 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-all"
      >
        <Checkbox
          checked={consents?.inspiration_photos || false}
          onCheckedChange={(checked) => updateConsents({ ...consents, inspiration_photos: checked })}
          className="mt-1"
        />
        <div className="flex-1">
          <Label className="cursor-pointer font-medium text-gray-900">
            Inspiration Photo Rights
          </Label>
          <p className="text-sm text-gray-600 mt-1">
            I confirm that any inspiration photos I upload are either my own or I have the right 
            to use them for design consultation purposes. I understand that Timeless Pools will 
            analyze these photos but not redistribute them.
          </p>
        </div>
      </div>

      <div
        onClick={() => toggleConsent("data_accuracy")}
        className="flex items-start space-x-3 p-4 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-all"
      >
        <Checkbox
          checked={consents?.data_accuracy || false}
          onCheckedChange={(checked) => updateConsents({ ...consents, data_accuracy: checked })}
          className="mt-1"
        />
        <div className="flex-1">
          <Label className="cursor-pointer font-medium text-gray-900">
            <FileText className="w-4 h-4 inline mr-1" />
            Data Accuracy Acknowledgment
          </Label>
          <p className="text-sm text-gray-600 mt-1">
            I understand that cost estimates are approximate, building codes should be verified 
            with local authorities, and all information should be independently confirmed before 
            making construction decisions.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-blue-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Privacy Protection:</strong> Your data is stored securely and accessed only via unique 
          access tokens. We do not sell or share your information with third parties. Your dossier 
          results are private and only accessible via the secure link provided to you.
        </p>
      </div>
    </div>
  );
}