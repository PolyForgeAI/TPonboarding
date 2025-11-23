TABLE: OnboardingSubmission
Core customer project submissions with comprehensive data from onboarding flow

Built-in Fields (Auto-generated)
id
Built-in
Unique identifier (UUID)

string
created_date
Built-in
When record was created

timestamp
updated_date
Built-in
When record was last updated

timestamp
created_by
Built-in
Email of user who created this record

string
Relationships
created_by
→
User.email
User who created this submission

Custom Fields (63)
status
Submission status

string
default: "in_progress"
Allowed values:

in_progress
completed
reviewed
current_step
Current step in onboarding (1-7)

number
default: 1
access_token
Unique token for secure access (UUID)

string
access_code
6-digit friendly code (e.g., ABC-123)

string
contact_name
Customer name

string
contact_email
Customer email

string
contact_phone
Customer phone

string
property_address
Property street address

string
property_city
Property city

string
property_state
Property state

string
property_zip
Property ZIP code

string
property_data
AI research: property valuation, lot size, neighborhood data

object
property_images
Property photos array

array<object>
image_sources
Sources for property images

object
gis_data
AI research: zoning, setbacks, permits

object
environmental_analysis
AI research: climate, solar, microclimate

object
market_analysis
AI research: pricing, trends, competitors

object
customer_research
AI research: public info about customer

object
pool_vision
Customer's vision for their pool

string
primary_use
How they'll use the pool

array<string>
usage_intent
Detailed usage intentions

object
desired_features
Features customer wants

array<string>
must_haves
Must-have features

array<string>
nice_to_haves
Nice-to-have features

array<string>
style_preferences
Design style preferences

array<string>
equipment_preferences
Heating, automation, cleaning preferences

object
material_selections
Selected materials by category

object
lighting_plan
Lighting preferences and plan

object
budget_range
Customer budget range

string
timeline
Desired project timeline

string
household_size
Number of people in household

string
has_children
Whether they have children

boolean
has_pets
Whether they have pets

boolean
entertainment_frequency
How often they entertain

string
inspiration_images
URLs to inspiration photos

array<string>
inspiration_analysis
AI analysis of inspiration images

object
design_concepts
AI-generated design concepts (3-5)

array<object>
concept_images
Generated design concept images

array<string>
site_layout_images
Site layout visualizations

array<string>
technical_specifications
Technical specs for construction

object
construction_roadmap
Construction timeline and milestones

object
financial_breakdown
Detailed cost breakdown

object
risk_analysis
Project risks and mitigation

object
contractor_recommendations
Recommended contractors

object
lines_of_sight_analysis
Sight line analysis from house

object
traffic_flow_analysis
Traffic flow optimization

object
additional_notes
Customer's additional notes

string
consents
Customer consents and agreements

object
version_history
Version history of changes

array<object>
created_by_admin
Created by admin vs. customer

boolean
default: false
current_version
Current version number

number
default: 1
previous_versions
Previous versions

array<object>
last_research_date
When AI research last ran

string
lead_score
Lead quality score

number
lead_temperature
Lead temperature

string
Allowed values:

HOT
WARM
COLD
lead_score_breakdown
Detailed lead scoring

object
lead_scored_date
When lead was scored

string
follow_up_sequence
Follow-up sequence data

array<object>
follow_up_active
Is follow-up active

boolean
default: false
follow_up_started_date
When follow-up started

string
progress_photos
Construction progress photos

array<object>
customer_messages
Messages with customer

array<object>
project_milestones
Project milestones

array<object>



TABLE: Material
Catalog of construction materials (finishes, tiles, coping, decking, equipment)

Built-in Fields (Auto-generated)
id
Built-in
Unique identifier (UUID)

string
created_date
Built-in
When record was created

timestamp
updated_date
Built-in
When record was last updated

timestamp
created_by
Built-in
Email of user who created this record

string
Required Fields
name *
category *
brand *
Custom Fields (25)
name
Material name (e.g., 'Tahoe Blue')

string
category
Material category

string
Allowed values:

pool_finish
waterline_tile
coping
deck_material
equipment
brand
Brand/manufacturer (e.g., 'Pebble Tec')

string
product_line
Product line (e.g., 'Pebble Sheen')

string
color_name
Specific color/style name

string
manufacturer
Parent manufacturer

string
sku
Product SKU

string
description
Customer-facing description

string
image_url
Product photo URL

string
water_color
Resulting water color (for finishes)

string
style
Style (Modern, Natural, Traditional, etc.)

string
pros
List of pros

array<string>
cons
List of cons

array<string>
price_indicator
Relative price

string
Allowed values:

$
$$
$$$
$$$$
is_recommended
Company recommended

boolean
default: false
is_standard
Standard offering

boolean
default: false
is_popular
Popular choice

boolean
default: false
is_active
Show to customers

boolean
default: true
best_for
Best suited for (e.g., climates)

string
specifications
Technical specs

object
compatibility_notes
Compatibility notes

string
lead_time
Delivery lead time

string
vendor_contact
Vendor contact info

object
sort_order
Display order

number
default: 0
notes
Internal notes

string


TABLE: Feature
Catalog of pool features (shapes, spas, water features, fire features, outdoor kitchens, etc.)

Built-in Fields (Auto-generated)
id
Built-in
Unique identifier (UUID)

string
created_date
Built-in
When record was created

timestamp
updated_date
Built-in
When record was last updated

timestamp
created_by
Built-in
Email of user who created this record

string
Required Fields
name *
category *
Custom Fields (16)
name
Feature name

string
category
Feature category

string
Allowed values:

pool_shape
spa_type
water_feature
fire_feature
outdoor_kitchen
seating_area
pergola_shade
landscaping
lighting_feature
sports_recreation
subcategory
More specific type

string
description
Customer-facing description

string
image_url
Sample photo

string
sub_features
Sub-features (e.g., BBQ → Grill, Fridge)

array<object>
typical_dimensions
Typical size

string
typical_cost_range
Cost range

string
design_considerations
Design best practices

array<string>
compatible_with
Features that pair well

array<string>
is_standard
Standard offering

boolean
default: false
is_popular
Popular choice

boolean
default: false
is_premium
Premium/luxury

boolean
default: false
is_active
Show to customers

boolean
default: true
sort_order
Display order

number
default: 0
notes
Internal notes

string


TABLE: DesignBoard
Customer material selection boards linking to OnboardingSubmission and Material

Built-in Fields (Auto-generated)
id
Built-in
Unique identifier (UUID)

string
created_date
Built-in
When record was created

timestamp
updated_date
Built-in
When record was last updated

timestamp
created_by
Built-in
Email of user who created this record

string
Relationships
submission_id
→
OnboardingSubmission.id
Link to customer project

selected_materials[].material_id
→
Material.id
Selected materials

Custom Fields (9)
submission_id
Link to OnboardingSubmission

string
board_name
Board name

string
default: "My Pool Design Board"
selected_materials
Materials selected by customer

array<object>
ai_recommendations
AI-suggested combinations

array<object>
total_material_cost
Calculated total cost

number
style_cohesion_score
AI score (1-10)

number
alternative_boards
Alternative combinations at different price points

array<object>
notes
Customer notes

string
status
Board status

string
default: "draft"
Allowed values:

draft
submitted
reviewed
approved


TABLE: SalesContent
Sales content library (brochures, catalogs, videos, guides)

Built-in Fields (Auto-generated)
id
Built-in
Unique identifier (UUID)

string
created_date
Built-in
When record was created

timestamp
updated_date
Built-in
When record was last updated

timestamp
created_by
Built-in
Email of user who created this record

string
Required Fields
title *
type *
category *
url *
Custom Fields (12)
title
Content title

string
type
Content type

string
Allowed values:

brochure
catalog
whitepaper
video
guide
gallery
case_study
category
Category

string
Allowed values:

portfolio
materials
education
process
testimonials
technical
description
Brief description

string
url
URL to PDF, video, or resource

string
thumbnail_icon
Emoji or icon

string
tags
Search tags

array<string>
recommended_for
Lead types or situations

array<string>
auto_send_timing
When to auto-send

string
Allowed values:

immediate
day_1
day_3
day_7
day_14
day_30
manual_only
active
Active in library

boolean
default: true
send_count
Times sent

number
default: 0
sort_order
Display order

number


TABLE: ContentDelivery
Tracks content sent to customers

Built-in Fields (Auto-generated)
id
Built-in
Unique identifier (UUID)

string
created_date
Built-in
When record was created

timestamp
updated_date
Built-in
When record was last updated

timestamp
created_by
Built-in
Email of user who created this record

string
Relationships
submission_id
→
OnboardingSubmission.id
Customer project

content_id
→
SalesContent.id
Content sent

Required Fields
submission_id *
content_id *
recipient_email *
Custom Fields (13)
submission_id
Link to OnboardingSubmission

string
content_id
Link to SalesContent

string
recipient_email
Email address

string
recipient_name
Recipient name

string
delivery_method
How delivered

string
Allowed values:

immediate
scheduled
scheduled_for
When to send

string
format: date-time
sent_at
When sent

string
format: date-time
status
Status

string
default: "pending"
Allowed values:

pending
sent
failed
cancelled
email_subject
Email subject

string
personal_note
Personal message

string
sent_by
Email of sender

string
opened
Opened by recipient

boolean
default: false
opened_at
When opened

string
format: date-time


TABLE: Theme
Application theming configuration (colors, typography, spacing)

Built-in Fields (Auto-generated)
id
Built-in
Unique identifier (UUID)

string
created_date
Built-in
When record was created

timestamp
updated_date
Built-in
When record was last updated

timestamp
created_by
Built-in
Email of user who created this record

string
Required Fields
name *
Custom Fields (7)
name
Theme name

string
is_active
Is this the active theme

boolean
default: false
colors
Color palette (primary, secondary, accent, background, text, success, warning, error)

object
typography
Font settings (font_primary, font_secondary, font_size_base, font_size_heading)

object
spacing
Spacing settings (base_unit, container_max_width)

object
border_radius
Border radius (small, medium, large)

object
shadows
Shadow definitions (small, medium, large)

object


TABLE: Content
Multi-language content management (UI labels, page content, email templates)

Built-in Fields (Auto-generated)
id
Built-in
Unique identifier (UUID)

string
created_date
Built-in
When record was created

timestamp
updated_date
Built-in
When record was last updated

timestamp
created_by
Built-in
Email of user who created this record

string
Required Fields
key *
translations *
Custom Fields (8)
key
Unique key (e.g., 'welcome.heading')

string
category
Content category

string
Allowed values:

ui_label
page_content
form_field
notification
email_template
error_message
default_language
Default language (ISO 639-1)

string
default: "en"
translations
Language translations {language_code: content}

object
context
Where content is used

string
tone
Content tone

string
default: "professional"
Allowed values:

formal
casual
technical
friendly
professional
variables
Template variables (e.g., {{name}})

array<string>
is_active
Active content

boolean
default: true

TABLE: User
Built-in user entity (admin/sales team members)

⚠️ Users managed via Base44 platform invite system. Cannot be created via API.

Built-in Fields (Auto-generated)
id
Built-in
Unique identifier (UUID)

string
created_date
Built-in
When record was created

timestamp
updated_date
Built-in
When record was last updated

timestamp
created_by
Built-in
Email of user who created this record

string
Required Fields
email *
Custom Fields (3)
full_name
User's full name

string
email
User's email (unique, used for login)

string
role
User role (admin = full access, user = limited)

string
Allowed values:

admin
user





