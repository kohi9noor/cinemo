"use client";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FormInput } from "./form-input";
import { Button } from "./button";
import { SocialButtons } from "./social-buttons";
import { FormDivider } from "./form-divider";
import { useSignIn } from "../hooks/use-sign-in";

interface SignInCardProps {
  onSwitchToSignup?: () => void;
  onSuccess?: () => void;
}

const SignInCard = ({ onSwitchToSignup, onSuccess }: SignInCardProps) => {
  const {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit,
  } = useSignIn({ onSuccess });

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-primary mb-1">
          Welcome Back
        </h2>
        <p className="text-muted text-xs">Continue your journey</p>
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
              className="text-muted hover:text-secondary transition-colors"
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
            className="text-xs text-muted hover:text-secondary transition-colors"
          >
            Forgot?
          </button>
        </div>

        <Button variant="primary" fullWidth type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-4 text-center text-xs">
        <span className="text-muted">Don&apos;t have an account? </span>
        <button
          onClick={onSwitchToSignup}
          className="text-primary font-medium hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignInCard;
