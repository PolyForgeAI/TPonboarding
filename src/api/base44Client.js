import { supabase } from "@/shared/lib/supabaseClient";

const createEntityHandler = (tableName) => ({
    list: async (sort) => {
        let query = supabase.from(tableName).select('*');
        if (sort) {
            const desc = sort.startsWith('-');
            const field = desc ? sort.substring(1) : sort;
            query = query.order(field, { ascending: !desc });
        }
        const { data, error } = await query;
        if (error) throw error;
        return data;
    },
    filter: async (criteria, sort, limit) => {
        let query = supabase.from(tableName).select('*');
        Object.entries(criteria).forEach(([key, value]) => {
            query = query.eq(key, value);
        });
        if (sort) {
            const desc = sort.startsWith('-');
            const field = desc ? sort.substring(1) : sort;
            query = query.order(field, { ascending: !desc });
        }
        if (limit) {
            query = query.limit(limit);
        }
        const { data, error } = await query;
        if (error) throw error;
        return data;
    },
    create: async (data) => {
        const { data: created, error } = await supabase.from(tableName).insert(data).select().single();
        if (error) throw error;
        return created;
    },
    update: async (id, data) => {
        const { data: updated, error } = await supabase.from(tableName).update(data).eq('id', id).select().single();
        if (error) throw error;
        return updated;
    },
    delete: async (id) => {
        const { error } = await supabase.from(tableName).delete().eq('id', id);
        if (error) throw error;
        return true;
    }
});

export const base44 = {
    entities: new Proxy({}, {
        get: (target, prop) => createEntityHandler(prop)
    })
};
