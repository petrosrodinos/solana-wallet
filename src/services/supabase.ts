import { TOKEN_DATABASE_NAME } from "../constants";
import { supabase } from "../utils/supabase";

export const insertToken = async (token: any) => {
  try {
    const { error } = await supabase.from(TOKEN_DATABASE_NAME).insert(token);

    if (error) {
      console.log("Error inserting token to supabase", error);
      throw new Error("Error inserting token to supabase");
    }
  } catch (error) {
    console.log("Error inserting token to supabase", error);
    throw new Error("Error inserting token to supabase");
  }
};

export const getTokens = async () => {
  try {
    const { data, error } = await supabase.from(TOKEN_DATABASE_NAME).select("*");

    if (error) {
      console.log("Error getting tokens from supabase", error);
      throw new Error("Error getting tokens from supabase");
    }

    return data;
  } catch (error) {
    console.log("Error getting tokens from supabase", error);
    throw new Error("Error getting tokens from supabase");
  }
};
