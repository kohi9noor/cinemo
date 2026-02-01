"use server";

import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ok, err } from "@/lib/utils";

export async function createUserProfile(userId: string) {
  try {
    const [profile] = await db
      .insert(userProfiles)
      .values({
        userId,
        onboardingCompleted: false,
        favoriteMovieGenres: [],
        favoriteTvGenres: [],
      })
      .returning();
    return ok(profile);
  } catch {
    return err(new Error("Failed to create user profile"));
  }
}

export async function getUserProfile(userId: string) {
  try {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return ok(profile);
  } catch {
    return err(new Error("Failed to fetch user profile"));
  }
}

export async function updateUserPreferences(
  userId: string,
  preferences: {
    favoriteMovieGenres: string[];
    favoriteTvGenres: string[];
  },
) {
  try {
    const [profile] = await db
      .update(userProfiles)
      .set({
        favoriteMovieGenres: preferences.favoriteMovieGenres,
        favoriteTvGenres: preferences.favoriteTvGenres,
        onboardingCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return ok(profile);
  } catch {
    return err(new Error("Failed to update preferences"));
  }
}
