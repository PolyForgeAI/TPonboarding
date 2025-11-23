import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Cloud, CloudRain, Sun, AlertTriangle, Calendar, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function WeatherIntegration({ submission, constructionRoadmap }) {
  const [forecast, setForecast] = useState(null);
  const [adjustedTimeline, setAdjustedTimeline] = useState(null);

  useEffect(() => {
    if (submission) {
      fetchWeatherForecast();
    }
  }, [submission]);

  const fetchWeatherForecast = async () => {
    try {
      const location = `${submission.property_city}, ${submission.property_state}`;
      
      const prompt = `Analyze weather forecast and construction conditions for: ${location}

Use weather APIs and historical data to provide:

1. NEXT 14 DAYS FORECAST:
   - Daily high/low temps
   - Precipitation probability
   - Wind speeds
   - Construction-friendly days vs. risky days

2. SEASONAL PATTERNS:
   - Best months for pool construction
   - Rainy season timing
   - Extreme heat/cold periods
   - Historical weather delays for construction

3. CONSTRUCTION IMPACT:
   - Days suitable for excavation (dry, mild)
   - Days suitable for concrete work (no rain, temp 50-90°F)
   - Days suitable for finish work (dry, calm)
   - Expected weather delays (in days)

4. TIMELINE ADJUSTMENTS:
   Given construction phases: ${JSON.stringify(constructionRoadmap?.phases || [])}
   
   Recommend:
   - Which phases might be delayed by weather
   - How many buffer days to add
   - Best time to start project
   - Contingency planning

5. RISK ASSESSMENT:
   - High risk weather events (storms, freezes)
   - Probability of delays
   - Insurance/protection recommendations

Provide actionable construction scheduling intelligence.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            forecast_14_days: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  date: { type: "string" },
                  high_temp: { type: "string" },
                  low_temp: { type: "string" },
                  precipitation_chance: { type: "string" },
                  construction_suitability: { type: "string", enum: ["excellent", "good", "fair", "poor", "unsafe"] },
                  notes: { type: "string" }
                }
              }
            },
            seasonal_patterns: {
              type: "object",
              properties: {
                best_months: { type: "array", items: { type: "string" } },
                rainy_season: { type: "string" },
                extreme_heat_months: { type: "array", items: { type: "string" } },
                freeze_risk_months: { type: "array", items: { type: "string" } }
              }
            },
            construction_windows: {
              type: "object",
              properties: {
                next_good_window: { type: "string" },
                days_suitable_next_14: { type: "number" },
                expected_delays_days: { type: "number" }
              }
            },
            phase_adjustments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  phase_name: { type: "string" },
                  weather_risk: { type: "string" },
                  recommended_buffer_days: { type: "number" },
                  best_timing: { type: "string" }
                }
              }
            },
            risk_assessment: {
              type: "object",
              properties: {
                overall_risk_level: { type: "string", enum: ["low", "medium", "high"] },
                specific_risks: { type: "array", items: { type: "string" } },
                mitigation_strategies: { type: "array", items: { type: "string" } }
              }
            },
            optimal_start_date: { type: "string" }
          }
        }
      });

      setForecast(result);
      calculateAdjustedTimeline(result);
      toast.success("Weather forecast analyzed!");
    } catch (error) {
      console.error("Error fetching weather:", error);
      toast.error("Failed to fetch weather data");
    }
  };

  const calculateAdjustedTimeline = (weatherData) => {
    if (!constructionRoadmap?.phases) return;

    const adjusted = constructionRoadmap.phases.map(phase => {
      const adjustment = weatherData.phase_adjustments?.find(
        adj => adj.phase_name.toLowerCase().includes(phase.phase_name.toLowerCase())
      );

      return {
        ...phase,
        weather_risk: adjustment?.weather_risk || "low",
        buffer_days: adjustment?.recommended_buffer_days || 0,
        best_timing: adjustment?.best_timing
      };
    });

    setAdjustedTimeline(adjusted);
  };

  const getSuitabilityColor = (suitability) => {
    const colors = {
      excellent: "bg-green-600",
      good: "bg-blue-600",
      fair: "bg-amber-600",
      poor: "bg-orange-600",
      unsafe: "bg-red-600"
    };
    return colors[suitability] || "bg-slate-600";
  };

  const getSuitabilityIcon = (suitability) => {
    if (suitability === "excellent" || suitability === "good") return <Sun className="w-4 h-4" />;
    if (suitability === "poor" || suitability === "unsafe") return <CloudRain className="w-4 h-4" />;
    return <Cloud className="w-4 h-4" />;
  };

  const getRiskColor = (risk) => {
    const colors = {
      low: "from-green-50 to-emerald-50 border-green-300",
      medium: "from-amber-50 to-orange-50 border-amber-300",
      high: "from-red-50 to-rose-50 border-red-300"
    };
    return colors[risk] || colors.medium;
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-sky-600 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Cloud className="w-6 h-6" />
              Weather-Smart Timeline
            </CardTitle>
            <p className="text-sky-100 text-sm mt-2">
              AI-adjusted construction schedule based on forecast
            </p>
          </div>
          <Button
            onClick={fetchWeatherForecast}
            variant="outline"
            className="bg-white/20 border-white/40 text-white hover:bg-white/30"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {!forecast ? (
          <div className="text-center py-16 bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl">
            <Cloud className="w-16 h-16 text-sky-300 mx-auto mb-4 animate-bounce" />
            <p className="text-slate-600">Loading weather forecast...</p>
          </div>
        ) : (
          <>
            {/* Risk Assessment */}
            <div className={`p-6 bg-gradient-to-br ${getRiskColor(forecast.risk_assessment?.overall_risk_level)} rounded-2xl border-2`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">Weather Risk Assessment</h3>
                <Badge className={
                  forecast.risk_assessment?.overall_risk_level === "low" ? "bg-green-600" :
                  forecast.risk_assessment?.overall_risk_level === "high" ? "bg-red-600" :
                  "bg-amber-600"
                }>
                  {forecast.risk_assessment?.overall_risk_level?.toUpperCase()} RISK
                </Badge>
              </div>
              {forecast.risk_assessment?.specific_risks && (
                <div className="space-y-2 mb-4">
                  {forecast.risk_assessment.specific_risks.map((risk, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Mitigation Strategies:</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  {forecast.risk_assessment?.mitigation_strategies?.map((strategy, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Optimal Start Date */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-green-900">Recommended Start Date</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900">{forecast.optimal_start_date}</p>
              <p className="text-sm text-slate-600 mt-2">
                Based on weather patterns and seasonal conditions
              </p>
            </div>

            {/* Construction Windows */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 text-center">
                <p className="text-sm text-slate-600 mb-1">Good Days (Next 14)</p>
                <p className="text-4xl font-bold text-slate-900">
                  {forecast.construction_windows?.days_suitable_next_14}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 text-center">
                <p className="text-sm text-slate-600 mb-1">Expected Delays</p>
                <p className="text-4xl font-bold text-slate-900">
                  {forecast.construction_windows?.expected_delays_days} days
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 text-center">
                <p className="text-sm text-slate-600 mb-1">Next Good Window</p>
                <p className="text-lg font-bold text-slate-900">
                  {forecast.construction_windows?.next_good_window}
                </p>
              </div>
            </div>

            {/* 14-Day Forecast */}
            <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-300">
              <h3 className="text-xl font-bold text-slate-900 mb-4">14-Day Construction Forecast</h3>
              <div className="grid gap-2">
                {forecast.forecast_14_days?.map((day, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                    <div className="flex-shrink-0 text-center w-20">
                      <p className="text-sm font-semibold text-slate-900">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-xs text-slate-600">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSuitabilityIcon(day.construction_suitability)}
                      <span className="text-sm">
                        {day.high_temp} / {day.low_temp}
                      </span>
                    </div>
                    <div className="flex-1">
                      <Badge className={getSuitabilityColor(day.construction_suitability)}>
                        {day.construction_suitability}
                      </Badge>
                      {day.precipitation_chance !== "0%" && (
                        <Badge variant="outline" className="ml-2">
                          {day.precipitation_chance} rain
                        </Badge>
                      )}
                    </div>
                    {day.notes && (
                      <p className="text-xs text-slate-600">{day.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Adjustments */}
            {adjustedTimeline && (
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-300">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">Weather-Adjusted Timeline</h3>
                <div className="space-y-3">
                  {adjustedTimeline.map((phase, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-slate-900">{phase.phase_name}</h4>
                        <div className="flex gap-2">
                          <Badge className={
                            phase.weather_risk === "low" ? "bg-green-600" :
                            phase.weather_risk === "high" ? "bg-red-600" :
                            "bg-amber-600"
                          }>
                            {phase.weather_risk} risk
                          </Badge>
                          {phase.buffer_days > 0 && (
                            <Badge variant="outline">
                              +{phase.buffer_days} buffer days
                            </Badge>
                          )}
                        </div>
                      </div>
                      {phase.best_timing && (
                        <p className="text-sm text-slate-600">Best timing: {phase.best_timing}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seasonal Patterns */}
            <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-300">
              <h3 className="text-xl font-bold text-cyan-900 mb-4">Seasonal Construction Insights</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Best Months</h4>
                  <div className="flex gap-2 flex-wrap">
                    {forecast.seasonal_patterns?.best_months?.map((month, idx) => (
                      <Badge key={idx} className="bg-green-600">{month}</Badge>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🌧️ Rainy Season</h4>
                  <p className="text-sm text-slate-700">{forecast.seasonal_patterns?.rainy_season}</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">🔥 Extreme Heat</h4>
                  <div className="flex gap-2 flex-wrap">
                    {forecast.seasonal_patterns?.extreme_heat_months?.map((month, idx) => (
                      <Badge key={idx} className="bg-orange-600">{month}</Badge>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-cyan-800 mb-2">❄️ Freeze Risk</h4>
                  <div className="flex gap-2 flex-wrap">
                    {forecast.seasonal_patterns?.freeze_risk_months?.map((month, idx) => (
                      <Badge key={idx} className="bg-cyan-600">{month}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}