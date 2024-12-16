"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Icon from "./icon";

export function SocialAuth() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Button
        variant="outline"
        className="w-[170px] h-12 rounded-[40px] px-8 py-3 font-normal text-xl [&_svg]:size-6 bg-inherit"
        onClick={() => signIn("google", { callbackUrl: "/" })}        
      >
        <Icon name="icon-google" size="full"/>
        Google
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="w-[170px] h-12 rounded-[40px] font-normal text-xl [&_svg]:size-6 bg-inherit"
      >
        <Icon name="icon-git" size="24px"/>
        
        GitHub
      </Button>
    </div>
  );
}
