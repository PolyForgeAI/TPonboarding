import React from "react";
import QuestionsList from "../components/QuestionsList";

export default function AdminQuestions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Development Notes</h1>
          <p className="text-gray-600">Questions and decisions made while you were away</p>
        </div>
        
        <QuestionsList />
      </div>
    </div>
  );
}