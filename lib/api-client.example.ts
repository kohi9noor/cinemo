/**
 * Usage examples for the type-safe API client
 */

import { apiClient, ApiClientError } from "./api-client";

// ============================================
// 1. Define your response and request types
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  posterUrl: string;
}

interface SearchMoviesResponse {
  results: Movie[];
  total: number;
  page: number;
}

// ============================================
// 2. GET request examples
// ============================================

async function getUser(userId: string) {
  try {
    // Type-safe GET request - response is typed as User
    const user = await apiClient.get<User>(`users/${userId}`);
    console.log(user.name); // ✅ TypeScript knows this exists

    return user;
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error("API Error:", error.status, error.message);
    }
  }
}

// GET with query parameters
async function searchMovies(query: string, page: number = 1) {
  const response = await apiClient.get<SearchMoviesResponse>("movies/search", {
    params: {
      q: query,
      page,
      limit: 20,
    },
    timeout: 15000, // Custom timeout
  });

  return response.results;
}

// ============================================
// 3. POST request examples
// ============================================

async function createUser(userData: CreateUserRequest) {
  try {
    // Type-safe POST - request body is typed
    const newUser = await apiClient.post<User, CreateUserRequest>("users", {
      data: userData, // ✅ TypeScript ensures this matches CreateUserRequest
    });

    return newUser;
  } catch (error) {
    if (error instanceof ApiClientError) {
      if (error.status === 409) {
        console.error("User already exists");
      }
    }
  }
}

// POST with query params
async function addToWatchlist(movieId: number) {
  await apiClient.post<{ success: boolean }, { movieId: number }>("watchlist", {
    data: { movieId },
    params: { notify: true }, // Optional query params
    showErrorToast: false, // Suppress error toast
  });
}

// ============================================
// 4. PUT request examples
// ============================================

async function updateUser(userId: string, updates: Partial<User>) {
  const updatedUser = await apiClient.put<User, Partial<User>>(
    `users/${userId}`,
    {
      data: updates,
    },
  );

  return updatedUser;
}

// ============================================
// 5. PATCH request examples
// ============================================

async function updateMovieRating(movieId: number, rating: number) {
  await apiClient.patch<Movie, { rating: number }>(`movies/${movieId}`, {
    data: { rating },
  });
}

// ============================================
// 6. DELETE request examples
// ============================================

async function deleteUser(userId: string) {
  await apiClient.delete<{ success: boolean }>(`users/${userId}`);
}

// DELETE with query params
async function removeFromWatchlist(movieId: number) {
  await apiClient.delete<{ success: boolean }>("watchlist", {
    params: { movieId },
  });
}

// ============================================
// 7. Error handling patterns
// ============================================

async function handleErrorsExample() {
  try {
    const user = await apiClient.get<User>("users/123");
    return user;
  } catch (error) {
    if (error instanceof ApiClientError) {
      // Handle specific error codes
      switch (error.status) {
        case 401:
          console.error("Unauthorized - redirect to login");
          break;
        case 404:
          console.error("User not found");
          break;
        case 500:
          console.error("Server error:", error.details);
          break;
        default:
          console.error("Error:", error.message);
      }
    }
    throw error;
  }
}

// ============================================
// 8. Custom headers example
// ============================================

async function requestWithCustomHeaders() {
  const data = await apiClient.get<Movie[]>("movies", {
    headers: {
      "X-Custom-Header": "value",
      Authorization: "Bearer token",
    },
  });

  return data;
}
