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
    isSuccess,
    handleSubmit,
  } = useSignIn({ onSuccess });

  if (isSuccess) {
    return (
      <div className="p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Welcome back!
            </h2>
            <p className="text-white/70 text-sm">
              You&apos;ve been signed in successfully
            </p>
            <p className="text-white/50 text-xs mt-3">
              The page will refresh in a moment
            </p>
          </div>
        </div>
      </div>
    );
  }

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
