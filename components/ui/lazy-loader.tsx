import { CircleIcon } from "lucide-react";

const LazyLoader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <CircleIcon className="animate-spin h-6 w-6 text-white/50 mx-auto" />
    </div>
  );
};

export default LazyLoader;
