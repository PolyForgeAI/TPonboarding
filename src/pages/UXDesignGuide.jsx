import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle, Zap, Eye, MousePointer, Smartphone, Layers } from "lucide-react";

export default function UXDesignGuide() {
  return (
    <div className="min-h-screen gradient-mesh p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">UX Design System</h1>
          <p className="text-xl text-slate-600">
            Modern UI/UX principles implemented throughout Timeless Pools platform
          </p>
        </div>

        {/* Core Principles */}
        <Card className="mb-8 shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-600" />
              Core UX Principles (2024-2025)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Principle
              number="1"
              title="Progressive Disclosure"
              description="Show only what's needed when it's needed. Don't overwhelm users with everything at once."
              examples={[
                "Material selectors reveal pros/cons on click, not immediately",
                "Onboarding: one question at a time, clear progress",
                "Admin: expandable sections, not everything visible"
              ]}
            />

            <Principle
              number="2"
              title="Visual Hierarchy"
              description="Guide user's eye to most important elements first using size, color, spacing."
              examples={[
                "CTAs are larger, gradient-colored, positioned prominently",
                "Primary actions (Send Now) vs secondary (Schedule)",
                "Material cards: Image → Name → Description → Details"
              ]}
            />

            <Principle
              number="3"
              title="Instant Feedback"
              description="Users should immediately know their action succeeded or failed."
              examples={[
                "Material selection: instant ring + checkmark animation",
                "Content sent: green checkmark + toast notification",
                "Forms: inline validation, not after submit"
              ]}
            />

            <Principle
              number="4"
              title="Consistency"
              description="Same patterns = less cognitive load. Users learn once, apply everywhere."
              examples={[
                "All selectors use same card layout",
                "All CTAs use same gradient style",
                "All badges use same color system (Recommended=purple, Standard=green)"
              ]}
            />

            <Principle
              number="5"
              title="Mobile-First Responsive"
              description="Design for smallest screen first, enhance for larger screens."
              examples={[
                "Card grids: 1 col mobile → 2 col tablet → 3 col desktop",
                "Navigation: collapsed mobile → full desktop",
                "Touch targets: minimum 44x44px"
              ]}
            />

            <Principle
              number="6"
              title="Error Prevention"
              description="Make it hard to make mistakes. Confirm destructive actions."
              examples={[
                "Delete material: requires confirmation",
                "Unsaved changes: warn before leaving",
                "Form validation: guide to correct format"
              ]}
            />
          </CardContent>
        </Card>

        {/* Dashboard UX Best Practices */}
        <Card className="mb-8 shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-purple-600" />
              Dashboard Design Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <DashboardPrinciple
              title="F-Pattern Layout"
              description="Users scan in F-pattern: top left → top right → down left side. Place important info accordingly."
              implementation="Admin Dashboard: Stats at top, action buttons top right, lead list down left"
            />

            <DashboardPrinciple
              title="5-7 Cards Maximum"
              description="Don't overwhelm. Show 5-7 key metrics max. Rest goes in tabs or drill-down."
              implementation="Sales Hub: Tabs organize complexity (Score, Intent, Content, etc.)"
            />

            <DashboardPrinciple
              title="Color Psychology"
              description="Limit to 2-3 semantic colors. Red=urgent, Green=success, Blue=info, Yellow=warning."
              implementation="Lead Temperature: HOT=red, WARM=yellow, COOL=blue"
            />

            <DashboardPrinciple
              title="Data Density Balance"
              description="Not too sparse, not too cluttered. White space guides the eye."
              implementation="Material Library: Cards have breathing room, not crammed"
            />

            <DashboardPrinciple
              title="Actionable Data"
              description="Every metric should lead to an action. No vanity metrics."
              implementation="Lead Score → 'Call within 24 hours' (clear action)"
            />
          </CardContent>
        </Card>

        {/* Implementation Checklist */}
        <Card className="mb-8 shadow-elevated">
          <CardHeader>
            <CardTitle>Implementation Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <CheckItem text="✅ Loading states (skeletons, spinners)" />
              <CheckItem text="✅ Empty states (helpful, not just 'No data')" />
              <CheckItem text="✅ Error states (clear what went wrong + how to fix)" />
              <CheckItem text="✅ Success confirmations (toasts, checkmarks)" />
              <CheckItem text="✅ Hover states (cards lift, buttons darken)" />
              <CheckItem text="✅ Focus states (keyboard navigation visible)" />
              <CheckItem text="✅ Disabled states (grayed out, cursor not-allowed)" />
              <CheckItem text="✅ Animations (smooth, purposeful, <300ms)" />
              <CheckItem text="✅ Micro-interactions (button press, card select)" />
              <CheckItem text="✅ Responsive breakpoints (mobile, tablet, desktop)" />
            </div>
          </CardContent>
        </Card>

        {/* Design Tokens */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Design Tokens (Consistency System)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <TokenSection
              title="Colors"
              tokens={[
                { name: "Primary", value: "Cyan 600 → Blue 600 gradient", usage: "CTAs, links, focus" },
                { name: "Success", value: "Green 600", usage: "Confirmations, completed states" },
                { name: "Warning", value: "Amber 600", usage: "Warnings, pending actions" },
                { name: "Danger", value: "Red 600", usage: "Errors, destructive actions" },
                { name: "Info", value: "Blue 600", usage: "Information, hints" },
              ]}
            />

            <TokenSection
              title="Spacing"
              tokens={[
                { name: "Tight", value: "4px", usage: "Icon to text" },
                { name: "Normal", value: "8-12px", usage: "Form fields, list items" },
                { name: "Comfortable", value: "16-24px", usage: "Card padding, sections" },
                { name: "Spacious", value: "32-48px", usage: "Page sections" },
              ]}
            />

            <TokenSection
              title="Typography"
              tokens={[
                { name: "Heading XL", value: "48-64px bold", usage: "Hero headings" },
                { name: "Heading L", value: "32-40px bold", usage: "Page titles" },
                { name: "Heading M", value: "24-28px bold", usage: "Section titles" },
                { name: "Body", value: "14-16px regular", usage: "Content, descriptions" },
                { name: "Small", value: "12px regular", usage: "Labels, helpers" },
              ]}
            />

            <TokenSection
              title="Shadows"
              tokens={[
                { name: "Soft", value: "0 2px 8px rgba(0,0,0,0.05)", usage: "Cards, inputs" },
                { name: "Elevated", value: "0 8px 32px rgba(0,0,0,0.08)", usage: "Modals, dropdowns" },
                { name: "Floating", value: "0 16px 64px rgba(0,0,0,0.1)", usage: "Popovers, tooltips" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Principle({ number, title, description, examples }) {
  return (
    <div className="border-l-4 border-cyan-500 pl-6">
      <div className="flex items-start gap-3 mb-2">
        <Badge className="bg-cyan-600 text-white">{number}</Badge>
        <h3 className="font-bold text-lg text-slate-900">{title}</h3>
      </div>
      <p className="text-slate-700 mb-3">{description}</p>
      <div className="space-y-1">
        <strong className="text-sm text-slate-600">Examples:</strong>
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
          {examples.map((ex, idx) => <li key={idx}>{ex}</li>)}
        </ul>
      </div>
    </div>
  );
}

function DashboardPrinciple({ title, description, implementation }) {
  return (
    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
      <h4 className="font-semibold text-purple-900 mb-2">{title}</h4>
      <p className="text-sm text-purple-800 mb-2">{description}</p>
      <div className="text-xs text-purple-700">
        <strong>Implementation:</strong> {implementation}
      </div>
    </div>
  );
}

function CheckItem({ text }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
      <span className="text-slate-700">{text}</span>
    </div>
  );
}

function TokenSection({ title, tokens }) {
  return (
    <div>
      <h4 className="font-semibold text-slate-900 mb-3">{title}</h4>
      <div className="grid gap-2">
        {tokens.map((token, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <span className="font-medium text-slate-900">{token.name}</span>
              <span className="text-sm text-slate-600 ml-2">→ {token.value}</span>
            </div>
            <span className="text-xs text-slate-500">{token.usage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}