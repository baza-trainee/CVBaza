"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { Icon } from "./icon";

export function SocialAuth() {
  return (
    <div className="mb-6 grid grid-cols-2 gap-5">
      <Button
        variant="outline"
        className="h-12 w-[170px] rounded-[40px] bg-inherit px-8 py-3 text-xl font-normal [&_svg]:size-6"
        onClick={() => signIn("google", { callbackUrl: "/profile/dashboard" })}
      >
        <Icon name="icon-google" size="full" />
        Google
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn("github", { callbackUrl: "/profile/dashboard" })}
        className="h-12 w-[170px] rounded-[40px] bg-inherit text-xl font-normal [&_svg]:size-6"
      >
        <Icon name="icon-git" size="24px" />
        GitHub
      </Button>
    </div>
  );
}
