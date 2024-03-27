import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function GET() {
    try {
        const [rentResponse, sellResponse] = await Promise.all([
            supabase.from('ads_rent').select().order('created_at', { ascending: false }).limit(10),
            supabase.from('ads_sell').select().order('created_at', { ascending: false }).limit(10)
        ]);

        const adsRent = rentResponse.data.map(ad => ({ ...ad, section: 'rental' }));
        const adsSell = sellResponse.data.map(ad => ({ ...ad, section: 'sales' }));

        const combinedData = [...adsRent, ...adsSell];

        return json({combined: combinedData, rent: adsRent, sell: adsSell});
    } catch (error) {
        return json({ error: error.message }, { status: 500 });
    }
}
