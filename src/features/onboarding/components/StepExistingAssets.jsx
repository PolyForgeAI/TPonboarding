import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Textarea } from "@/shared/components/ui/textarea";
import { CheckCircle, Wrench, Trash2, AlertCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const EXISTING_ASSETS = [
  { id: "pool", name: "Swimming Pool", icon: "🏊", common: true },
  { id: "spa", name: "Spa / Hot Tub", icon: "♨️", common: true },
  { id: "deck", name: "Pool Deck / Patio", icon: "🪵", common: true },
  { id: "coping", name: "Pool Coping", icon: "🧱", common: true },
  { id: "tile", name: "Waterline Tile", icon: "🎨", common: true },
  { id: "finish", name: "Pool Finish (Plaster/Pebble)", icon: "💎", common: true },
  { id: "equipment", name: "Pool Equipment (Pump/Filter/Heater)", icon: "⚙️", common: true },
  { id: "bbq", name: "BBQ Island / Outdoor Kitchen", icon: "🍖", common: false },
  { id: "fire_pit", name: "Fire Pit", icon: "🔥", common: false },
  { id: "fireplace", name: "Outdoor Fireplace", icon: "🏛️", common: false },
  { id: "pergola", name: "Pergola / Covered Structure", icon: "🏠", common: false },
  { id: "water_feature", name: "Water Features (Waterfall/Fountains)", icon: "💦", common: false },
  { id: "lighting", name: "Lighting (Pool/Landscape)", icon: "💡", common: false },
  { id: "fencing", name: "Pool Fence", icon: "🚧", common: false },
  { id: "landscaping", name: "Mature Landscaping", icon: "🌳", common: false },
];

const ACTION_OPTIONS = [
  {
    id: "keep_unchanged",
    label: "Keep Unchanged",
    description: "It's perfect, don't touch it",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-green-600 bg-green-50 border-green-300",
    requires_reason: false
  },
  {
    id: "modify",
    label: "Keep But Modify",
    description: "It works but needs updates",
    icon: <Wrench className="w-5 h-5" />,
    color: "text-blue-600 bg-blue-50 border-blue-300",
    requires_reason: true
  },
  {
    id: "rebuild",
    label: "Destroy & Rebuild",
    description: "Start fresh, completely redo it",
    icon: <AlertCircle className="w-5 h-5" />,
    color: "text-orange-600 bg-orange-50 border-orange-300",
    requires_reason: true
  },
  {
    id: "remove",
    label: "Remove Entirely",
    description: "Get rid of it, don't replace",
    icon: <Trash2 className="w-5 h-5" />,
    color: "text-red-600 bg-red-50 border-red-300",
    requires_reason: true
  }
];

export default function StepExistingAssets({ data, updateData }) {
  const existingAssets = data.existing_assets || {};

  React.useEffect(() => {
    if (!data.existing_assets) {
      updateData({ existing_assets: {} });
    }
  }, []);

  const toggleAsset = (assetId) => {
    const updated = { ...existingAssets };
    if (updated[assetId]) {
      delete updated[assetId];
    } else {
      updated[assetId] = { has: true, action: null, reason: "" };
    }
    updateData({ existing_assets: updated });
  };

  const setAction = (assetId, action) => {
    const updated = { ...existingAssets };
    updated[assetId] = { ...updated[assetId], action, reason: "" };
    updateData({ existing_assets: updated });
  };

  const setReason = (assetId, reason) => {
    const updated = { ...existingAssets };
    updated[assetId] = { ...updated[assetId], reason };
    updateData({ existing_assets: updated });
  };

  const commonAssets = EXISTING_ASSETS.filter(a => a.common);
  const otherAssets = EXISTING_ASSETS.filter(a => !a.common);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">What Do You Currently Have?</h3>
        <p className="text-gray-600 text-lg">
          Check everything that exists in your backyard today. Then tell us what you want to do with each item.
        </p>
      </div>

      {/* Common Pool Elements */}
      <div>
        <h4 className="text-xl font-semibold text-slate-900 mb-4">Pool & Essential Elements</h4>
        <div className="space-y-4">
          {commonAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              data={existingAssets[asset.id]}
              onToggle={() => toggleAsset(asset.id)}
              onSetAction={(action) => setAction(asset.id, action)}
              onSetReason={(reason) => setReason(asset.id, reason)}
            />
          ))}
        </div>
      </div>

      {/* Other Features */}
      <div>
        <h4 className="text-xl font-semibold text-slate-900 mb-4">Other Outdoor Features</h4>
        <div className="space-y-4">
          {otherAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              data={existingAssets[asset.id]}
              onToggle={() => toggleAsset(asset.id)}
              onSetAction={(action) => setAction(asset.id, action)}
              onSetReason={(reason) => setReason(asset.id, reason)}
            />
          ))}
        </div>
      </div>

      {/* Summary */}
      {Object.keys(existingAssets).length > 0 && (
        <div className="p-6 glass rounded-2xl border-2 border-purple-300/50">
          <h4 className="font-bold text-purple-900 mb-3">Your Existing Assets Summary:</h4>
          <div className="space-y-2">
            {Object.entries(existingAssets).map(([assetId, assetData]) => {
              const asset = EXISTING_ASSETS.find(a => a.id === assetId);
              const action = ACTION_OPTIONS.find(a => a.id === assetData.action);
              return (
                <div key={assetId} className="flex items-center gap-3 text-sm">
                  <span>{asset?.icon}</span>
                  <span className="font-medium">{asset?.name}:</span>
                  {action ? (
                    <Badge className={action.color}>{action.label}</Badge>
                  ) : (
                    <Badge variant="outline">Not decided yet</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function AssetCard({ asset, data, onToggle, onSetAction, onSetReason }) {
  const hasAsset = data?.has;
  const selectedAction = data?.action;
  const reason = data?.reason || "";
  const actionOption = ACTION_OPTIONS.find(a => a.id === selectedAction);

  return (
    <Card className={cn(
      "transition-all duration-300",
      hasAsset ? "ring-2 ring-purple-300 shadow-md" : "opacity-60"
    )}>
      <CardContent className="p-4">
        {/* Asset Selection */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onToggle}
            className="flex items-center gap-3 text-left flex-1"
          >
            <span className="text-3xl">{asset.icon}</span>
            <div>
              <h5 className="font-semibold text-slate-900">{asset.name}</h5>
              <p className="text-xs text-slate-600">
                {hasAsset ? "✓ You have this" : "Click to add"}
              </p>
            </div>
          </button>
          {hasAsset && (
            <Badge className="bg-purple-600">Has This</Badge>
          )}
        </div>

        {/* Action Selection */}
        {hasAsset && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">What do you want to do with it?</p>
            <div className="grid grid-cols-2 gap-2">
              {ACTION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onSetAction(option.id)}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all text-left",
                    selectedAction === option.id
                      ? option.color + " ring-2 ring-offset-2"
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {option.icon}
                    <span className="text-sm font-semibold">{option.label}</span>
                  </div>
                  <p className="text-xs text-slate-600">{option.description}</p>
                </button>
              ))}
            </div>

            {/* Reason Input */}
            {selectedAction && actionOption?.requires_reason && (
              <div className="mt-3">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Why do you want to {selectedAction === "modify" ? "modify" : selectedAction === "rebuild" ? "rebuild" : "remove"} it?
                </label>
                <Textarea
                  value={reason}
                  onChange={(e) => onSetReason(e.target.value)}
                  placeholder={`e.g., "The tile is cracked and dated, want modern glass tile" or "Equipment is 15 years old, inefficient"`}
                  className="text-sm"
                  rows={3}
                />
                <p className="text-xs text-slate-500 mt-1">
                  This helps us design better solutions for your specific situation.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}