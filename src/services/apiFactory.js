import MockTaskAPI from './api';
import SupabaseTaskAPI from './supabaseApi';

const useSupabase =
  import.meta.env.VITE_USE_SUPABASE === 'true' &&
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_ANON_KEY;

const api = useSupabase ? new SupabaseTaskAPI() : new MockTaskAPI();

export default api;
