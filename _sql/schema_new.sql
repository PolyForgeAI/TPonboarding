-- -----------------------------------------------------------------------------
-- SQL SCHEMA FOR TIMELESS POOLS PROSPECT ONBOARDING APP
-- TARGET PLATFORM: SUPABASE (POSTGRESQL) & GOOGLE ANTIGRAVITY
-- VERSION: 2.0 (NORMALIZED AND OPTIMIZED)
-- -----------------------------------------------------------------------------

-- 1. ENUM TYPE DEFINITIONS
-- =============================================================================

CREATE TYPE submission_status_enum AS ENUM (
    'in_progress',
    'completed',
    'reviewed'
);

CREATE TYPE lead_temperature_enum AS ENUM (
    'HOT',
    'WARM',
    'COLD'
);

CREATE TYPE material_category_enum AS ENUM (
    'pool_finish',
    'waterline_tile',
    'coping',
    'deck_material',
    'equipment'
);

CREATE TYPE price_indicator_enum AS ENUM (
    '$',
    '$$',
    '$$$',
    '$$$$'
);

CREATE TYPE feature_category_enum AS ENUM (
    'pool_shape',
    'spa_type',
    'water_feature',
    'fire_feature',
    'outdoor_kitchen',
    'seating_area',
    'pergola_shade',
    'landscaping',
    'lighting_feature',
    'sports_recreation'
);

CREATE TYPE board_status_enum AS ENUM (
    'draft',
    'submitted',
    'reviewed',
    'approved'
);

CREATE TYPE content_type_enum AS ENUM (
    'brochure',
    'catalog',
    'whitepaper',
    'video',
    'guide',
    'gallery',
    'case_study'
);

CREATE TYPE sales_category_enum AS ENUM (
    'portfolio',
    'materials',
    'education',
    'process',
    'testimonials',
    'technical'
);

CREATE TYPE send_timing_enum AS ENUM (
    'immediate',
    'day_1',
    'day_3',
    'day_7',
    'day_14',
    'day_30',
    'manual_only'
);

CREATE TYPE delivery_method_enum AS ENUM (
    'email',
    'link_share',
    'download'
);

CREATE TYPE delivery_status_enum AS ENUM (
    'pending',
    'sent',
    'failed',
    'cancelled'
);

CREATE TYPE content_key_category_enum AS ENUM (
    'ui_label',
    'page_content',
    'form_field',
    'notification',
    'email_template',
    'error_message'
);

CREATE TYPE content_tone_enum AS ENUM (
    'formal',
    'casual',
    'technical',
    'friendly',
    'professional'
);

CREATE TYPE user_role_enum AS ENUM (
    'admin',
    'user'
);

-- NEW ENUM for the normalized pros/cons table
CREATE TYPE pro_con_type_enum AS ENUM (
    'pro',
    'con'
);


-- 2. BASE TABLES (ORDERED BY FOREIGN KEY DEPENDENCY)
-- =============================================================================

-- TABLE: User (Admin/Sales Team Members)
CREATE TABLE "User" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID REFERENCES "User"(id),
    
    email           TEXT UNIQUE NOT NULL,
    full_name       TEXT,
    role            user_role_enum NOT NULL DEFAULT 'user'
);

-- Indexing for fast lookups by email
CREATE UNIQUE INDEX idx_user_email ON "User" (email);


-- TABLE: OnboardingSubmission
CREATE TABLE "OnboardingSubmission" (
    -- Built-in Fields
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by          UUID REFERENCES "User"(id) ON DELETE SET NULL, 
    
    -- Core Fields
    status              submission_status_enum NOT NULL DEFAULT 'in_progress',
    current_step        INTEGER NOT NULL DEFAULT 1,
    access_token        UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    access_code         VARCHAR(10),
    contact_name        TEXT,
    contact_email       TEXT,
    contact_phone       TEXT,
    property_address    TEXT,
    property_city       TEXT,
    property_state      VARCHAR(2),
    property_zip        VARCHAR(10),
    pool_vision         TEXT,
    budget_range        TEXT,
    timeline            TEXT,
    
    -- Household Info
    household_size      TEXT,
    has_children        BOOLEAN,
    has_pets            BOOLEAN,
    entertainment_frequency TEXT,
    additional_notes        TEXT,
    
    -- Lead Scoring & Follow-up
    last_research_date      TIMESTAMPTZ,
    lead_score              NUMERIC,
    lead_temperature        lead_temperature_enum,
    lead_scored_date        TIMESTAMPTZ,
    follow_up_active        BOOLEAN NOT NULL DEFAULT FALSE,
    follow_up_started_date  TIMESTAMPTZ,

    -- JSONB/Complex Data
    property_data           JSONB,
    property_images         JSONB,
    image_sources           JSONB,
    gis_data                JSONB,
    environmental_analysis  JSONB,
    market_analysis         JSONB,
    customer_research       JSONB,
    usage_intent            JSONB, -- Detailed usage intentions (object)
    equipment_preferences   JSONB,
    material_selections     JSONB, -- Raw customer input (object)
    lighting_plan           JSONB,
    inspiration_images      JSONB,
    inspiration_analysis    JSONB,
    design_concepts         JSONB,
    concept_images          JSONB,
    site_layout_images      JSONB,
    technical_specifications JSONB,
    construction_roadmap    JSONB,
    financial_breakdown     JSONB,
    risk_analysis           JSONB,
    contractor_recommendations JSONB,
    lines_of_sight_analysis JSONB,
    traffic_flow_analysis   JSONB,
    consents                JSONB,
    version_history         JSONB,
    previous_versions       JSONB,
    lead_score_breakdown    JSONB,
    follow_up_sequence      JSONB,
    progress_photos         JSONB,
    customer_messages       JSONB,
    project_milestones      JSONB,
    
    -- Audit fields
    created_by_admin        BOOLEAN NOT NULL DEFAULT FALSE,
    current_version         INTEGER NOT NULL DEFAULT 1,

    -- Retained array<string> fields as JSONB (or use TEXT[] if performance needed)
    desired_features        JSONB, 
    must_haves              JSONB,
    nice_to_haves           JSONB,
    style_preferences       JSONB 
);

-- Performance Indexing for Sales & AI Data
CREATE UNIQUE INDEX idx_submission_contact_email ON "OnboardingSubmission" (contact_email);
CREATE INDEX idx_submission_sales_funnel ON "OnboardingSubmission" (status, lead_score DESC, current_step);
CREATE INDEX idx_submission_gis_data_gin ON "OnboardingSubmission" USING GIN (gis_data); -- Index for search inside GIS JSONB
CREATE INDEX idx_submission_prop_data_gin ON "OnboardingSubmission" USING GIN (property_data); -- Index for search inside property data JSONB


-- TABLE: Material (Catalog)
CREATE TABLE "Material" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID REFERENCES "User"(id) ON DELETE SET NULL,
    
    name            TEXT NOT NULL,
    category        material_category_enum NOT NULL,
    brand           TEXT NOT NULL,
    product_line    TEXT,
    color_name      TEXT,
    manufacturer    TEXT,
    sku             VARCHAR(50),
    description     TEXT,
    image_url       TEXT,
    water_color     TEXT,
    style           TEXT,
    price_indicator price_indicator_enum,
    is_recommended  BOOLEAN NOT NULL DEFAULT FALSE,
    is_standard     BOOLEAN NOT NULL DEFAULT FALSE,
    is_popular      BOOLEAN NOT NULL DEFAULT FALSE,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    best_for        TEXT,
    specifications  JSONB,
    compatibility_notes TEXT,
    lead_time       TEXT,
    vendor_contact  JSONB,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    notes           TEXT
);


-- TABLE: Feature (Catalog)
CREATE TABLE "Feature" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID REFERENCES "User"(id) ON DELETE SET NULL,
    
    name            TEXT NOT NULL,
    category        feature_category_enum NOT NULL,
    subcategory     TEXT,
    description     TEXT,
    image_url       TEXT,
    sub_features    JSONB,
    typical_dimensions TEXT,
    typical_cost_range TEXT,
    design_considerations JSONB,
    compatible_with JSONB,
    is_standard     BOOLEAN NOT NULL DEFAULT FALSE,
    is_popular      BOOLEAN NOT NULL DEFAULT FALSE,
    is_premium      BOOLEAN NOT NULL DEFAULT FALSE,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    notes           TEXT
);


-- TABLE: DesignBoard
CREATE TABLE "DesignBoard" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID REFERENCES "User"(id) ON DELETE SET NULL,
    
    submission_id   UUID NOT NULL REFERENCES "OnboardingSubmission"(id) ON DELETE CASCADE,
    board_name      TEXT NOT NULL DEFAULT 'My Pool Design Board',
    ai_recommendations JSONB,
    total_material_cost NUMERIC,
    style_cohesion_score INTEGER,
    alternative_boards JSONB,
    notes           TEXT,
    status          board_status_enum NOT NULL DEFAULT 'draft'
);


-- TABLE: SalesContent (Library)
CREATE TABLE "SalesContent" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID REFERENCES "User"(id) ON DELETE SET NULL,
    
    title           TEXT NOT NULL,
    type            content_type_enum NOT NULL,
    category        sales_category_enum NOT NULL,
    url             TEXT NOT NULL,
    description     TEXT,
    thumbnail_icon  TEXT,
    tags            JSONB,
    recommended_for JSONB,
    auto_send_timing send_timing_enum,
    active          BOOLEAN NOT NULL DEFAULT TRUE,
    send_count      INTEGER NOT NULL DEFAULT 0,
    sort_order      INTEGER
);


-- TABLE: Content (Multi-language UI/Email content)
CREATE TABLE "Content" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID REFERENCES "User"(id) ON DELETE SET NULL,
    
    key             TEXT NOT NULL UNIQUE, 
    category        content_key_category_enum,
    default_language VARCHAR(5) NOT NULL DEFAULT 'en', 
    context         TEXT,
    tone            content_tone_enum DEFAULT 'professional',
    variables       JSONB,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE
);


-- TABLE: Theme
CREATE TABLE "Theme" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID REFERENCES "User"(id) ON DELETE SET NULL,
    
    name            TEXT NOT NULL,
    is_active       BOOLEAN NOT NULL DEFAULT FALSE,
    colors          JSONB,
    typography      JSONB,
    spacing         JSONB,
    border_radius   JSONB,
    shadows         JSONB
);


-- 3. JUNCTION AND NORMALIZATION TABLES
-- =============================================================================

-- JUNCTION TABLE: DesignBoardMaterial (Replaces DesignBoard.selected_materials JSONB array)
CREATE TABLE "DesignBoardMaterial" (
    board_id        UUID NOT NULL REFERENCES "DesignBoard"(id) ON DELETE CASCADE,
    material_id     UUID NOT NULL REFERENCES "Material"(id) ON DELETE RESTRICT,
    use_case        TEXT, -- e.g., 'Pool Finish', 'Waterline Tile'
    sort_order      INTEGER,
    
    PRIMARY KEY (board_id, material_id)
);


-- JUNCTION TABLE: SubmissionUse (Replaces OnboardingSubmission.primary_use array<string>)
CREATE TABLE "SubmissionUse" (
    submission_id   UUID NOT NULL REFERENCES "OnboardingSubmission"(id) ON DELETE CASCADE,
    use_case        TEXT NOT NULL,
    priority        INTEGER,
    
    PRIMARY KEY (submission_id, use_case)
);
CREATE INDEX idx_submission_use_case ON "SubmissionUse" (use_case);


-- JUNCTION TABLE: MaterialProCon (Normalizes Material.pros and Material.cons arrays)
CREATE TABLE "MaterialProCon" (
    material_id     UUID NOT NULL REFERENCES "Material"(id) ON DELETE CASCADE,
    type            pro_con_type_enum NOT NULL,
    description     TEXT NOT NULL,
    sort_order      INTEGER,
    
    PRIMARY KEY (material_id, type, description)
);


-- JUNCTION TABLE: ContentTranslation (Normalizes Content.translations object)
CREATE TABLE "ContentTranslation" (
    content_id      UUID NOT NULL REFERENCES "Content"(id) ON DELETE CASCADE,
    language_code   VARCHAR(5) NOT NULL,
    translated_content TEXT NOT NULL,
    
    PRIMARY KEY (content_id, language_code)
);
CREATE INDEX idx_content_translation_lang ON "ContentTranslation" (language_code);


-- 4. DELIVERY TABLES (Final Table)
-- =============================================================================

-- TABLE: ContentDelivery
CREATE TABLE "ContentDelivery" (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID REFERENCES "User"(id) ON DELETE SET NULL,
    
    submission_id   UUID NOT NULL REFERENCES "OnboardingSubmission"(id) ON DELETE CASCADE,
    content_id      UUID NOT NULL REFERENCES "SalesContent"(id) ON DELETE CASCADE,
    recipient_email TEXT NOT NULL,
    recipient_name  TEXT,
    delivery_method delivery_method_enum,
    scheduled_for   TIMESTAMPTZ,
    sent_at         TIMESTAMPTZ,
    status          delivery_status_enum NOT NULL DEFAULT 'pending',
    email_subject   TEXT,
    personal_note   TEXT,
    sent_by         UUID REFERENCES "User"(id) ON DELETE SET NULL, -- Who sent it
    opened          BOOLEAN NOT NULL DEFAULT FALSE,
    opened_at       TIMESTAMPTZ
);