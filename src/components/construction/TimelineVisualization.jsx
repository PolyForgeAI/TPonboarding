import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  Clock,
  ChevronRight,
  Download
} from "lucide-react";
import { motion } from "framer-motion";

export default function TimelineVisualization({ constructionRoadmap, startDate }) {
  const [expandedPhase, setExpandedPhase] = useState(null);

  const phases = constructionRoadmap?.phases || [];
  const totalDuration = constructionRoadmap?.total_duration || "12-16 weeks";

  // Calculate dates for each phase
  const start = startDate ? new Date(startDate) : new Date();
  let currentDate = new Date(start);
  
  const phasesWithDates = phases.map((phase, idx) => {
    const durationWeeks = parseInt(phase.duration) || 2;
    const startDate = new Date(currentDate);
    currentDate = new Date(currentDate.getTime() + durationWeeks * 7 * 24 * 60 * 60 * 1000);
    const endDate = new Date(currentDate);

    return {
      ...phase,
      phase_number: idx + 1,
      start_date: startDate,
      end_date: endDate,
      duration_weeks: durationWeeks,
      status: idx === 0 ? "in_progress" : "pending"
    };
  });

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        icon: <CheckCircle2 className="w-5 h-5" />,
        color: "green",
        bgColor: "from-green-50 to-emerald-50",
        borderColor: "border-green-300"
      },
      in_progress: {
        icon: <Clock className="w-5 h-5 animate-pulse" />,
        color: "blue",
        bgColor: "from-blue-50 to-cyan-50",
        borderColor: "border-blue-300"
      },
      pending: {
        icon: <Circle className="w-5 h-5" />,
        color: "gray",
        bgColor: "from-gray-50 to-slate-50",
        borderColor: "border-gray-300"
      },
      delayed: {
        icon: <AlertCircle className="w-5 h-5" />,
        color: "red",
        bgColor: "from-red-50 to-rose-50",
        borderColor: "border-red-300"
      }
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const exportTimeline = () => {
    const csvContent = [
      ["Phase", "Duration", "Start Date", "End Date", "Key Activities", "Inspections"],
      ...phasesWithDates.map(phase => [
        phase.phase_name,
        phase.duration,
        formatDate(phase.start_date),
        formatDate(phase.end_date),
        phase.key_activities?.join("; ") || "",
        phase.inspections_required?.join("; ") || ""
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'construction-timeline.csv';
    a.click();
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-600" />
              Construction Timeline
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Total Duration: {totalDuration}
            </p>
          </div>
          <Button onClick={exportTimeline} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timeline Bar */}
        <div className="relative">
          <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200" />
          <div className="relative flex justify-between">
            {phasesWithDates.map((phase, idx) => {
              const config = getStatusConfig(phase.status);
              const isExpanded = expandedPhase === idx;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / phasesWithDates.length}%` }}
                >
                  <button
                    onClick={() => setExpandedPhase(isExpanded ? null : idx)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isExpanded ? 'scale-110' : ''
                    } ${
                      phase.status === 'completed' ? 'bg-green-500 text-white' :
                      phase.status === 'in_progress' ? 'bg-blue-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {phase.phase_number}
                  </button>
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    {phase.phase_name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {phase.duration}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Phase Details */}
        <div className="space-y-4">
          {phasesWithDates.map((phase, idx) => {
            const config = getStatusConfig(phase.status);
            const isExpanded = expandedPhase === idx;

            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{ height: isExpanded ? 'auto' : '80px' }}
                className={`overflow-hidden rounded-xl border-2 ${config.borderColor} bg-gradient-to-r ${config.bgColor} transition-all`}
              >
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : idx)}
                  className="w-full p-4 flex items-center justify-between hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-white text-${config.color}-600`}>
                      {config.icon}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg text-gray-900">
                        Phase {phase.phase_number}: {phase.phase_name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(phase.start_date)} - {formatDate(phase.end_date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`bg-${config.color}-600`}>
                      {phase.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <ChevronRight 
                      className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 pb-4 space-y-4"
                  >
                    {/* Key Activities */}
                    {phase.key_activities && phase.key_activities.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Key Activities:</h5>
                        <ul className="space-y-1">
                          {phase.key_activities.map((activity, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Inspections */}
                    {phase.inspections_required && phase.inspections_required.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Required Inspections:</h5>
                        <ul className="space-y-1">
                          {phase.inspections_required.map((inspection, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span>{inspection}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Timeless Checkpoints */}
                    {phase.timeless_checkpoints && phase.timeless_checkpoints.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-cyan-900 mb-2">Timeless Quality Checkpoints:</h5>
                        <ul className="space-y-1">
                          {phase.timeless_checkpoints.map((checkpoint, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <Badge className="bg-cyan-600 text-xs">{i+1}</Badge>
                              <span>{checkpoint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Project Start</p>
            <p className="text-lg font-bold text-gray-900">{formatDate(start)}</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Estimated Completion</p>
            <p className="text-lg font-bold text-gray-900">
              {formatDate(phasesWithDates[phasesWithDates.length - 1]?.end_date || start)}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
            <p className="text-sm text-gray-600 mb-1">Total Phases</p>
            <p className="text-lg font-bold text-gray-900">{phases.length} phases</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}