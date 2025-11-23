import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { FileText, Users, Star, Heart, Calendar, DollarSign } from "lucide-react";

export default function CustomerInputSummary({ submission }) {
  // Extract key inputs for your design team
  return (
    <Card className="border-none shadow-elevated">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Customer Input Summary (For Your Design Team)
        </CardTitle>
        <p className="text-sm text-purple-100 mt-1">
          Quick reference: What the customer told us they want
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Decision Makers */}
        {submission.decision_makers && submission.decision_makers.length > 0 && (
          <div className="p-4 glass rounded-xl border-2 border-purple-300/50">
            <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Decision Makers ({submission.decision_makers.length})
            </h4>
            <div className="space-y-2">
              {submission.decision_makers.map((maker, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Badge variant="outline">{maker.relationship}</Badge>
                  <span className="text-sm font-medium">{maker.name || "Name not provided"}</span>
                </div>
              ))}
            </div>
            {submission.decision_makers.length > 1 && (
              <p className="text-xs text-purple-700 mt-2">
                ⚠️ Multiple stakeholders - make sure BOTH see design concepts before proceeding
              </p>
            )}
          </div>
        )}

        {/* Vision Statement */}
        {submission.pool_vision && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">💭 Their Vision</h4>
            <div className="p-4 glass rounded-lg border-2 border-cyan-300/50">
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "{submission.pool_vision}"
              </p>
            </div>
          </div>
        )}

        {/* Must-Haves */}
        {submission.must_haves && submission.must_haves.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
              Must-Have Features (Non-Negotiable)
            </h4>
            <div className="flex flex-wrap gap-2">
              {submission.must_haves.map((feature, idx) => (
                <Badge key={idx} className="bg-amber-100 text-amber-900 border-amber-300">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Nice-to-Haves */}
        {submission.nice_to_haves && submission.nice_to_haves.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-600" />
              Nice-to-Have Features (If Budget Allows)
            </h4>
            <div className="flex flex-wrap gap-2">
              {submission.nice_to_haves.map((feature, idx) => (
                <Badge key={idx} variant="outline" className="border-pink-300 text-pink-700">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Style Preferences */}
        {submission.style_preferences && submission.style_preferences.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">🎨 Style Preferences</h4>
            <div className="flex flex-wrap gap-2">
              {submission.style_preferences.map((style, idx) => (
                <Badge key={idx} className="bg-cyan-100 text-cyan-900">
                  {style}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Budget & Timeline */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 glass rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-sm">Budget Range</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {submission.budget_range || "Not specified"}
            </p>
          </div>

          <div className="p-4 glass rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-sm">Timeline</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {submission.timeline || "Not specified"}
            </p>
          </div>
        </div>

        {/* Usage Intent */}
        {submission.usage_intent && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">🏊 Primary Uses</h4>
            <div className="p-4 glass rounded-lg space-y-2">
              {submission.primary_use && submission.primary_use.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {submission.primary_use.map((use, idx) => (
                    <Badge key={idx} variant="outline">{use}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Household Info */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">👨‍👩‍👧‍👦 Household Context</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-blue-700">Household Size:</span>
              <p className="font-medium text-slate-900">{submission.household_size || "Not specified"}</p>
            </div>
            <div>
              <span className="text-blue-700">Children:</span>
              <p className="font-medium text-slate-900">{submission.has_children ? "Yes" : "No"}</p>
            </div>
            <div>
              <span className="text-blue-700">Pets:</span>
              <p className="font-medium text-slate-900">{submission.has_pets ? "Yes" : "No"}</p>
            </div>
            <div>
              <span className="text-blue-700">Entertaining:</span>
              <p className="font-medium text-slate-900">{submission.entertainment_frequency || "Not specified"}</p>
            </div>
          </div>
        </div>

        {/* Design Team Action Items */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl">
          <h4 className="font-bold mb-3">⚡ For Your Design Team in Pool Studio</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">1.</span>
              <span>Start with their "must-haves" - these are deal-breakers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">2.</span>
              <span>Use style preferences to guide material selections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">3.</span>
              <span>Reference their vision statement throughout design</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">4.</span>
              <span>Incorporate "nice-to-haves" where budget allows</span>
            </li>
            {submission.decision_makers?.length > 1 && (
              <li className="flex items-start gap-2">
                <span className="text-amber-400">⚠️</span>
                <span className="text-amber-200">Multiple decision makers - ensure both see/approve concepts</span>
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}