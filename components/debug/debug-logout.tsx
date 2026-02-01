"use client";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const DebugLogout = () => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed bottom-4 right-4  z-50 flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-medium"
    >
      <LogOut className="w-4 h-4" />
      <span>Debug Logout</span>
    </button>
  );
};

export default DebugLogout;
