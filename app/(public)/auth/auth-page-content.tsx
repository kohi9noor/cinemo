"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useAuth from "@/hooks/use-auth";
import AuthModel from "@/features/auth/components/auth-model";
import LazyLoader from "@/components/ui/lazy-loader";

export default function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuth, isLoading } = useAuth();

  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (!isLoading && isAuth) {
      router.push(redirectTo);
    }
  }, [isAuth, isLoading, router, redirectTo]);

  if (isLoading) {
    return <LazyLoader />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Welcome to Cinemo
          </h1>
          <p className="text-muted">Sign in to continue</p>
        </div>
        <AuthModel isOpen={true} onClose={() => (window.location.href = "/")} />
      </div>
    </div>
  );
}
