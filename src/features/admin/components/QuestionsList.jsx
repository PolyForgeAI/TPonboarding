import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { AlertCircle, HelpCircle, CheckCircle, Clock } from "lucide-react";

export default function QuestionsList() {
  const questions = [
    {
      category: "Authentication & Access",
      priority: "high",
      items: [
        "How should Timeless Pools staff access the admin dashboard? Separate admin login?",
        "Should system auto-email customer when dossier is ready?",
        "What email address should 'from' field use for notifications?"
      ]
    },
    {
      category: "Materials & Pricing",
      priority: "medium",
      items: [
        "When you enable pricing (upgrade), show to all customers or selectively?",
        "Want tiered access? (Basic free, Premium shows costs, Platinum includes quotes)",
        "Need actual product catalogs: Pebble Tec colors with SKUs, Aquabella Tile catalog, MSI tiles/slabs/coping, Belgard pavers, Pacific Stone Precast WC-104 colors, Bull BBQ model numbers"
      ]
    },
    {
      category: "Customer Experience",
      priority: "medium",
      items: [
        "Can customers share their dossier link with spouse/family? Or strictly one-to-one?",
        "Should customer access ever expire? (e.g., 90 days then archived) Or permanent forever?",
        "Want workflow where customer can 'select' their preferred concept for refinement?",
        "Should customers be able to regenerate dossier if they update info?"
      ]
    },
    {
      category: "Assets Needed",
      priority: "high",
      items: [
        "Timeless Pools logo files (vector preferred)",
        "High-res project photos from gallery for splash screen/backgrounds",
        "Vendor catalogs (PDFs or links) for material library",
        "Zillow API key (when you sign up) for real property data"
      ]
    },
    {
      category: "Design Decisions Made",
      priority: "low",
      items: [
        "Implemented hybrid UUID token system for security",
        "Access codes (ABC-123) for admin-created projects only",
        "Results URL: /results?token={uuid} (no expiration)",
        "Customer research made OPT-IN only (consent checkbox)",
        "Using stock images as placeholders until you provide photos"
      ]
    },
    {
      category: "Future Enhancements",
      priority: "low",
      items: [
        "Multi-language support for international expansion?",
        "White-label version for licensing to other builders?",
        "Customer portal with project timeline tracking?",
        "Integration with project management tools (e.g., BuilderTrend)?",
        "Virtual reality pool walkthroughs?"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-cyan-600" />
          Questions & Decisions Log
        </h2>
        <p className="text-gray-700">
          These are questions that came up during development and decisions I made on your behalf. Review when you're back!
        </p>
      </div>

      {questions.map((section, idx) => (
        <Card key={idx} className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {section.priority === "high" && <AlertCircle className="w-5 h-5 text-red-500" />}
                {section.priority === "medium" && <Clock className="w-5 h-5 text-yellow-500" />}
                {section.priority === "low" && <CheckCircle className="w-5 h-5 text-green-500" />}
                {section.category}
              </CardTitle>
              <Badge 
                variant={
                  section.priority === "high" ? "destructive" : 
                  section.priority === "medium" ? "default" : 
                  "secondary"
                }
              >
                {section.priority}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-600 mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}