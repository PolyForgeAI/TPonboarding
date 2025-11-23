import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { MessageSquare, Phone, Mail, Calendar, Shield, CheckCircle } from "lucide-react";

export default function NoCommunicationBlackHole({ submission }) {
  return (
    <div className="space-y-6">
      {/* Communication Promise */}
      <Card className="border-none shadow-elevated overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-green-600 to-emerald-600" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Our Communication Guarantee
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>The #1 complaint about pool builders: "They ghosted me."</strong> We've heard this horror story too many times. 
            Here's our promise: you'll never wonder what's happening with your project.
          </p>

          <div className="space-y-3">
            <GuaranteeItem
              icon={<MessageSquare className="w-5 h-5" />}
              title="Response Within 24 Hours"
              description="Email, text, or call—we respond within one business day, guaranteed."
            />
            <GuaranteeItem
              icon={<Calendar className="w-5 h-5" />}
              title="Weekly Progress Updates"
              description="During construction, you'll receive photo updates and status reports every week."
            />
            <GuaranteeItem
              icon={<Phone className="w-5 h-5" />}
              title="Direct Line to Project Manager"
              description="No phone trees. You'll have your project manager's direct contact."
            />
            <GuaranteeItem
              icon={<Mail className="w-5 h-5" />}
              title="Proactive Communication"
              description="We reach out BEFORE issues arise, not after. Transparency is our standard."
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Options */}
      <Card className="border-none shadow-elevated">
        <CardHeader>
          <CardTitle>Ready to Discuss Your Design?</CardTitle>
          <p className="text-sm text-slate-600 mt-1">
            No pressure, no aggressive sales. Just helpful, expert guidance.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            size="lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule a Consultation Call
          </Button>
          
          <div className="grid md:grid-cols-2 gap-3">
            <Button variant="outline" size="lg" className="w-full">
              <Phone className="w-5 h-5 mr-2" />
              Call: (555) 123-4567
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <Mail className="w-5 h-5 mr-2" />
              Email Our Team
            </Button>
          </div>

          <div className="p-4 glass rounded-xl border-2 border-blue-300/50 text-center">
            <p className="text-sm text-slate-700">
              <strong>Average response time:</strong> 3 hours during business hours
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Trust Builders */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl">
        <h3 className="text-xl font-bold mb-4">Why Customers Trust Timeless Pools</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <TrustItem text="GENESIS® Certified Master (highest industry certification)" />
          <TrustItem text="World's Greatest Pools Award Winner" />
          <TrustItem text="$10,000+ dossier provided upfront (transparency first)" />
          <TrustItem text="100+ 5-star reviews from real customers" />
          <TrustItem text="20+ years combined team experience" />
          <TrustItem text="Zero high-pressure sales tactics—ever" />
        </div>
      </div>
    </div>
  );
}

function GuaranteeItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3 p-4 glass rounded-xl">
      <div className="p-2 bg-green-100 rounded-lg text-green-600">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function TrustItem({ text }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
      <span className="text-sm text-white/90">{text}</span>
    </div>
  );
}