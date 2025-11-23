import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { MessageSquare, Calendar, CheckCircle, Clock } from "lucide-react";

export default function CommunicationTimeline({ submission }) {
  const milestones = [
    {
      title: "Dossier Delivered",
      description: "You received your comprehensive Genesis Dossier",
      status: "completed",
      date: new Date(submission.created_date).toLocaleDateString(),
    },
    {
      title: "Review Period",
      description: "Take your time reviewing designs, 3D visualizations, and cost breakdowns",
      status: "current",
      date: "In progress",
    },
    {
      title: "Schedule Consultation (Optional)",
      description: "Book a call with our design team to discuss and refine concepts",
      status: "pending",
      date: "Your choice",
    },
    {
      title: "Design Finalization",
      description: "Lock in materials, finalize design, create construction-ready plans",
      status: "pending",
      date: "After consultation",
    },
    {
      title: "Permitting",
      description: "We submit plans and secure all required permits",
      status: "pending",
      date: "4-12 weeks",
    },
    {
      title: "Construction Begins",
      description: "Break ground and start building your dream backyard",
      status: "pending",
      date: "After permits",
    },
  ];

  const getStatusColor = (status) => {
    if (status === "completed") return "bg-green-600";
    if (status === "current") return "bg-cyan-600";
    return "bg-slate-300";
  };

  const getStatusIcon = (status) => {
    if (status === "completed") return <CheckCircle className="w-4 h-4" />;
    if (status === "current") return <Clock className="w-4 h-4 animate-pulse" />;
    return <Calendar className="w-4 h-4" />;
  };

  return (
    <Card className="border-none shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-600" />
          Your Journey with Timeless Pools
        </CardTitle>
        <p className="text-sm text-slate-600 mt-2">
          Complete transparency at every step. No communication black holes.
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200" />
          
          {/* Milestones */}
          <div className="space-y-6">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                {/* Status Dot */}
                <div className={`w-10 h-10 rounded-full ${getStatusColor(milestone.status)} flex items-center justify-center text-white shadow-lg z-10`}>
                  {getStatusIcon(milestone.status)}
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-slate-900">{milestone.title}</h4>
                    <span className="text-sm text-slate-500">{milestone.date}</span>
                  </div>
                  <p className="text-sm text-slate-600">{milestone.description}</p>
                  {milestone.status === "completed" && (
                    <Badge className="mt-2 bg-green-100 text-green-800">Completed</Badge>
                  )}
                  {milestone.status === "current" && (
                    <Badge className="mt-2 bg-cyan-100 text-cyan-800">Current Step</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Action */}
        <div className="mt-8 p-5 glass rounded-xl border-2 border-cyan-300/50">
          <h4 className="font-bold text-cyan-900 mb-2">What You Should Do Next</h4>
          <ol className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-600">1.</span>
              <span>Review all 3 design concepts and 3D visualizations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-600">2.</span>
              <span>Share with your spouse/partner and discuss priorities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-600">3.</span>
              <span>Review cost breakdowns and construction timeline</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-600">4.</span>
              <span>When ready, schedule a consultation to discuss next steps</span>
            </li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}