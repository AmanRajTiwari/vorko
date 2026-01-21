import { supabase } from "./supabase";

/**
 * Sign up with email and password
 * The database trigger will automatically create the profile
 * Frontend only handles auth.signUp - NO profile insertion
 */
export const signUpWithEmail = async (email, password) => {
  try {
    // Create user account ONLY
    // Database trigger will auto-create profile with default role
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      throw new Error(signUpError.message);
    }

    if (!authData.user) {
      throw new Error("Failed to create user account");
    }

    return {
      user: authData.user,
      session: authData.session,
    };
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

/**
 * Update user profile with name and role
 * Called AFTER login when session is active
 * Updates the profile created by the database trigger
 */
export const updateUserProfile = async (userId, name, role) => {
  try {
    const { data: profileData, error: updateError } = await supabase
      .from("profiles")
      .update({
        name,
        role,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (updateError) {
      throw new Error(updateError.message);
    }

    return profileData;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};

/**
 * Sign in with email and password
 * After login, fetches and updates the user profile
 */
export const signInWithEmail = async (email, password) => {
  try {
    // Sign in user
    const { data: authData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      throw new Error(signInError.message);
    }

    if (!authData.user) {
      throw new Error("Failed to sign in");
    }

    // Fetch user profile (created by database trigger during signup)
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      console.warn(
        "Profile not found, may be new signup:",
        profileError.message
      );
      // Return basic structure - profile will be updated on next step
      return {
        user: authData.user,
        profile: {
          id: authData.user.id,
          email: authData.user.email,
          name: null,
          role: "student", // Default role
        },
      };
    }

    return {
      user: authData.user,
      profile: profileData,
    };
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

/**
 * Get current user profile
 * Used for session restoration
 */
export const getCurrentProfile = async (userId) => {
  try {
    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.warn("Get profile error:", error.message);
      return null;
    }

    return profileData;
  } catch (error) {
    console.error("Get profile error:", error);
    return null;
  }
};

/**
 * Sign out current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return true;
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

/**
 * Get current session
 */
export const getSession = async () => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn("Supabase not initialized");
      return null;
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.warn("Get session error:", error.message);
      return null;
    }

    return session;
  } catch (error) {
    console.warn("Get session error:", error);
    return null;
  }
};

/**
 * Subscribe to auth state changes
 * Returns subscription object with unsubscribe() method
 */
export const onAuthStateChange = (callback) => {
  try {
    if (!supabase) {
      console.warn("Supabase not initialized - auth state changes disabled");
      return { unsubscribe: () => {} };
    }

    // Supabase SDK: onAuthStateChange returns { data: { subscription: { unsubscribe() } } }
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });

    // Return the subscription object from data
    return data?.subscription || { unsubscribe: () => {} };
  } catch (error) {
    console.warn("Error setting up auth state listener:", error);
    return { unsubscribe: () => {} };
  }
};
