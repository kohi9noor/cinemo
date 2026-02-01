"use server";

import { db } from "@/db";
import { watchlist } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { ok, err } from "@/lib/utils";
import { eq, and } from "drizzle-orm";

interface AddToWatchlistParams {
  contentId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath?: string | null;
  releaseDate?: string;
  rating?: string;
}

export async function addToWatchlist(params: AddToWatchlistParams) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    console.log("Session:", session);
    console.log("Session Error:", sessionError);
    console.log("Authenticated user:", session?.user);
    if (!session?.user) {
      return err(new Error("User not authenticated"));
    }
    const user = session.user;

    const existing = await db
      .select()
      .from(watchlist)
      .where(
        and(
          eq(watchlist.userId, user.id),
          eq(watchlist.contentId, params.contentId),
          eq(watchlist.mediaType, params.mediaType),
        ),
      );

    if (existing.length > 0) {
      return err(new Error("Already in watchlist"));
    }

    const [item] = await db
      .insert(watchlist)
      .values({
        userId: user.id,
        contentId: params.contentId,
        mediaType: params.mediaType,
        title: params.title,
        posterPath: params.posterPath || null,
        releaseDate: params.releaseDate || null,
        rating: params.rating || null,
      })
      .returning();

    return ok(item);
  } catch (error) {
    return err(
      error instanceof Error ? error : new Error("Failed to add to watchlist"),
    );
  }
}

export async function removeFromWatchlist(
  contentId: number,
  mediaType: "movie" | "tv",
) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return err(new Error("User not authenticated"));
    }
    const user = session.user;

    await db
      .delete(watchlist)
      .where(
        and(
          eq(watchlist.userId, user.id),
          eq(watchlist.contentId, contentId),
          eq(watchlist.mediaType, mediaType),
        ),
      );

    return ok(true);
  } catch (error) {
    return err(
      error instanceof Error
        ? error
        : new Error("Failed to remove from watchlist"),
    );
  }
}

export async function checkInWatchlist(
  contentId: number,
  mediaType: "movie" | "tv",
) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return ok(false);
    }
    const user = session.user;

    const items = await db
      .select()
      .from(watchlist)
      .where(
        and(
          eq(watchlist.userId, user.id),
          eq(watchlist.contentId, contentId),
          eq(watchlist.mediaType, mediaType),
        ),
      );

    return ok(items.length > 0);
  } catch (error) {
    return err(
      error instanceof Error
        ? error
        : new Error("Failed to check watchlist status"),
    );
  }
}

export async function getUserWatchlist() {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return err(new Error("User not authenticated"));
    }
    const user = session.user;

    const items = await db
      .select()
      .from(watchlist)
      .where(eq(watchlist.userId, user.id))
      .orderBy(watchlist.addedAt);

    return ok(items);
  } catch (error) {
    return err(
      error instanceof Error ? error : new Error("Failed to get watchlist"),
    );
  }
}
