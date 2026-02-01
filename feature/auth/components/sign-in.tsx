"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FormInput } from "./form-input";
import { Button } from "./button";
import { SocialButtons } from "./social-buttons";
import { FormDivider } from "./form-divider";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface SignInCardProps {
  onSwitchToSignup?: () => void;
  onSuccess?: () => void;
}

const SignInCard = ({ onSwitchToSignup, onSuccess }: SignInCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message);
      } else if (data.session) {
        toast.success("Signed in successfully");
        onSuccess?.();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">Welcome Back</h2>
        <p className="text-white/50 text-xs">Continue your journey</p>
      </div>

      <SocialButtons />

      <FormDivider />

      <form onSubmit={handleSubmit} className="space-y-3">
        <FormInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          icon={Mail}
          required
        />

        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={formData.password}
          onChange={(value) => setFormData({ ...formData, password: value })}
          icon={Lock}
          required
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white/30 hover:text-white/50 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
        />

        <div className="text-right">
          <button
            type="button"
            className="text-xs text-white/50 hover:text-white/70 transition-colors"
          >
            Forgot?
          </button>
        </div>

        <Button variant="primary" fullWidth type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-4 text-center text-xs">
        <span className="text-white/50">Don&apos;t have an account? </span>
        <button
          onClick={onSwitchToSignup}
          className="text-white/90 font-medium hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignInCard;
