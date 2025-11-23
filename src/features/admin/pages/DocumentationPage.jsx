import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function Documentation() {
  const downloadMarkdown = () => {
    const markdown = DOCUMENTATION_CONTENT;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Timeless-Pools-Documentation.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-teal-700" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Comprehensive Documentation</h1>
              <p className="text-slate-600">For team, legal counsel, and internal training</p>
            </div>
          </div>
          <Button onClick={downloadMarkdown} className="bg-teal-700">
            <Download className="w-4 h-4 mr-2" />
            Download .md File
          </Button>
        </div>

        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <div className="prose prose-slate max-w-none">
              <pre className="whitespace-pre-wrap font-mono text-sm bg-slate-50 p-6 rounded-lg overflow-auto max-h-[70vh]">
                {DOCUMENTATION_CONTENT}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-900">
            <strong>Note:</strong> Click "Download .md File" to save this documentation as a Markdown file for sharing with your team and legal counsel.
          </p>
        </div>
      </div>
    </div>
  );
}

const DOCUMENTATION_CONTENT = `# Timeless Pools Application - Comprehensive Documentation

**Version:** 1.0  
**Last Updated:** 2025-11-19  
**Purpose:** Internal documentation for team, legal counsel, and user training

---

## Table of Contents

1. [Application Overview](#application-overview)
2. [Customer-Facing Screens](#customer-facing-screens)
3. [Admin & Internal Tools](#admin--internal-tools)
4. [Data Collection Summary](#data-collection-summary)
5. [AI/LLM Integration & Prompts](#aillm-integration--prompts)
6. [Data Security & Privacy](#data-security--privacy)
7. [Entity Schemas](#entity-schemas)
8. [Legal & Compliance Summary](#legal--compliance-summary)

---

## 1. Application Overview

### 1.1 Purpose
The Timeless Pools application streamlines the pool design and sales process by:
- Collecting comprehensive customer requirements through a guided onboarding flow
- Using AI to analyze properties, markets, and design opportunities
- Generating professional design concepts and accurate cost estimates
- Providing transparency and eliminating the traditional "communication black hole"

### 1.2 Core Value Proposition
- **Customer Value:** $10,000+ value design analysis delivered in 24 hours
- **Transparency:** Zero surprise charges, complete cost breakdown upfront
- **Visualization:** See designs in 3D before construction begins
- **Intelligence:** AI-powered property research and market analysis

### 1.3 User Types
1. **Customers:** Prospective pool buyers completing onboarding
2. **Sales Team:** Reviewing submissions, running research, managing projects
3. **Admins:** Managing materials, features, users, and system configuration

---

## 2. Customer-Facing Screens

### 2.1 Welcome Page (\`/welcome\`)

**Purpose:** Landing page for new and returning customers

**Customer Actions:**
- Enter existing access code (format: ABC-123)
- Request new project access by providing basic contact information

**Data Collected (for new requests):**
- \`contact_name\` (string, required)
- \`contact_email\` (string, required)
- \`contact_phone\` (string, optional)
- \`property_city\` (string, required)
- \`property_state\` (string, required)

**Output:**
- Generates unique \`access_code\` (6-character alphanumeric with hyphen)
- Creates new \`OnboardingSubmission\` record
- Redirects to onboarding flow

**Legal Notes:**
- No payment information collected at this stage
- Email provides consent for project-related communication

---

### 2.2 Onboarding Flow (\`/onboarding\`)

Multi-step guided questionnaire to understand customer needs and preferences.

#### Step 1: Expectations (\`StepExpectations\`)

**Purpose:** Set customer expectations for the process

**Data Collected:** None (informational only)

**Content Displayed:**
- What to expect during onboarding
- How long it takes (10-15 minutes)
- What happens with their information
- Timeline for receiving design concepts

**Legal Notes:** Sets expectations for response time and deliverables

---

#### Step 2: Get to Know You (\`StepGetToKnowYou\`)

**Purpose:** Collect contact and property basics

**Data Collected:**
- \`contact_name\` (string, required)
- \`contact_email\` (string, required)
- \`contact_phone\` (string, optional)
- \`project_type\` (enum: "new_construction", "remodel", "repair_upgrade", "exploring")
- \`property_address\` (string, required)
- \`property_city\` (string, required)
- \`property_state\` (string, required)
- \`property_zip\` (string, required)
- \`decision_maker_count\` (enum: "1", "2")
- \`decision_makers\` (array of objects, conditional):
  - \`name\` (string)
  - \`email\` (string)
  - \`relationship\` (string)

**Validation:**
- Email format validation
- ZIP code format validation
- If 2 decision makers selected, both names required

**Legal Notes:**
- Primary contact information for all communications
- If multiple decision makers, ensures all parties are informed

---

#### Step 3: Lifestyle & Vision (\`StepLifestyleVision\`)

**Purpose:** Understand customer's vision and how they'll use the space

**Data Collected:**
- \`pool_vision\` (string, long text, required)
  - "Describe your dream outdoor space..."
- \`primary_use\` (array of strings, multiple selection):
  - Options: "Family Recreation", "Fitness/Exercise", "Entertainment", "Relaxation", "Property Value", "Aesthetics"
- \`household_size\` (enum: "1-2", "3-4", "5+")
- \`has_children\` (boolean)
- \`has_pets\` (boolean)
- \`entertainment_frequency\` (enum: "rarely", "monthly", "weekly", "daily")

**Legal Notes:**
- Captures intended use for design safety considerations
- Children/pets information relevant for safety features (fencing, depth, etc.)

---

#### Step 4: Features & Outcomes (\`StepFeaturesOutcomes\`)

**Purpose:** Identify desired features and prioritize them

**Data Collected:**
- \`desired_features\` (array of strings, ordered by priority):
  - Available features: spa, waterfall, fountain, fire_features, outdoor_kitchen, bbq, bar, pergola, cabana, seating, lighting, landscaping
- \`must_haves_text\` (string, long text)
- \`nice_to_haves_text\` (string, long text)
- \`desired_outcomes\` (string, long text)
  - "What outcomes are most important to you?"

**Special Handling for Multiple Decision Makers:**
- If \`decision_maker_count\` = "2", captures separate preferences:
  - \`features_by_person\` (array of 2 objects):
    - \`desired_features\` (array, per person)
    - \`must_haves_text\` (string, per person)
    - \`nice_to_haves_text\` (string, per person)

**Feature Prioritization:**
- Drag-and-drop ranking interface
- Top features = highest priority for design concepts

**Legal Notes:**
- Documents agreed-upon project scope
- Separates "must-have" from "nice-to-have" for budget discussions

---

#### Step 5: Inspiration (\`StepInspiration\`)

**Purpose:** Collect visual references for aesthetic preferences

**Data Collected:**
- \`inspiration_images\` (array of strings/URLs)
  - Maximum: No hard limit, but UI suggests 5-10 images
  - File upload via \`base44.integrations.Core.UploadFile\`
  - Stores public URLs to uploaded images

**Image Analysis (Future):**
- \`inspiration_analysis\` (object, generated by LLM)
  - Identifies style patterns, color preferences, materials shown

**Legal Notes:**
- Customers can only upload images they have rights to use
- Images used for internal design reference only, not published

---

#### Step 6: Materials & Equipment (\`StepMaterials\`)

**Purpose:** Gather material and equipment preferences

**Data Collected:**
- \`material_selections\` (object):
  - Categories: pool_finish, waterline_tile, coping, deck_material, equipment
  - For each category: selected \`material_id\` from Material library
- \`equipment_preferences\` (object):
  - Heating: "none", "gas", "electric", "solar", "heat_pump"
  - Automation: "none", "basic", "full"
  - Lighting: "standard", "led_color", "premium"
  - Cleaning: "manual", "pressure_side", "robotic"

**Material Selection Process:**
- Customers view curated material library
- Each material shows: brand, style, price indicator ($-$$$$), image
- AI can suggest material combinations based on style preferences

**Legal Notes:**
- Material selections are preferences, not final specifications
- Actual materials subject to availability and final contract

---

#### Step 7: Investment (\`StepInvestment\`)

**Purpose:** Understand budget and timeline expectations

**Data Collected:**
- \`budget_range\` (enum, required):
  - Options: "$75k-$100k", "$100k-$150k", "$150k-$200k", "$200k-$300k", "$300k+"
- \`timeline\` (enum, required):
  - Options: "ASAP", "1-3 months", "3-6 months", "6-12 months", "12+ months", "Just exploring"
- \`financing_interest\` (boolean)
- \`additional_notes\` (string, long text)
- \`consents\` (object, required):
  - \`terms_accepted\` (boolean, required)
  - \`marketing_consent\` (boolean, optional)
  - \`data_sharing_consent\` (boolean, optional)

**Consent Language:**
- **Terms:** "I agree to receive project-related communications and understand my information will be used to create design concepts."
- **Marketing:** "I'd like to receive updates about pool care, design trends, and special offers."
- **Data Sharing:** "I consent to sharing my project with contractors and suppliers as needed for accurate estimates."

**Legal Notes:**
- CRITICAL: Terms consent is required to proceed
- Marketing consent is optional, controls future non-project communications
- Budget ranges are estimates, not binding quotes
- Timeline preferences help prioritize sales follow-up

---

### 2.3 Success Page (\`/success\`)

**Purpose:** Confirm submission and set expectations

**Content Displayed:**
- Thank you message
- Access code for returning customers
- Next steps timeline:
  1. **Within 24 hours:** Design team reviews submission
  2. **24-48 hours:** Comprehensive research & analysis
  3. **2-3 days:** Initial design concepts & pricing
  4. **Within 1 week:** Consultation call scheduled
- Contact information for questions
- Link to return to Welcome page

**Data Updated:**
- \`status\` → "completed"
- \`completed_date\` (timestamp)

**Legal Notes:**
- No binding commitment at this stage
- Timeline is estimate, not guarantee

---

## 3. Admin & Internal Tools

### 3.1 Admin Dashboard (\`/admin-dashboard\`)

**Purpose:** Central hub for managing all projects and running AI research

**Access Control:** Requires \`role = 'admin'\`

**Features:**

#### 3.1.1 Project Overview
- Display all OnboardingSubmissions with search/filter
- Statistics: Total projects, unique contacts, in-progress, completed
- Quick actions: View, research, delete projects

#### 3.1.2 Manual Project Creation
**Use Case:** Sales team creates project for customer (e.g., from phone call)

**Data Input:**
- Contact: name, email, phone
- Property: address, city, state, ZIP

**System Actions:**
- Generates unique \`access_code\`
- Sets \`created_by_admin\` = true
- Sets \`status\` = "in_progress", \`current_step\` = 1
- Creates shareable onboarding link

**Legal Notes:**
- Requires customer verbal/written consent to create project
- Must inform customer of access code and how to continue

#### 3.1.3 Comprehensive AI Research

**Trigger:** Admin clicks "Run Research" on completed submission

**Purpose:** Gather deep intelligence about property, market, and customer to inform design

**Process:** Sequential LLM API calls with web research enabled

*See Section 5 for detailed prompts and outputs*

---

### 3.2 Feature Library (\`/feature-library\`)

**Purpose:** Manage catalog of available pool features

**Access Control:** Requires \`role = 'admin'\`

**CRUD Operations:**
- Create new features (e.g., "Infinity Edge", "Tanning Ledge")
- Edit existing features (description, cost, images)
- Delete features (removes from customer selection options)
- Toggle active status (hide without deleting)

**Legal Notes:**
- Feature descriptions must be accurate to avoid misrepresentation
- Cost ranges are estimates, not guarantees

---

### 3.3 Material Library (\`/material-library\`)

**Purpose:** Manage catalog of construction materials

**Access Control:** Requires \`role = 'admin'\`

**CRUD Operations:**
- Create new materials (e.g., "Pebble Tec Tahoe Blue")
- Edit material details (brand, pricing, images)
- Delete materials (removes from customer selection)
- Toggle active status

**Legal Notes:**
- Material representations must be accurate
- Images should be from manufacturer (avoid copyright issues)
- Price indicators are relative, not absolute prices

---

### 3.4 User Management (\`/user-management\`)

**Purpose:** View and manage admin/sales team users

**Access Control:** Requires \`role = 'admin'\`

**Operations:**
- View all users (name, email, role, status)
- Toggle user active/inactive status
- **Note:** User creation happens via Base44 platform (invite system)

**Security:**
- Built-in User entity has special security rules
- Regular users can only view/update their own record
- Admins can list, view, update, delete other users

**Legal Notes:**
- User accounts represent employees/contractors
- Inactive users cannot access system but data is retained

---

### 3.5 Intelligence Center (\`/intelligence-center\`)

**Purpose:** Market intelligence and trend analysis tools

**Access Control:** Requires \`role = 'admin'\`

**Modules:**
- **Design Trend Predictor:** Analyzes industry trends and emerging styles
- **Neighborhood Mapper:** Pool penetration analysis by ZIP code
- **Weather Intelligence:** Climate-based design recommendations (placeholder)

**Legal Notes:**
- Uses publicly available data only
- Market analysis is for internal use, not customer-facing claims

---

### 3.6 Pain Points Research (\`/pain-points-research\`)

**Purpose:** Competitive intelligence - identify customer pain points with other builders

**Access Control:** Requires \`role = 'admin'\`

**Process:**
1. Admin triggers research
2. LLM searches web for customer reviews, forums, complaints about pool builders
3. Analyzes and categorizes findings

**Output Categories:**
- Strategic insights
- Detailed pain points with severity ratings
- Customer quotes (anonymized)
- Proposed solutions
- Trust builders vs. trust destroyers

**Legal Notes:**
- Uses publicly available review data only
- Competitor information for internal strategy, not public claims

---

## 4. Data Collection Summary

### 4.1 Customer Information Collected

**Required Fields:**
- Contact: name, email
- Property: address, city, state, ZIP
- Vision: pool vision description
- Primary use: at least one selection
- Investment: budget range, timeline
- Consents: terms acceptance

**Optional Fields:**
- Contact: phone
- Decision makers: second decision maker details
- Lifestyle: household size, children, pets, entertainment frequency
- Features: must-haves, nice-to-haves, desired outcomes
- Inspiration: images
- Materials: specific material preferences
- Equipment: heating, automation, lighting, cleaning preferences
- Investment: financing interest, additional notes
- Marketing: consent for promotional communications

### 4.2 Data Retention

**Active Projects:**
- All data retained indefinitely while project is active
- Customers can access via access code

**Completed Projects:**
- Data retained for minimum 7 years (standard construction industry)
- Used for warranty, legal, and portfolio purposes

**Deleted Projects:**
- Admin can delete projects
- Soft delete recommended (mark inactive) vs. hard delete
- Consider GDPR "right to be forgotten" compliance

### 4.3 Data Sharing

**Internal:**
- Sales team access to all submissions
- Design team access to assigned projects

**External (with customer consent):**
- Contractors/subcontractors: For accurate estimates
- Material suppliers: For lead times and availability
- Financing partners: If customer opts for financing

**Legal Notes:**
- Data sharing consent obtained in Step 7
- Third parties must have data protection agreements
- Customer can revoke consent (impacts ability to provide service)

---

## 5. AI/LLM Integration & Prompts

### 5.1 LLM Provider
- **Service:** Base44 Core Integration → \`InvokeLLM\`
- **Model:** GPT-4 class (exact model managed by platform)
- **Key Feature:** \`add_context_from_internet: true\` enables web search

### 5.2 When LLMs Are Used

1. **Comprehensive Research (Admin-triggered):** Deep property and market analysis
2. **Design Concept Generation:** Create award-winning pool designs
3. **Material Recommendations (Future):** Suggest material combinations
4. **Inspiration Analysis (Future):** Extract style preferences from images

### 5.3 Comprehensive Research - Detailed Prompts

**Location:** \`pages/AdminDashboard.js\` → \`handleRunResearch\` function

---

#### 5.3.1 Property Research

**Trigger:** Admin clicks "Run Research"

**Prompt Excerpt:**
\`\`\`
YOU MUST USE WEB RESEARCH FOR THIS TASK. Search multiple real estate websites and public databases.

CRITICAL REQUIREMENTS:
- Return ACTUAL DATA with specific numbers and measurements
- "Not available" or "Unknown" responses are NOT ACCEPTABLE unless you've exhausted all sources

WHERE TO LOOK FOR DATA (CHECK ALL OF THESE):
1. Zillow.com - Search exact address for property values, tax info, lot size, recent sales
2. Redfin.com - Search exact address for market data, neighborhood stats  
3. Realtor.com - Search exact address for property details and photos
4. County assessor websites
5. Google Maps (satellite view for aerial imagery)
6. Greatschools.org for school ratings

REQUIRED DATA TO FIND:
1. PROPERTY VALUATION & FINANCIALS
   - Current estimated market value
   - Tax assessment value
   - Recent sales comparables
   - Annual property tax
   - HOA fees if applicable
   - Estimated ROI with pool addition

2. PHYSICAL CHARACTERISTICS
   - Exact lot dimensions in feet
   - Total lot square footage
   - Lot shape description
   - Buildable backyard area
   - Topography (flat, sloped, multi-level)
   - Backyard orientation

3. NEIGHBORHOOD INTELLIGENCE
   - Average home values in ZIP code
   - Pool penetration rate
   - Typical pool features
   - School district and ratings

4. IMAGE & VISUAL RESEARCH (PROVIDE WORKING LINKS)
   - Google Maps link
   - Zillow/Redfin property pages
   - Google Images search
   - Aerial satellite view URL
\`\`\`

**Output:** Stores in \`OnboardingSubmission.property_data\` with 30+ fields including valuation, lot specs, neighborhood stats, and working URLs

**Legal/Privacy:** Uses only publicly available property data

---

#### 5.3.2 GIS & Zoning Research

**Prompt Excerpt:**
\`\`\`
YOU MUST USE WEB RESEARCH FOR THIS TASK. Search government and municipal websites.

WHERE TO LOOK FOR DATA:
1. Google: "[City] [State] GIS portal"
2. Google: "[City] parcel viewer"
3. Google: "[City] county assessor [address]"
4. Google: "City of [City] zoning map"
5. Google: "[City] building setback requirements"
6. Google: "[City] pool permit requirements"

REQUIRED DATA:
1. PARCEL INFORMATION
   - APN (Assessor Parcel Number)
   - Zoning classification (R-1, R-2, etc.)
   - Lot coverage limit percentage

2. SETBACK REQUIREMENTS (DO NOT RETURN "NOT AVAILABLE")
   - Front yard setback
   - Side yard setbacks
   - Rear yard setback
   - Pool-specific setback

3. PERMIT INFO
   - Typical permit timeline
   - Estimated permit costs
   - Fence/barrier requirements
\`\`\`

**Output:** Stores in \`OnboardingSubmission.gis_data\`

**Legal:** Building codes vary by jurisdiction. Research provides guidance, not legal advice. Customer responsible for obtaining proper permits.

---

#### 5.3.3 Environmental Analysis

**Prompt Excerpt:**
\`\`\`
YOU MUST USE WEB RESEARCH FOR THIS TASK. Use weather and climate databases.

WHERE TO LOOK FOR DATA:
- NOAA.gov - official climate data
- Weather.gov - local forecast office data
- SunCalc.org - sun path analysis
- USDA Plant Hardiness Zone Map
- Weatherspark.com - climate statistics

ANALYZE IN DETAIL:
1. SOLAR ANALYSIS
   - Sun path throughout the day
   - Morning/afternoon sun exposure hours
   - Best pool orientation for sun
   - Solar heating viability

2. CLIMATE DATA
   - USDA Hardiness Zone
   - Average temperature range
   - Pool season length (months)
   - Freeze risk days per year
   - Average rainfall
   - Wind patterns

3. MICROCLIMATE FACTORS
   - Heat island effects
   - Best heating system recommendation

4. SITE CONSIDERATIONS
   - Privacy analysis
   - Views to preserve or enhance
\`\`\`

**Output:** Stores in \`OnboardingSubmission.environmental_analysis\`

---

#### 5.3.4 Market Analysis

**Prompt Excerpt:**
\`\`\`
YOU MUST USE WEB RESEARCH FOR THIS TASK. Search pool builder websites, forums, and local market data.

CRITICAL REQUIREMENTS:
- Use ONLY 2024-2025 pricing data
- NO NATIONAL AVERAGES - focus on local market (Orange County CA / Park City UT)
- Return ACTUAL PRICE RANGES from real sources

WHERE TO LOOK FOR DATA:
- Local pool builder websites
- TroubleFreePools.com forums - real customer pricing
- HomeAdvisor [Location] pool costs
- Houzz.com pool project costs for [Location]
- Search "gunite pool cost [Location] 2024"

ACCURATE PRICING FOR SOCAL GUNITE POOLS (2024-2025):
- Basic pool only: $90,000-$100,000
- Mid-tier complete: $130,000-$180,000  
- High-end complete: $180,000-$280,000
- Ultra-luxury resort-style: $280,000-$500,000+

RESEARCH AND ANALYZE:
1. ACCURATE PRICING INTELLIGENCE
   - Cost per square foot for gunite pools
   - Typical pool sizes (400-600 sq ft)
   - Equipment costs (Pentair, Jandy)
   - Elite finishes (Pebble Tec)

2. LOCAL MARKET TRENDS
   - Most popular pool styles
   - Trending features
   - Premium finish preferences

3. COMPETITIVE LANDSCAPE
   - Competitors: Presidential Pools, Shasta Pools, California Pools
   - Typical timelines: 4-6 months
   - Common customer issues

4. VALUE OPTIMIZATION
   - High-value features worth investment
   - Features that don't add significant value
\`\`\`

**Output:** Stores in \`OnboardingSubmission.market_analysis\`

**Legal:** Pricing data for internal estimation only. Not binding quotes. Actual costs depend on specific design and site conditions.

---

#### 5.3.5 Customer Research

**Prompt Excerpt:**
\`\`\`
YOU MUST USE WEB RESEARCH FOR THIS TASK. Search social media and professional networks.

CRITICAL: Use ONLY publicly available information. Respect privacy.

WHERE TO LOOK:
- LinkedIn.com - professional background
- Google search for name + location
- Public social media profiles (if available)
- Professional websites or portfolios
- News articles or press mentions

Find public information:
- Professional background/industry
- Interests and hobbies
- Lifestyle indicators
- Design style preferences (if evident)

Use this to suggest personalized design elements.
\`\`\`

**Output:** Stores in \`OnboardingSubmission.customer_research\`

**Privacy & Legal:**
- **CRITICAL:** Only publicly available information
- No access to private accounts or protected data
- Complies with CCPA, GDPR data collection principles
- Information used solely for personalization, not sold
- Customers can request deletion
- No credit checks, financial investigations, or background checks

---

#### 5.3.6 Design Concept Generation

**Prompt Excerpt:**
\`\`\`
You are an ELITE outdoor living and pool design expert at Timeless Pools, a GENESIS® Certified Master Builder and World's Greatest Pools Award Winner.

Create AWARD-WINNING CALIBER design concepts for this project.

PROPERTY INTELLIGENCE:
[Inserts all gathered property data]

CUSTOMER VISION & REQUIREMENTS (CRITICAL - USE THIS DATA):
[Inserts customer's stated vision, features, budget, lifestyle]

TASK: Create 3-5 EXCEPTIONAL design concepts that would win awards. Each concept should:

1. USE CUSTOMER INPUT DATA (CRITICAL)
   - MUST incorporate their stated vision and must-have features
   - Design around household needs (children, entertaining)
   - Honor style preferences
   - Stay within or justify exceeding budget

2. RESPECT EXISTING CONDITIONS
   - Account for remodel vs. new construction
   - Incorporate features customer wants to keep

3. DEMONSTRATE ELITE DESIGN THINKING
   - Create cohesive outdoor living spaces
   - Consider sight lines from home
   - Design intentional traffic flow
   - Integrate landscape architecture

4. INCORPORATE PREMIUM FEATURES APPROPRIATELY
   - Elite Pebble Tec finishes
   - LED color-changing lighting
   - Automation systems
   - Quality water features
   - Premium fire features

5. DESIGN LOGICAL, BUILDABLE POOLS
   - Pool dimensions must fit buildable area and respect setbacks
   - All features must make physical sense together

6. RESPECT ACTUAL PRICING
   [Provides local pricing ranges]

For each concept provide:
- Concept name (creative, inspired by vision)
- Design style
- Detailed pool dimensions
- Complete feature list with reasoning
- Traffic flow and circulation strategy
- Materials and finishes specification
- Why this design addresses customer needs
- Accurate cost estimate
- Construction complexity notes
- Phasing options if over budget
\`\`\`

**Output:** Stores in \`OnboardingSubmission.design_concepts\` (array of 3-5 concepts)

**Legal:**
- Design concepts are proposals, not final plans
- Designs must be reviewed and approved by customer
- Engineering review required before construction
- Concepts do not constitute architectural or engineering services
- Final plans must be stamped by licensed professionals where required

---

### 5.4 LLM Data Quality & Validation

**Quality Assurance:**
- Each prompt requires "data quality score" in response
- Prompts demand explanation of which sources were checked
- "Not available" responses must justify why data couldn't be found
- Typical/average values accepted if exact data unavailable

**Human Review Required:**
- All AI research reviewed by sales team before customer presentation
- Pricing estimates verified against recent projects
- Design concepts checked for buildability
- Zoning/permit information verified with local authorities

**Disclaimer:**
- AI research is for preliminary planning only
- Not a substitute for professional engineering, legal, or financial advice
- Actual costs may vary based on site conditions
- Customer responsible for verifying all information

---

## 6. Data Security & Privacy

### 6.1 Data Protection Measures

**Platform Security (Base44):**
- Encrypted data transmission (HTTPS/TLS)
- Encrypted data at rest
- Role-based access control (RBAC)
- Audit logging of data access
- Regular security updates

**Application-Level Security:**
- User authentication required for admin functions
- Access codes provide limited customer access (no auth required)
- No credit card or financial data stored
- No social security numbers or sensitive personal identifiers

### 6.2 Privacy Compliance

**CCPA Compliance (California):**
- Privacy policy discloses data collection practices
- Customers can request data deletion ("right to be forgotten")
- Opt-out option for marketing communications
- No sale of personal information to third parties

**GDPR Considerations:**
- Lawful basis: Consent + Legitimate Interest
- Data minimization: Only collect what's needed
- Right to access: Customers can request their data
- Right to erasure: Data deletion on request
- Data portability: Can export customer data

**Children's Privacy:**
- No intentional collection of data from children under 13
- Household information (has children) for design purposes only

### 6.3 Data Breach Protocol

**In Event of Breach:**
1. Contain breach immediately
2. Assess scope and impact
3. Notify affected customers within 72 hours
4. Report to authorities as required by law
5. Document incident and remediation steps

---

## 7. Entity Schemas

### 7.1 OnboardingSubmission Entity

**Purpose:** Stores complete customer project data

**Key Attribute Categories:**

**Status & Access:**
- \`status\`: "in_progress", "completed", "reviewed"
- \`current_step\`: 1-7
- \`access_code\`: 6-char code (e.g., "ABC-123")
- \`created_by_admin\`: boolean

**Contact Information:**
- \`contact_name\`, \`contact_email\`, \`contact_phone\`
- \`decision_maker_count\`: "1" or "2"
- \`decision_makers\`: array of {name, email, relationship}

**Property Information:**
- \`property_address\`, \`property_city\`, \`property_state\`, \`property_zip\`
- \`project_type\`: "new_construction", "remodel", "repair_upgrade", "exploring"

**Vision & Requirements:**
- \`pool_vision\`: long text
- \`primary_use\`: array
- \`desired_features\`: array (ordered by priority)
- \`must_haves_text\`, \`nice_to_haves_text\`, \`desired_outcomes\`: long text
- \`features_by_person\`: array (if 2 decision makers)

**Lifestyle:**
- \`household_size\`: "1-2", "3-4", "5+"
- \`has_children\`, \`has_pets\`: boolean
- \`entertainment_frequency\`: "rarely", "monthly", "weekly", "daily"

**Inspiration & Materials:**
- \`inspiration_images\`: array of URLs
- \`material_selections\`: object
- \`equipment_preferences\`: object

**Investment:**
- \`budget_range\`: "$75k-$100k", "$100k-$150k", etc.
- \`timeline\`: "ASAP", "1-3 months", etc.
- \`financing_interest\`: boolean
- \`additional_notes\`: long text
- \`consents\`: object {terms_accepted, marketing_consent, data_sharing_consent}

**AI Research Results:**
- \`property_data\`: object (30+ fields)
- \`gis_data\`: object (setbacks, permits)
- \`environmental_analysis\`: object (climate, solar)
- \`market_analysis\`: object (pricing, trends)
- \`customer_research\`: object (background, preferences)
- \`design_concepts\`: array of objects (3-5 concepts)
- \`last_research_date\`: timestamp

---

### 7.2 Material Entity

**Purpose:** Catalog of construction materials

**Key Attributes:**
- \`name\`, \`category\`, \`brand\` (required)
- \`category\`: pool_finish, waterline_tile, coping, deck_material, equipment
- \`product_line\`, \`color_name\`, \`manufacturer\`, \`sku\`
- \`description\`, \`image_url\`, \`water_color\`, \`style\`
- \`pros\`, \`cons\`: arrays
- \`price_indicator\`: $, $$, $$$, $$$$
- \`is_recommended\`, \`is_standard\`, \`is_popular\`, \`is_active\`: booleans
- \`best_for\`, \`specifications\`, \`vendor_contact\`
- \`sort_order\`, \`notes\`

---

### 7.3 Feature Entity

**Purpose:** Catalog of pool features

**Key Attributes:**
- \`name\`, \`category\` (required)
- \`category\`: pool_shape, spa_type, water_feature, fire_feature, outdoor_kitchen, seating_area, pergola_shade, landscaping, lighting_feature, sports_recreation
- \`subcategory\`, \`description\`, \`image_url\`
- \`sub_features\`: array of objects
- \`typical_dimensions\`, \`typical_cost_range\`
- \`design_considerations\`, \`compatible_with\`: arrays
- \`is_standard\`, \`is_popular\`, \`is_premium\`, \`is_active\`: booleans
- \`sort_order\`, \`notes\`

---

### 7.4 User Entity (Built-in)

**Purpose:** Application users (admin/sales team)

**Key Attributes:**
- \`id\`, \`created_date\` (auto-generated)
- \`full_name\`, \`email\` (unique)
- \`role\`: "admin" or "user"

**Security:**
- Users invited via Base44 platform
- Role determines access permissions
- Regular users can only access own data
- Admins can access all data

---

## 8. Legal & Compliance Summary

### 8.1 Required Disclaimers

**On Customer-Facing Pages:**
- "Estimates are preliminary and subject to change"
- "Design concepts are proposals only, not final construction plans"
- "Permit requirements may vary - consult local authorities"
- "ROI estimates based on market data, not guaranteed"

**In Customer Communications:**
- "Information collected solely for design concepts"
- "We do not sell your personal information"
- "You may request data deletion at any time"

### 8.2 Consent Requirements

**Required:**
- ✅ Terms of service acceptance (to proceed)

**Optional:**
- Marketing communications
- Data sharing with contractors/suppliers

### 8.3 Contractual Considerations

**Not a Binding Contract:**
- Onboarding is not a contract
- Design concepts are proposals
- Pricing estimates are not binding quotes

**Transition to Contract:**
- Separate proposal/contract required
- Must include: scope, pricing, timeline, warranty, dispute resolution

### 8.4 Licensing Requirements

**Construction Licensing:**
- Verify state contractor license (CA: CSLB, UT: DOPL)
- Display license number on materials
- Maintain insurance (general liability, workers comp)

**Professional Services:**
- Engineering stamp required for structural elements
- Architectural review may be required
- Licensed subcontractors for electrical/plumbing

### 8.5 Insurance & Liability

**Recommended Coverage:**
- General liability: $2-5M
- Professional liability (E&O): $1-2M
- Completed operations coverage
- Cyber liability

**Liability Limitations:**
- AI research is advisory only
- Not professional engineering/legal/financial advice
- Customer responsible for verifying information
- No warranty on AI estimates

---

## 9. Support & Training

### 9.1 Internal Team Training

**Sales Team:**
- Creating projects
- Running research
- Interpreting AI results
- Customer presentations
- Handling objections

**Admin Team:**
- Material/feature library management
- User management
- System configuration

### 9.2 Customer Support

**Self-Service:**
- Access code retrieval (email)
- FAQ page

**Direct Support:**
- Email: info@timelesspools.us
- Phone: (555) 123-4567
- Response time: 24 hours

---

## Appendix: Quick Reference

### Admin Access
- URL: \`/admin-dashboard\`
- Requires: \`role = 'admin'\`
- Request via Base44 platform

### Customer Access
- URL: \`/welcome\`
- Enter access code or request new project

### Key URLs
- Welcome: \`/welcome\`
- Onboarding: \`/onboarding\`
- Admin Dashboard: \`/admin-dashboard\`
- Feature Library: \`/feature-library\`
- Material Library: \`/material-library\`
- User Management: \`/user-management\`
- Intelligence Center: \`/intelligence-center\`
- Documentation: \`/documentation\`

---

**Document Version:** 1.0  
**Last Updated:** 2025-11-19  
**Next Review:** Quarterly

*This document is confidential and proprietary to Timeless Pools. Do not distribute without authorization.*
`;