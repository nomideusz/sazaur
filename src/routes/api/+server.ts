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

async function fetchDataForCategory(category) {
  const tableName = categoryToTableMap[category];
  if (!tableName) {
    throw new Error('Invalid category provided');
  }
  const response = await supabase.from(tableName).select('*').order('created_at', { ascending: false }).range(0, 9999);
  return response.data; // Zakładamy, że 'response.data' zawiera potrzebne dane
}

export async function GET({ url }) {
    const category = url.searchParams.get('category');

    try {
        if (category) {
            // Logika dla pojedynczej kategorii, gdy parametr jest obecny
            const data = await fetchDataForCategory(category);
            return json({ [category]: data });
        } else {
            // Pobieranie danych dla obu kategorii jednocześnie, gdy parametr nie jest obecny
            const [salesData, rentalData] = await Promise.all([
                fetchDataForCategory('sales'),
                fetchDataForCategory('rental'),
            ]);

            return json({
              sales: salesData,
              rental: rentalData,
            });
        }
    } catch (error) {
        return json({ error: error.message }, { status: 500 });
    }
}
