import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Mapowanie kategorii na nazwy tabel
const categoryToTableMap = {
  'rental': 'ads_rent',
  'sales': 'ads_sell',
  // Dodaj tutaj więcej kategorii w przyszłości
};

export async function GET({ url }) {
    const category: string | null = url.searchParams.get('category');
    const tableName = categoryToTableMap[category];

    try {
        if (category) {
            // Logika dla pojedynczej kategorii, gdy parametr jest obecny
            const response = await supabase.from(tableName).select('*').order('created_at', { ascending: false }).range(0, 9999);
            return json(response.data);
        } else {
          throw new Error('Invalid category provided');
        }
    } catch (error) {
        return json({ error: error.message }, { status: 500 });
    }
}
