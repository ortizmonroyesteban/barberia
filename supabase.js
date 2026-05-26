import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const mockResponse = (data) => ({ data, error: null });
const mockError = (msg) => ({ data: null, error: new Error(msg) });

const mockClient = {
  from: () => ({
    select: () => ({ data: [], error: null, order: () => ({ data: [], error: null }), eq: () => ({ data: [], error: null }), in: () => ({ data: [], error: null }) }),
    insert: () => ({ select: () => mockResponse(null) }),
    update: () => ({ eq: () => ({ select: () => mockResponse(null) }) }),
    delete: () => ({ eq: () => mockResponse(null) }),
    upsert: () => mockResponse(null),
  }),
  channel: () => ({ on: () => ({ subscribe: () => {} }) }),
  removeChannel: () => {},
  removeAllChannels: () => {},
  auth: { getSession: () => Promise.resolve({ data: { session: null }, error: null }) },
};

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockClient;
