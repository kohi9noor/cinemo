import { Suspense } from "react";

import LazyLoader from "@/components/ui/lazy-loader";
import AuthPageContent from "./auth-page-content";

export default function AuthPage() {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AuthPageContent />
    </Suspense>
  );
}
