import { Loader2 } from "lucide-react";

interface LazyLoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const LazyLoader = ({ size = "md", fullScreen = false }: LazyLoaderProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const containerClasses = fullScreen
    ? "flex items-center justify-center min-h-screen w-full"
    : "flex items-center justify-center h-full w-full py-8";

  return (
    <div className={containerClasses}>
      <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
    </div>
  );
};

export default LazyLoader;
