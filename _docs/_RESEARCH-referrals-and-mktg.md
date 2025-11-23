# Research: Referral Systems & Whitelabel Marketing Strategy

## 1. The "Golden Ticket" Referral System
**Concept**: Turn the "Access Code" mechanism into a viral growth loop. Instead of just a security feature, the code becomes a high-value "gift" that past customers can bestow upon friends.

### Mechanism
1.  **The "Ambassador" Profile**: Every past customer (or high-value prospect) is assigned a persistent `referrer_id`.
2.  **Unique Codes**: The system generates unique, personalized codes for them to share (e.g., `THOMAS-VIP`, `POOL-PARTY-24`).
3.  **The Hook**: When a friend uses this code:
    *   **For the Friend**: They bypass the waitlist/gatekeeper and get a "Preferred Pricing" or "Priority Design" badge immediately.
    *   **For the Referrer**: They earn credits (e.g., "Free Spring Opening," "$500 Cash," "Upgrade to OmniLogic").

### Implementation Strategy
*   **Database**: Add `referrer_id` (UUID) to the `AccessCode` table.
*   **Tracking**: When `OnboardingSubmission` is created, copy the `referrer_id` from the used `AccessCode`.
*   **Automation**:
    *   *Trigger*: Project marked "Completed".
    *   *Action*: Send email to Customer: "Here are 3 VIP Access Codes for your neighbors. If they build with us, you get a free year of maintenance."

## 2. Whitelabeling & Multi-Tenant Expansion
**Goal**: Scale the "Timeless Onboarding" engine to other builders and industries.

### Architecture: Multi-Tenant SaaS
*   **Tenant Isolation**: Add `tenant_id` to ALL tables (`Material`, `Feature`, `OnboardingSubmission`).
*   **Brand Configuration**: A `TenantConfig` table stores:
    *   `logo_url`
    *   `primary_color` (e.g., Royal Blue vs. Forest Green)
    *   `font_family`
    *   `industry_type` (Pool, Landscape, Kitchen, etc.)

### Industry Modules (The "Bespoke" Catalog)
The system should be modular. A "Kitchen" tenant shouldn't see "Pool Finish" options.
*   **Module System**:
    *   `Module: Outdoor Living` (Patios, Louvered Roofs, Fire Pits)
    *   `Module: Aquatic` (Pools, Spas, Slides)
    *   `Module: Sports` (Basketball Courts, Turf)
    *   `Module: Interior` (Kitchens, Bathrooms)

## 3. Product Scope & Vertical Integration
Leveraging the specific high-end capabilities mentioned:

### A. The "Outdoor Resort" Package (Pools + Hardscape)
*   **Extruded Aluminum Patios**:
    *   *Feature*: "Bespoke Engineering" (Less posts, wider spans).
    *   *Visual*: Show "Before/After" overlays of obstructed vs. open views.
*   **Louvered Patios**:
    *   *Interactive*: Slider to show "Sun" vs. "Rain" protection modes.
*   **Fire Features**:
    *   *Selection*: "Modern Linear" vs. "Artificial Rock" styles.

### B. The "Performance" Package (Sports & Turf)
*   **Premium Turf (Belgium)**:
    *   *Differentiator*: "Soft-touch," "Pet-friendly," "Heat-dissipating."
*   **Sports Courts**:
    *   *Configurator*: Allow users to pick tile colors (e.g., Lakers Purple/Gold) on a mini-court visualizer.
    *   *Tech*: Mention "Compacted gravel sub-base" as a quality indicator in the "Why Us" tooltip.

### C. The "Exotic" Package (Materials)
*   **Ipe Brazilian Hardwood**:
    *   *Story*: "Lasts 50 years," "Silver patina vs. Oiled look."
*   **Porcelain Pavers**:
    *   *Benefit*: "Stain resistant," "Cooler than stone."

## 4. Marketing the "System"
When selling this platform to other builders:
*   **Pitch**: "Don't just sell a pool; sell a *Design Experience*."
*   **Value Prop**: "Our AI Dossier pre-sells the upgrade (e.g., the $20k louvered roof) before you even visit the house."
