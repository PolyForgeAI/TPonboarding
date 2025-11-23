import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const prepareSubmissionPayload = (data) => {
    return {
        // Core Fields
        status: data.status || 'in_progress',
        current_step: data.current_step,
        contact_name: data.contact_name,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone,
        property_address: data.property_address,
        property_city: data.property_city,
        property_state: data.property_state,
        property_zip: data.property_zip,
        pool_vision: data.pool_vision,
        budget_range: data.budget_range,
        timeline: data.timeline,
        household_size: data.household_size,
        has_children: data.has_children,
        has_pets: data.has_pets,
        entertainment_frequency: data.entertainment_frequency,
        additional_notes: data.additional_notes,
        access_code: data.access_code,

        // JSONB Fields
        property_data: {
            project_type: data.project_type,
            decision_maker_count: data.decision_maker_count,
            decision_makers: data.decision_makers,
            ...data.property_data
        },
        usage_intent: {
            primary_use: data.primary_use,
            desired_outcomes: data.desired_outcomes,
            features_by_person: data.features_by_person,
            ...data.usage_intent
        },
        financial_breakdown: {
            budget_questions: data.budget_questions,
            financing_interest: data.financing_interest,
            ...data.financial_breakdown
        },
        desired_features: data.desired_features,
        must_haves: data.must_haves,
        nice_to_haves: data.nice_to_haves,
        inspiration_images: data.inspiration_images,
        material_selections: data.material_selections,
        consents: data.consents,
    };
};

async function testFullPayload() {
    const testCode = 'FULL' + Math.floor(Math.random() * 10000);
    console.log(`Testing full payload insert with code: ${testCode}`);

    const formData = {
        status: 'in_progress',
        current_step: 2,
        access_code: testCode,
        contact_name: 'Full Payload User',
        contact_email: 'full@test.com',
        project_type: 'new_construction', // Should go to property_data
        primary_use: ['Family Time'], // Should go to usage_intent
        desired_features: ['spa'], // Should go to desired_features
    };

    const payload = prepareSubmissionPayload(formData);

    const { data, error } = await supabase
        .from('OnboardingSubmission')
        .insert([payload])
        .select()
        .single();

    if (error) {
        console.error('Insert Error:', error);
    } else {
        console.log('Insert Success:', data);
        // Verify nesting
        console.log('Property Data:', data.property_data);
        console.log('Usage Intent:', data.usage_intent);
    }
}

testFullPayload();
