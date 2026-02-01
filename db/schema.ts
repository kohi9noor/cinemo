import {
  pgTable,
  text,
  boolean,
  timestamp,
  jsonb,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().unique(),
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
  favoriteMovieGenres: jsonb("favorite_movie_genres")
    .$type<string[]>()
    .default([]),
  favoriteTvGenres: jsonb("favorite_tv_genres").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const watchlist = pgTable("watchlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userProfiles.userId),
  contentId: integer("content_id").notNull(),
  mediaType: text("media_type").notNull(),
  title: text("title").notNull(),
  posterPath: text("poster_path"),
  releaseDate: text("release_date"),
  rating: text("rating"),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;
export type WatchlistItem = typeof watchlist.$inferSelect;
export type NewWatchlistItem = typeof watchlist.$inferInsert;
