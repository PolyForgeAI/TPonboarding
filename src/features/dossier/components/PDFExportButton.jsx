import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { FileDown, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function PDFExportButton({ submission }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    toast.loading("Generating your professional PDF dossier...");

    try {
      const printWindow = window.open('', '_blank');
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Timeless Pools Genesis Dossier - ${submission.contact_name}</title>
          <style>
            @page { margin: 0.75in; }
            body {
              font-family: 'Georgia', serif;
              font-size: 11pt;
              line-height: 1.6;
              color: #1a1a1a;
            }
            .cover-page {
              page-break-after: always;
              text-align: center;
              padding-top: 3in;
            }
            .cover-title {
              font-size: 48pt;
              font-weight: bold;
              color: #0891b2;
              margin-bottom: 0.25in;
            }
            .cover-subtitle {
              font-size: 20pt;
              color: #334155;
              margin-bottom: 1.5in;
            }
            .cover-info {
              font-size: 12pt;
              text-align: left;
              max-width: 4in;
              margin: 0 auto;
              border-top: 3px solid #0891b2;
              padding-top: 0.25in;
            }
            h1 {
              font-size: 24pt;
              color: #0891b2;
              border-bottom: 3px solid #0891b2;
              padding-bottom: 0.1in;
              margin-top: 0.5in;
              page-break-after: avoid;
            }
            h2 {
              font-size: 16pt;
              color: #0e7490;
              margin-top: 0.3in;
            }
            .section {
              margin-bottom: 0.3in;
              page-break-inside: avoid;
            }
            .data-row {
              display: flex;
              justify-content: space-between;
              padding: 0.08in;
              border-bottom: 1px solid #e5e7eb;
            }
            .highlight-box {
              background-color: #ecfeff;
              border-left: 4px solid #0891b2;
              padding: 0.15in;
              margin: 0.15in 0;
            }
            .warning-box {
              background-color: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 0.15in;
              margin: 0.15in 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 0.15in 0;
            }
            th {
              background-color: #f1f5f9;
              padding: 0.08in;
              text-align: left;
              font-weight: bold;
              border-bottom: 2px solid #0891b2;
            }
            td {
              padding: 0.08in;
              border-bottom: 1px solid #e5e7eb;
            }
            .page-break { page-break-before: always; }
            .footer {
              position: fixed;
              bottom: 0.5in;
              text-align: center;
              font-size: 9pt;
              color: #94a3b8;
            }
          </style>
        </head>
        <body>
          <!-- Cover Page -->
          <div class="cover-page">
            <div class="cover-title">Timeless Pools</div>
            <div class="cover-subtitle">Genesis Project Dossier</div>
            <div class="cover-info">
              <p><strong>Prepared For:</strong> ${submission.contact_name}</p>
              <p><strong>Property:</strong> ${submission.property_address}</p>
              <p><strong>Location:</strong> ${submission.property_city}, ${submission.property_state} ${submission.property_zip}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Project ID:</strong> ${submission.id.substring(0, 8).toUpperCase()}</p>
            </div>
          </div>

          <!-- Executive Summary -->
          <h1>Executive Summary</h1>
          <div class="section">
            <p>This Genesis Project Dossier represents comprehensive research, analysis, and expert design work specifically tailored to your property and vision using Timeless Pools' proprietary methodology.</p>
            
            <h2>Timeless Pools Design Methodology</h2>
            <div class="highlight-box">
              <p><strong>1. Intentional Design:</strong> Every element exists for a specific, purposeful reason.</p>
              <p><strong>2. Lines of Sight:</strong> 360-degree sightline analysis from every angle and position.</p>
              <p><strong>3. Traffic Flow:</strong> Intuitive movement patterns, blockage elimination, ease of use.</p>
              <p><strong>4. Advanced Lighting:</strong> 7-15 Jandy Infinite Watercolor lights for full illumination control.</p>
            </div>

            <h2>Your Vision</h2>
            <p style="font-style: italic; margin-left: 0.2in;">"${submission.pool_vision || 'Not provided'}"</p>

            <h2>Project Overview</h2>
            <table>
              <tr><td>Budget Range</td><td>${submission.budget_range}</td></tr>
              <tr><td>Timeline</td><td>${submission.timeline}</td></tr>
              <tr><td>Lot Size</td><td>${submission.property_data?.lot_square_footage || 'TBD'}</td></tr>
            </table>
          </div>

          ${submission.design_concepts?.map((concept, index) => `
          <div class="page-break"></div>
          <h1>Design Concept ${index + 1}: ${concept.name}</h1>
          <div class="section">
            <p style="font-style: italic; color: #0891b2; font-size: 13pt;">${concept.tagline || ''}</p>
            
            <h2>Overview</h2>
            <p>${concept.description}</p>

            ${concept.intentional_design_rationale ? `
            <h2>Intentional Design</h2>
            <div class="highlight-box">
              <p>${concept.intentional_design_rationale}</p>
            </div>
            ` : ''}

            ${concept.lines_of_sight_analysis ? `
            <h2>Lines of Sight Analysis</h2>
            <div class="highlight-box">
              <p>${concept.lines_of_sight_analysis}</p>
            </div>
            ` : ''}

            ${concept.traffic_flow_analysis ? `
            <h2>Traffic Flow</h2>
            <div class="highlight-box">
              <p>${concept.traffic_flow_analysis}</p>
            </div>
            ` : ''}

            ${concept.lighting_plan ? `
            <h2>Advanced Lighting Plan</h2>
            <table>
              <tr><td>Total Lights</td><td>${concept.lighting_plan.total_lights || 'TBD'} Jandy Infinite Watercolor</td></tr>
              <tr><td>Floor Uplights</td><td>${concept.lighting_plan.floor_uplights || 'TBD'}</td></tr>
              <tr><td>Trough Lights</td><td>${concept.lighting_plan.trough_lights || 'TBD'}</td></tr>
              <tr><td>Perimeter Lights</td><td>${concept.lighting_plan.perimeter_lights || 'TBD'}</td></tr>
              <tr><td>Control System</td><td>${concept.lighting_plan.control_system || 'Jandy iAquaLink'}</td></tr>
            </table>
            ${concept.lighting_plan.placement_details ? `<p>${concept.lighting_plan.placement_details}</p>` : ''}
            ` : ''}

            <h2>Specifications</h2>
            <table>
              <tr><td>Pool Dimensions</td><td>${concept.pool_dimensions || 'TBD'}</td></tr>
              <tr><td>Depth Range</td><td>${concept.pool_depth_shallow || 'TBD'} to ${concept.pool_depth_deep || 'TBD'}</td></tr>
              <tr><td>Total Area</td><td>${concept.total_square_footage || 'TBD'}</td></tr>
              <tr><td>Estimated Cost</td><td>${concept.estimated_cost || 'TBD'}</td></tr>
              <tr><td>Timeline</td><td>${concept.timeline || 'TBD'}</td></tr>
            </table>

            <h2>Timeless Pools Materials</h2>
            <table>
              <tr><td>Pool Finish</td><td>${concept.recommended_finish || 'Pebble Sheen'} ${concept.recommended_finish_color || ''}</td></tr>
              <tr><td>Waterline Tile</td><td>${concept.recommended_tile || 'Aquabella Glass Mosaic'}</td></tr>
              <tr><td>Coping</td><td>${concept.recommended_coping || 'MSI Natural Stone or Pacific Stone WC-104'}</td></tr>
              <tr><td>Decking</td><td>${concept.recommended_decking || 'Arterra Porcelain or Belgard Concrete'}</td></tr>
            </table>

            ${concept.equipment_specs ? `
            <h2>Jandy/Fluidra Equipment Package</h2>
            <table>
              <tr><td>Pump</td><td>${concept.equipment_specs.pump || 'Jandy Variable Speed'}</td></tr>
              <tr><td>Filter</td><td>${concept.equipment_specs.filter || 'TBD'}</td></tr>
              <tr><td>Heater</td><td>${concept.equipment_specs.heater || 'Jandy Pro Series Heat Pump'}</td></tr>
              <tr><td>Sanitizer</td><td>${concept.equipment_specs.sanitizer || 'AOP System'}</td></tr>
              <tr><td>Automation</td><td>${concept.equipment_specs.automation || 'Jandy iAquaLink'}</td></tr>
            </table>
            ` : ''}
          </div>
          `).join('') || ''}

          <!-- Disclaimers -->
          <div class="page-break"></div>
          <h1>Disclaimers & Attribution</h1>
          <div class="section">
            <h2>Data Sources & Accuracy</h2>
            <div class="warning-box">
              <p><strong>Property Data:</strong> Estimates based on publicly available information including county assessor records and online real estate platforms. Property values and characteristics should be verified independently.</p>
              
              <p><strong>GIS & Regulatory Data:</strong> Based on ${submission.property_city} municipal records current as of ${new Date().toLocaleDateString()}. Building codes and setback requirements are subject to change. Verify all requirements with local building department before construction.</p>
              
              <p><strong>Climate Data:</strong> Sourced from National Oceanic and Atmospheric Administration (NOAA), USDA Plant Hardiness Zone Map, and OpenWeatherMap.</p>
              
              <p><strong>Soil Data:</strong> Based on USGS Soil Survey. Professional soil testing recommended before construction.</p>
              
              <p><strong>Market Pricing:</strong> Estimates based on regional market research. Actual costs may vary significantly.</p>
              
              <p><strong>Contractor Information:</strong> Provided for informational purposes only. Timeless Pools does not endorse or guarantee the work of third-party contractors. Verify licensing, insurance, and references independently.</p>
            </div>

            <h2>Copyright & Proprietary Information</h2>
            <p>Design concepts, methodologies, and analysis © ${new Date().getFullYear()} Timeless Pools. All rights reserved.</p>
            <p>This dossier is prepared exclusively for ${submission.contact_name} and may not be redistributed without permission.</p>
            
            <h2>Materials & Equipment</h2>
            <p>All specified materials and equipment brands (Pebble Tec, Jandy/Fluidra, MSI, Belgard, Pacific Stone, Laticrete, Bull BBQ, etc.) are trademarks of their respective owners. Timeless Pools is an authorized dealer and installer.</p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} Timeless Pools | Confidential & Proprietary</p>
            <p>GENESIS® Certified Master | Elite Pebble Tec Builder | World's Greatest Pools Award Winner</p>
          </div>
        </body>
        </html>
      `;
      
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          setIsGenerating(false);
          toast.dismiss();
          toast.success("PDF ready! Print dialog opened.");
        }, 500);
      };

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.dismiss();
      toast.error("Failed to generate PDF. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      size="lg"
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <FileDown className="w-5 h-5 mr-2" />
          Export PDF
        </>
      )}
    </Button>
  );
}