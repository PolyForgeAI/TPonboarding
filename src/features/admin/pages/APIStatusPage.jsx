import React from "react";
import APIIntegrationsList from "../components/APIIntegrationsList";

export default function APIStatus() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">API Integrations</h1>
          <p className="text-gray-600">Current status and planned enhancements</p>
        </div>
        
        <APIIntegrationsList />
      </div>
    </div>
  );
}