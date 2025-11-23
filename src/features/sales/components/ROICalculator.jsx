import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Slider } from "@/shared/components/ui/slider";
import { TrendingUp, Home, DollarSign, Percent } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

export default function ROICalculator({ submission, concept }) {
  const [homeValue, setHomeValue] = useState(500000);
  const [poolCost, setPoolCost] = useState(150000);
  const [roiPercentage, setRoiPercentage] = useState(60);
  const [timeToSell, setTimeToSell] = useState(5);

  useEffect(() => {
    // Auto-populate from submission data
    if (submission?.property_data?.estimated_value) {
      const value = parseFloat(submission.property_data.estimated_value.replace(/[^0-9.]/g, ''));
      if (!isNaN(value)) setHomeValue(value);
    }
    
    if (concept?.estimated_cost) {
      const cost = parseFloat(concept.estimated_cost.replace(/[^0-9.]/g, ''));
      if (!isNaN(cost)) setPoolCost(cost);
    }
  }, [submission, concept]);

  const poolValueAdded = poolCost * (roiPercentage / 100);
  const newHomeValue = homeValue + poolValueAdded;
  const netGain = poolValueAdded - poolCost;
  const percentageIncrease = ((poolValueAdded / homeValue) * 100).toFixed(1);
  const monthlyPayment = (poolCost / (timeToSell * 12)).toFixed(0);
  const dailyPayment = (poolCost / (timeToSell * 365)).toFixed(0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Investment ROI Calculator
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          See how this pool investment impacts your home value
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Current Home Value</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="number"
                value={homeValue}
                onChange={(e) => setHomeValue(parseFloat(e.target.value) || 0)}
                className="pl-9"
              />
            </div>
          </div>
          <div>
            <Label>Pool Investment</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="number"
                value={poolCost}
                onChange={(e) => setPoolCost(parseFloat(e.target.value) || 0)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Expected ROI at Sale</Label>
            <Badge className="bg-green-100 text-green-800">{roiPercentage}%</Badge>
          </div>
          <Slider
            value={[roiPercentage]}
            onValueChange={(val) => setRoiPercentage(val[0])}
            min={40}
            max={100}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-2">
            Industry average: 60-70% • Luxury pools in premium areas: 80-100%
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Time to Sell (Years)</Label>
            <Badge variant="outline">{timeToSell} years</Badge>
          </div>
          <Slider
            value={[timeToSell]}
            onValueChange={(val) => setTimeToSell(val[0])}
            min={1}
            max={20}
            step={1}
            className="w-full"
          />
        </div>

        {/* Results */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Value Added to Home</p>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(poolValueAdded)}</p>
            </div>
            <Home className="w-8 h-8 text-green-600" />
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">New Home Value</p>
              <p className="text-2xl font-bold text-blue-700">{formatCurrency(newHomeValue)}</p>
              <p className="text-xs text-blue-600">+{percentageIncrease}% increase</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>

          <div className={`flex items-center justify-between p-4 rounded-lg ${
            netGain >= 0 
              ? "bg-gradient-to-r from-green-50 to-emerald-50" 
              : "bg-gradient-to-r from-amber-50 to-yellow-50"
          }`}>
            <div>
              <p className="text-sm text-gray-600">Net Gain at Sale</p>
              <p className={`text-2xl font-bold ${netGain >= 0 ? "text-green-700" : "text-amber-700"}`}>
                {formatCurrency(netGain)}
              </p>
              <p className="text-xs text-gray-600">
                {netGain >= 0 ? "Profitable investment" : "Long-term enjoyment value"}
              </p>
            </div>
            <DollarSign className={`w-8 h-8 ${netGain >= 0 ? "text-green-600" : "text-amber-600"}`} />
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-3">Investment Perspective</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly (if amortized over {timeToSell} years):</span>
              <span className="font-semibold">{formatCurrency(monthlyPayment)}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Daily cost:</span>
              <span className="font-semibold">{formatCurrency(dailyPayment)}/day</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-purple-200">
              <span className="text-gray-600">Value added per year:</span>
              <span className="font-bold text-green-700">{formatCurrency(poolValueAdded / timeToSell)}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center pt-2 border-t">
          <strong>Disclaimer:</strong> ROI estimates vary by location, pool quality, and market conditions. 
          Consult with local real estate professionals for specific guidance.
        </div>
      </CardContent>
    </Card>
  );
}