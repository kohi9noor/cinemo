"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { FormInput } from "./form-input";
import { Button } from "./button";
import { SocialButtons } from "./social-buttons";
import { FormDivider } from "./form-divider";
import { supabase } from "@/lib/supabase";

interface SignupCardProps {
  onSwitchToSignin?: () => void;
}

const SignupCard = ({ onSwitchToSignin }: SignupCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
        },
      },
    });
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">
          Create Account
        </h2>
        <p className="text-white/50 text-xs">Join and discover</p>
      </div>

      <SocialButtons />

      <FormDivider />

      <form onSubmit={handleSubmit} className="space-y-3">
        <FormInput
          label="Name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          icon={User}
          required
        />

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
          helperText="Min. 8 characters"
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

        <Button variant="primary" fullWidth type="submit">
          Create Account
        </Button>
      </form>

      <div className="mt-4 text-center text-xs">
        <span className="text-white/50">Already have an account? </span>
        <button
          onClick={onSwitchToSignin}
          className="text-white/90 font-medium hover:underline"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignupCard;
