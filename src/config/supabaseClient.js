// Importing the supabase client
import { createClient } from "@supabase/supabase-js";

// Connecting to the supabaseurl
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// Connecting to supabase using the anon key
const supabaseKey = process.env.REACT_APP_ANON_KEY;

// Creating the variable with the supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Exporting it and allowing it to be used in other files
export default supabase;
