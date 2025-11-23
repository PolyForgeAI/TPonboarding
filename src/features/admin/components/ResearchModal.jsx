import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Loader2, CheckCircle, Database, Map, Leaf, TrendingUp, Users, Sparkles } from "lucide-react";

export default function ResearchModal({ isOpen, onClose, stage, submission, stagePrompts, isComplete }) {
  const stages = [
    { key: "property", label: "Property Intelligence", icon: Database },
    { key: "gis", label: "GIS & Zoning", icon: Map },
    { key: "environmental", label: "Environmental Analysis", icon: Leaf },
    { key: "market", label: "Market Research", icon: TrendingUp },
    { key: "customer", label: "Customer Profile", icon: Users },
    { key: "concepts", label: "Design Concepts", icon: Sparkles },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Researching {submission?.contact_name}'s Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="w-16 h-16 animate-spin text-teal-700" />
          </div>

          <div className="space-y-3">
            {stages.map((stageInfo, index) => {
              const Icon = stageInfo.icon;
              const isStageComplete = index < currentStageIndex;
              const isCurrent = index === currentStageIndex;
              const isPending = index > currentStageIndex;
              const hasPrompt = stagePrompts[stageInfo.key];

              return (
                <div
                  key={stageInfo.key}
                  className={`rounded-xl border-2 transition-all ${
                    isStageComplete
                      ? "border-green-500 bg-green-50"
                      : isCurrent
                      ? "border-teal-700 bg-teal-50 shadow-lg"
                      : "border-gray-200 bg-gray-50 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-4 p-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isStageComplete
                          ? "bg-green-500 text-white"
                          : isCurrent
                          ? "bg-teal-700 text-white"
                          : "bg-gray-300 text-gray-500"
                      }`}
                    >
                      {isStageComplete ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{stageInfo.label}</div>
                      {isCurrent && (
                        <div className="text-sm text-teal-700 font-medium">Processing...</div>
                      )}
                      {isStageComplete && (
                        <div className="text-sm text-green-600 font-medium">Complete</div>
                      )}
                    </div>
                  </div>
                  
                  {hasPrompt && (
                    <div className="px-4 pb-4">
                      <details className="bg-white rounded-lg border border-slate-300">
                        <summary className="px-3 py-2 cursor-pointer hover:bg-slate-50 text-sm font-semibold text-slate-700">
                          🤖 View Prompt
                        </summary>
                        <pre className="px-3 py-2 text-xs bg-slate-900 text-green-400 overflow-x-auto whitespace-pre-wrap font-mono max-h-64 overflow-y-auto">
                          {stagePrompts[stageInfo.key]}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isComplete && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
              <p className="text-sm text-amber-900">
                <strong>This takes 2-4 minutes.</strong> We're gathering comprehensive data to create the best possible design recommendations.
              </p>
            </div>
          )}

          {isComplete && (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-600" />
              <p className="text-lg font-bold text-green-900 mb-1">
                Research Complete!
              </p>
              <p className="text-sm text-green-700">
                All prompts are saved above. Review and click CLOSE when ready.
              </p>
            </div>
          )}
        </div>

        {isComplete && (
          <DialogFooter>
            <Button onClick={onClose} size="lg" className="bg-teal-700 hover:bg-teal-800">
              CLOSE
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}