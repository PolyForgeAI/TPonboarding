// CENTRALIZED BRANDING CONSTANTS
// Update these values to instantly rebrand across entire app

export const BRANDING = {
  // Company Info
  company_name: "Timeless Pools",
  company_tagline: "GENESIS® Certified Master",
  company_phone: "(555) 123-4567",
  company_email: "info@timelesspools.us",
  company_website: "https://timelesspools.us",
  
  // Product Names
  primary_product_name: "Signature Design Experience",
  primary_product_short: "Design Experience",
  primary_product_description: "Comprehensive pool design analysis with 3D concepts, property intelligence, and transparent pricing",
  
  // Legacy names (for reference, not used in UI)
  legacy_names: [
    "Genesis Project Dossier", // Original
    "ProBuilder Complete",
    "PoolScape"
  ],
  
  // Platform Branding (future SaaS product)
  platform_name: "Crest", // From strategic vision
  platform_tagline: "Where Elite Builders Rise",
  
  // Locations - Updated messaging
  location_tagline: "Building in CA & UT • Designing Everywhere",
  locations: [
    "Orange County, California",
    "Northern Utah"
  ],
  
  // Certifications & Awards
  certifications: [
    "GENESIS® Certified Master",
    "World's Greatest Pools Award Winner",
    "Elite Pebble Tec Builder"
  ],
  
  // Value Props
  value_props: {
    dossier_value: "$10,000+",
    analysis_time: "24 hours",
    transparency: "Zero surprise charges. Ever.",
    visualization: "See it in 3D BEFORE we break ground"
  },
  
  // UI Copy
  ui_copy: {
    access_code_label: "Have an Access Code?",
    access_code_placeholder: "Enter code (e.g., ABC-123)",
    request_access_heading: "Get Your Custom Design Experience",
    generating_message: "Generating your Signature Design Experience...",
    dossier_ready: "Your Design Experience is ready!",
    view_dossier: "View Your Design Experience",
    admin_dashboard_title: "Customer Projects",
    create_project_button: "Create New Project"
  }
};

// Helper function to get product name with article
export function getProductNameWithArticle(includeArticle = true) {
  return includeArticle 
    ? `your ${BRANDING.primary_product_name}`
    : BRANDING.primary_product_name;
}

// Helper function for possessive form
export function getProductNamePossessive() {
  return `${BRANDING.primary_product_name}'s`;
}