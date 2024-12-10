"use client";

import { Github, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SocialAuth() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full"
      >
        <Mail className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="w-full"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}
