import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Database, Link as LinkIcon, Lightbulb } from "lucide-react";

export default function DatabaseSchema() {
  const [expandedEntity, setExpandedEntity] = useState("OnboardingSubmission");

  const entities = {
    User: {
      purpose: "Customer and admin user accounts (Built-in)",
      builtin: true,
      fields: [
        { name: "id", type: "string", auto: true, required: true },
        { name: "created_date", type: "datetime", auto: true, required: true },
        { name: "updated_date", type: "datetime", auto: true, required: true },
        { name: "full_name", type: "string", required: true },
        { name: "email", type: "string", required: true, unique: true },
        { name: "role", type: "enum: 'admin', 'user'", required: true },
      ],
      relationships: [
        "created_by → OnboardingSubmission, Material, Feature, Theme, Content, SalesContent"
      ],
      security: "Only admins can list/update/delete other users. Regular users can only view/update their own record."
    },
    OnboardingSubmission: {
      purpose: "Customer project submissions with comprehensive research data",
      fields: [
        { name: "id", type: "string", auto: true, required: true },
        { name: "created_date", type: "datetime", auto: true },
        { name: "updated_date", type: "datetime", auto: true },
        { name: "created_by", type: "string (email)", relatesTo: "User" },
        { name: "status", type: "enum: 'in_progress', 'completed', 'reviewed'", default: "in_progress" },
        { name: "current_step", type: "number", default: 1 },
        { name: "access_token", type: "string (UUID)" },
        { name: "access_code", type: "string (ABC-123 format)" },
        { name: "contact_name", type: "string" },
        { name: "contact_email", type: "string" },
        { name: "contact_phone", type: "string" },
        { name: "property_address", type: "string" },
        { name: "property_city", type: "string" },
        { name: "property_state", type: "string" },
        { name: "property_zip", type: "string" },
        { name: "property_data", type: "object (AI research)" },
        { name: "property_images", type: "array of objects" },
        { name: "gis_data", type: "object (parcel, setbacks, zoning)" },
        { name: "environmental_analysis", type: "object (sun, climate)" },
        { name: "market_analysis", type: "object (pricing, trends)" },
        { name: "customer_research", type: "object (background)" },
        { name: "pool_vision", type: "string" },
        { name: "primary_use", type: "array of strings" },
        { name: "desired_features", type: "array of strings" },
        { name: "must_haves", type: "array of strings" },
        { name: "nice_to_haves", type: "array of strings" },
        { name: "style_preferences", type: "array of strings" },
        { name: "material_selections", type: "object" },
        { name: "design_concepts", type: "array of objects (AI-generated)" },
        { name: "budget_range", type: "string" },
        { name: "timeline", type: "string" },
        { name: "household_size", type: "string" },
        { name: "has_children", type: "boolean" },
        { name: "has_pets", type: "boolean" },
        { name: "entertainment_frequency", type: "string" },
        { name: "inspiration_images", type: "array of strings" },
        { name: "lead_score", type: "number" },
        { name: "lead_temperature", type: "enum: 'HOT', 'WARM', 'COLD'" },
        { name: "last_research_date", type: "string" },
        { name: "progress_photos", type: "array of objects" },
        { name: "customer_messages", type: "array of objects" },
        { name: "project_milestones", type: "array of objects" },
      ],
      relationships: [
        "submission_id → DesignBoard",
        "submission_id → ContentDelivery"
      ]
    },
    Material: {
      purpose: "Library of pool materials (finishes, tiles, coping, deck)",
      fields: [
        { name: "id", type: "string", auto: true, required: true },
        { name: "created_by", type: "string (email)", relatesTo: "User" },
        { name: "name", type: "string", required: true },
        { name: "category", type: "enum: 'pool_finish', 'waterline_tile', 'coping', 'deck_material', 'equipment'", required: true },
        { name: "brand", type: "string", required: true },
        { name: "product_line", type: "string" },
        { name: "color_name", type: "string" },
        { name: "manufacturer", type: "string" },
        { name: "sku", type: "string" },
        { name: "description", type: "string" },
        { name: "image_url", type: "string (REAL product photo)" },
        { name: "water_color", type: "string (for pool finishes)" },
        { name: "style", type: "string" },
        { name: "pros", type: "array of strings" },
        { name: "cons", type: "array of strings" },
        { name: "price_indicator", type: "enum: '$', '$$', '$$$', '$$$$'" },
        { name: "is_recommended", type: "boolean", default: false },
        { name: "is_standard", type: "boolean", default: false },
        { name: "is_popular", type: "boolean", default: false },
        { name: "is_active", type: "boolean", default: true },
        { name: "specifications", type: "object" },
        { name: "sort_order", type: "number", default: 0 },
      ],
      relationships: []
    },
    Feature: {
      purpose: "Library of buildable features (shapes, spas, kitchens)",
      fields: [
        { name: "id", type: "string", auto: true, required: true },
        { name: "created_by", type: "string (email)", relatesTo: "User" },
        { name: "name", type: "string", required: true },
        { name: "category", type: "enum: 'pool_shape', 'spa_type', 'water_feature', 'fire_feature', 'outdoor_kitchen', etc.", required: true },
        { name: "subcategory", type: "string" },
        { name: "description", type: "string" },
        { name: "image_url", type: "string" },
        { name: "sub_features", type: "array of objects (name, description, cost)" },
        { name: "typical_dimensions", type: "string" },
        { name: "typical_cost_range", type: "string" },
        { name: "design_considerations", type: "array of strings" },
        { name: "compatible_with", type: "array of strings" },
        { name: "is_standard", type: "boolean", default: false },
        { name: "is_popular", type: "boolean", default: false },
        { name: "is_premium", type: "boolean", default: false },
        { name: "is_active", type: "boolean", default: true },
        { name: "sort_order", type: "number", default: 0 },
      ],
      relationships: []
    },
    DesignBoard: {
      purpose: "Customer's material selections and design board",
      fields: [
        { name: "id", type: "string", auto: true },
        { name: "created_by", type: "string (email)", relatesTo: "User" },
        { name: "submission_id", type: "string", relatesTo: "OnboardingSubmission" },
        { name: "board_name", type: "string", default: "My Pool Design Board" },
        { name: "selected_materials", type: "array of objects (material_id, category, notes, quantity)" },
        { name: "ai_recommendations", type: "array of objects" },
        { name: "total_material_cost", type: "number" },
        { name: "style_cohesion_score", type: "number (1-10)" },
        { name: "status", type: "enum: 'draft', 'submitted', 'reviewed', 'approved'" },
      ],
      relationships: [
        "submission_id → OnboardingSubmission"
      ]
    },
    Theme: {
      purpose: "Visual theming system for app",
      fields: [
        { name: "id", type: "string", auto: true },
        { name: "name", type: "string", required: true },
        { name: "is_active", type: "boolean", default: false },
        { name: "colors", type: "object (primary, secondary, accent, etc.)" },
        { name: "typography", type: "object (fonts, sizes)" },
        { name: "spacing", type: "object (base_unit, container_max_width)" },
        { name: "border_radius", type: "object (small, medium, large)" },
        { name: "shadows", type: "object (small, medium, large)" },
      ],
      relationships: []
    },
    Content: {
      purpose: "Multi-language content management",
      fields: [
        { name: "id", type: "string", auto: true },
        { name: "key", type: "string (unique identifier)", required: true },
        { name: "category", type: "enum: 'ui_label', 'page_content', 'form_field', etc.", required: true },
        { name: "default_language", type: "string", default: "en" },
        { name: "translations", type: "object {language_code: content}", required: true },
        { name: "context", type: "string (where used)" },
        { name: "tone", type: "enum: 'formal', 'casual', 'technical', etc." },
        { name: "variables", type: "array of strings ({{name}}, {{date}})" },
        { name: "is_active", type: "boolean", default: true },
      ],
      relationships: []
    },
    SalesContent: {
      purpose: "Sales collateral library (brochures, videos, guides)",
      fields: [
        { name: "id", type: "string", auto: true },
        { name: "title", type: "string", required: true },
        { name: "type", type: "enum: 'brochure', 'catalog', 'video', etc.", required: true },
        { name: "category", type: "enum: 'portfolio', 'materials', 'education', etc.", required: true },
        { name: "description", type: "string" },
        { name: "url", type: "string", required: true },
        { name: "thumbnail_icon", type: "string (emoji or icon)" },
        { name: "tags", type: "array of strings" },
        { name: "recommended_for", type: "array of strings" },
        { name: "auto_send_timing", type: "enum: 'immediate', 'day_1', 'day_7', etc." },
        { name: "active", type: "boolean", default: true },
        { name: "send_count", type: "number", default: 0 },
      ],
      relationships: [
        "content_id → ContentDelivery"
      ]
    },
    ContentDelivery: {
      purpose: "Track content sent to customers",
      fields: [
        { name: "id", type: "string", auto: true },
        { name: "submission_id", type: "string", relatesTo: "OnboardingSubmission", required: true },
        { name: "content_id", type: "string", relatesTo: "SalesContent", required: true },
        { name: "recipient_email", type: "string", required: true },
        { name: "recipient_name", type: "string" },
        { name: "delivery_method", type: "enum: 'immediate', 'scheduled'" },
        { name: "scheduled_for", type: "datetime" },
        { name: "sent_at", type: "datetime" },
        { name: "status", type: "enum: 'pending', 'sent', 'failed', 'cancelled'" },
        { name: "email_subject", type: "string" },
        { name: "personal_note", type: "string" },
        { name: "sent_by", type: "string (email)" },
        { name: "opened", type: "boolean", default: false },
        { name: "opened_at", type: "datetime" },
      ],
      relationships: [
        "submission_id → OnboardingSubmission",
        "content_id → SalesContent"
      ]
    },
  };

  const enhancements = [
    {
      category: "New Entities",
      items: [
        "ProjectTimeline - Detailed milestone tracking with dates and dependencies",
        "Vendor - Manage supplier relationships and pricing",
        "Equipment - Separate from materials (pumps, heaters, automation)",
        "Warranty - Track warranty information per project",
        "Inspection - Building inspection tracking and results",
        "ChangeOrder - Track project changes and cost impacts",
        "PaymentSchedule - Payment milestones and tracking",
        "Subcontractor - Manage subcontractor relationships",
        "Permit - Track permit applications and approvals",
        "CommunicationLog - Structured communication history"
      ]
    },
    {
      category: "Relationships to Add",
      items: [
        "Project Team (many-to-many): OnboardingSubmission ↔ User (assign designers, PMs)",
        "Material Compatibility: Junction table linking compatible materials",
        "Feature Dependencies: Features that require other features",
        "Design Templates: Reusable design configurations",
        "Cost Calculator: Detailed cost breakdown entity"
      ]
    },
    {
      category: "Functional Enhancements",
      items: [
        "Computed fields for project profitability",
        "Automated lead scoring updates",
        "Trigger-based follow-up sequences",
        "Integration webhooks for external systems",
        "Audit logging for sensitive data changes"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Database className="w-10 h-10 text-teal-700" />
            Database Schema Documentation
          </h1>
          <p className="text-slate-600">Complete entity structure, relationships, and enhancement opportunities</p>
        </div>

        <Tabs defaultValue="entities" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="entities">Entities ({Object.keys(entities).length})</TabsTrigger>
            <TabsTrigger value="relationships">Relationships</TabsTrigger>
            <TabsTrigger value="enhancements">Enhancements</TabsTrigger>
          </TabsList>

          <TabsContent value="entities" className="space-y-4">
            {Object.entries(entities).map(([entityName, entityData]) => (
              <Card key={entityName} className="shadow-md">
                <CardHeader 
                  className="cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedEntity(expandedEntity === entityName ? null : entityName)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {entityName}
                        {entityData.builtin && <Badge variant="outline" className="bg-blue-50">Built-in</Badge>}
                      </CardTitle>
                      <p className="text-sm text-slate-600 mt-1">{entityData.purpose}</p>
                    </div>
                    <Badge className="bg-teal-700">{entityData.fields.length} fields</Badge>
                  </div>
                </CardHeader>
                {expandedEntity === entityName && (
                  <CardContent className="border-t">
                    <div className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Fields</h4>
                        <div className="space-y-2">
                          {entityData.fields.map((field, idx) => (
                            <div key={idx} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <code className="font-mono text-sm font-semibold text-teal-700">{field.name}</code>
                                  {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                                  {field.auto && <Badge variant="secondary" className="text-xs">Auto</Badge>}
                                  {field.unique && <Badge className="bg-blue-600 text-xs">Unique</Badge>}
                                  {field.default !== undefined && <Badge variant="outline" className="text-xs">Default: {String(field.default)}</Badge>}
                                </div>
                                <div className="text-sm text-slate-600 mt-1">{field.type}</div>
                                {field.relatesTo && (
                                  <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                                    <LinkIcon className="w-3 h-3" />
                                    Relates to: {field.relatesTo}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {entityData.relationships && entityData.relationships.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Relationships</h4>
                          <div className="space-y-1">
                            {entityData.relationships.map((rel, idx) => (
                              <div key={idx} className="text-sm text-blue-600 flex items-center gap-2">
                                <LinkIcon className="w-4 h-4" />
                                {rel}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {entityData.security && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="text-sm font-semibold text-amber-900 mb-1">Security Rules</div>
                          <div className="text-sm text-amber-800">{entityData.security}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="relationships" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Entity Relationship Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 text-slate-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre">
{`User (built-in)
  ↓ created_by
  ├─→ OnboardingSubmission (multiple projects per customer)
  ├─→ Material
  ├─→ Feature
  ├─→ Theme
  ├─→ Content
  └─→ SalesContent

OnboardingSubmission
  ↓ submission_id
  ├─→ DesignBoard (customer material selections)
  └─→ ContentDelivery (sales content tracking)

SalesContent
  ↓ content_id
  └─→ ContentDelivery (delivery tracking)`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Relationship Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">One-to-Many</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• One User → Many OnboardingSubmissions (via created_by)</li>
                    <li>• One OnboardingSubmission → Many ContentDeliveries</li>
                    <li>• One SalesContent → Many ContentDeliveries</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">One-to-One</h4>
                  <ul className="space-y-1 text-sm text-green-800">
                    <li>• One OnboardingSubmission → One DesignBoard (optional)</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Reference Only (No Foreign Key)</h4>
                  <ul className="space-y-1 text-sm text-purple-800">
                    <li>• Material: Referenced by OnboardingSubmission.material_selections</li>
                    <li>• Feature: Referenced by OnboardingSubmission.desired_features</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enhancements" className="space-y-4">
            {enhancements.map((section, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-slate-700">
                        <span className="text-teal-700 font-bold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}