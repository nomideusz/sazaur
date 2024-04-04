import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL_NIECO, PUBLIC_SUPABASE_KEY_NIECO } from '$env/static/public';
export const supabase = createClient(PUBLIC_SUPABASE_URL_NIECO, PUBLIC_SUPABASE_KEY_NIECO)