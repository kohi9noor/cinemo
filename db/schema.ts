import {
  pgTable,
  text,
  boolean,
  timestamp,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().unique(), // References auth.users(id)
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
  favoriteMovieGenres: jsonb("favorite_movie_genres")
    .$type<string[]>()
    .default([]),
  favoriteTvGenres: jsonb("favorite_tv_genres").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;
