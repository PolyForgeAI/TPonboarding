
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, TrendingUp, AlertTriangle, Palette, Hammer } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { BRANDING } from "@/shared/components/branding/Constants";

export default function Layout({ children, currentPageName }) {
  const fullScreenPages = ["Welcome", "Onboarding", "Success", "SalesPresentation"];

  if (fullScreenPages.includes(currentPageName)) {
    return <>{children}</>;
  }

  const adminPages = ["AdminDashboard", "MaterialLibrary", "FeatureLibrary", "AdminQuestions", "APIStatus", "UserManagement", "Documentation"];
  const isAdminPage = adminPages.includes(currentPageName);

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <header className="glass sticky top-0 z-50 border-b border-white/20 shadow-soft backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to={createPageUrl("Welcome")} className="flex items-center gap-3 magnetic group">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-floating">
                  <span className="text-white text-2xl font-bold">T</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">{BRANDING.company_name}</h1>
                  <p className="text-xs text-slate-600">
                    {isAdminPage ? "Admin Console" : BRANDING.primary_product_name}
                  </p>
                </div>
              </Link>

              <nav className="flex items-center gap-3">
                {isAdminPage ? (
                  <>
                    <Link to={createPageUrl("AdminDashboard")}>
                      <Button
                        variant={currentPageName === "AdminDashboard" ? "default" : "ghost"}
                        className={currentPageName === "AdminDashboard" ? "bg-purple-600" : ""}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link to={createPageUrl("FeatureLibrary")}>
                      <Button
                        variant={currentPageName === "FeatureLibrary" ? "default" : "ghost"}
                        className={currentPageName === "FeatureLibrary" ? "bg-purple-600" : ""}
                      >
                        <Hammer className="w-4 h-4 mr-2" />
                        Features
                      </Button>
                    </Link>
                    <Link to={createPageUrl("MaterialLibrary")}>
                      <Button
                        variant={currentPageName === "MaterialLibrary" ? "default" : "ghost"}
                        className={currentPageName === "MaterialLibrary" ? "bg-purple-600" : ""}
                      >
                        <Palette className="w-4 h-4 mr-2" />
                        Materials
                      </Button>
                    </Link>
                    <Link to={createPageUrl("UserManagement")}>
                      <Button
                        variant={currentPageName === "UserManagement" ? "default" : "ghost"}
                        className={currentPageName === "UserManagement" ? "bg-purple-600" : ""}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Users
                      </Button>
                    </Link>
                    <Link to={createPageUrl("Documentation")}>
                      <Button
                        variant={currentPageName === "Documentation" ? "default" : "ghost"}
                        className={currentPageName === "Documentation" ? "bg-purple-600" : ""}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Docs
                      </Button>
                    </Link>
                    <Link to={createPageUrl("Welcome")}>
                      <Button variant="outline">
                        ← Back to App
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={createPageUrl("Welcome")}>
                      <Button variant="ghost" className="text-slate-600 hover:text-cyan-600 transition-colors">
                        Home
                      </Button>
                    </Link>
                    <Link to={createPageUrl("IntelligenceCenter")}>
                      <Button
                        variant="ghost"
                        className="text-slate-600 hover:text-cyan-600 transition-colors hidden md:flex items-center gap-2"
                      >
                        <TrendingUp className="w-4 h-4" />
                        Intelligence
                      </Button>
                    </Link>
                    <Link to={createPageUrl("PainPointsResearch")}>
                      <Button
                        variant="ghost"
                        className="text-slate-600 hover:text-red-600 transition-colors hidden lg:flex items-center gap-2"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        Pain Points
                      </Button>
                    </Link>
                    <Link to={createPageUrl("AdminDashboard")}>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg magnetic">
                        <Shield className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">Admin</span>
                      </Button>
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="glass border-t border-white/20 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">{BRANDING.company_name}</h3>
                <p className="text-sm text-slate-600">
                  {BRANDING.certifications.join(". ")}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Service Area</h4>
                <p className="text-sm text-slate-600 mb-2">
                  {BRANDING.location_tagline}
                </p>
                <ul className="space-y-1 text-sm text-slate-600">
                  {BRANDING.locations.map((loc, idx) => (
                    <li key={idx}>{loc}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Phone: {BRANDING.company_phone}</li>
                  <li>Email: {BRANDING.company_email}</li>
                  <li>
                    <a href={BRANDING.company_website} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">
                      {BRANDING.company_website.replace('https://', '')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-slate-500">
              <p>© {new Date().getFullYear()} {BRANDING.company_name}. All rights reserved.</p>
              <div className="mt-4">
                <Link to={createPageUrl("AdminDashboard")} className="text-slate-400 hover:text-slate-600 text-xs">
                  Builder Login
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
