import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle, Clock, DollarSign } from "lucide-react";

export default function APIIntegrationsList() {
  const integrations = [
    {
      name: "USGS Soil Survey",
      status: "implemented",
      type: "free",
      description: "Soil composition, engineering properties, drainage classification",
      usage: "Automatic",
    },
    {
      name: "OpenWeatherMap",
      status: "implemented",
      type: "free",
      description: "Climate data, temperature averages, precipitation (1000 calls/day free)",
      usage: "Automatic",
    },
    {
      name: "FEMA Flood Maps",
      status: "implemented",
      type: "free",
      description: "Flood zone designation, base flood elevation, insurance requirements",
      usage: "Automatic",
    },
    {
      name: "NOAA Climate Data",
      status: "implemented",
      type: "free",
      description: "Hardiness zones, historical weather patterns, climate normals",
      usage: "Automatic",
    },
    {
      name: "City GIS Portals",
      status: "implemented",
      type: "free",
      description: "Automated plot map retrieval from municipal GIS systems",
      usage: "Best-effort (varies by city)",
    },
    {
      name: "Zillow API",
      status: "planned",
      type: "paid",
      cost: "$0.05 per property",
      description: "Real property data: Zestimate, lot size, beds/baths, tax history, comps",
      usage: "Requires API key signup",
      priority: "HIGH",
    },
    {
      name: "Redfin API",
      status: "planned",
      type: "paid",
      cost: "$0.05 per property",
      description: "Alternative property data source, often more accurate than Zillow",
      usage: "Requires API key signup",
      priority: "MEDIUM",
    },
    {
      name: "Google Maps API",
      status: "planned",
      type: "paid",
      cost: "$0.02 per call",
      description: "Satellite imagery, lot measurements, geocoding, sun path analysis",
      usage: "Requires API key signup",
      priority: "HIGH",
    },
    {
      name: "Attom Data API",
      status: "planned",
      type: "paid",
      cost: "Variable",
      description: "Title company data, legal descriptions, ownership history, liens",
      usage: "Requires partnership/signup",
      priority: "MEDIUM",
    },
    {
      name: "CoreLogic API",
      status: "planned",
      type: "paid",
      cost: "Variable",
      description: "Property records, tax assessments, detailed transaction history",
      usage: "Requires partnership/signup",
      priority: "LOW",
    },
  ];

  const implemented = integrations.filter(i => i.status === "implemented");
  const planned = integrations.filter(i => i.status === "planned");

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Free APIs Implemented ({implemented.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {implemented.map((api) => (
            <div key={api.name} className="p-4 bg-white rounded-lg border border-green-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{api.name}</h4>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{api.description}</p>
              <p className="text-xs text-gray-500">Usage: {api.usage}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            Paid APIs to Add ({planned.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {planned.map((api) => (
            <div key={api.name} className="p-4 bg-white rounded-lg border border-amber-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{api.name}</h4>
                <div className="flex gap-2">
                  {api.priority && (
                    <Badge variant={api.priority === "HIGH" ? "destructive" : "secondary"}>
                      {api.priority}
                    </Badge>
                  )}
                  <Badge className="bg-amber-100 text-amber-800">
                    {api.cost}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{api.description}</p>
              <p className="text-xs text-gray-500">
                <strong>Next Step:</strong> {api.usage}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cyan-600" />
            Cost Analysis (Per Dossier)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Current (Free APIs only):</span>
              <span className="font-bold text-green-600">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">With Zillow + Google Maps:</span>
              <span className="font-bold text-gray-900">$0.07</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Full Suite (all paid APIs):</span>
              <span className="font-bold text-gray-900">$0.20 - $0.30</span>
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between text-lg">
                <span className="text-gray-900 font-semibold">Dossier Sale Price:</span>
                <span className="font-bold text-cyan-600">$5,000 - $10,000</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                API costs represent 0.002% - 0.006% of revenue
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}