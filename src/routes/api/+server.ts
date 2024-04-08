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
    const category = url.searchParams.get('category');

    try {
        // Obsługa zapytania dla wszystkich kategorii
        if (category === '/' || category === null) {
            const responses = await Promise.all(Object.values(categoryToTableMap).map(tableName =>
                supabase.from(tableName).select('*').order('created_at', { ascending: false }).range(0, 9)
            ));
            
            const combinedResponse = responses.flatMap(response => response.data);
            return json(combinedResponse);
        } else {
            // Sprawdzenie, czy kategoria odpowiada znanej tabeli
            const tableName = categoryToTableMap[category];
            if (!tableName) {
                return json({ error: 'Invalid category provided' }, { status: 400 });
            }
            
            // Logika dla pojedynczej kategorii
            const response = await supabase.from(tableName).select('*').order('created_at', { ascending: false }).range(0, 9);
            return json(response.data);
        }
    } catch (error) {
        return json({ error: error.message }, { status: 500 });
    }
}
