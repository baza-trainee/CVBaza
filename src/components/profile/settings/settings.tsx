"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangeForm } from "./change-form/change-form";
import { ChangePassword } from "./change-password/change-password";

export const Settings = () => {
  const { data: session } = useSession();
  const [qAuth, setQAuth] = useState(false);
  useEffect(() => {
    if (session?.user?.image) {
      const checkAuth =
        session.user.image.includes("lh3.googleusercontent.com") ||
        session.user.image.includes("avatars.githubusercontent.com");
      setQAuth(checkAuth);
    }
  }, [session]);

  return (
    <div className="ml-6 pb-20">
      <p className="mb-10 text-h3">Мій профіль</p>
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger className="mr-2" value="tab1">
            Change name
          </TabsTrigger>
          {!qAuth && <TabsTrigger value="tab2">Change password</TabsTrigger>}
        </TabsList>
        <TabsContent value="tab1">
          <ChangeForm />
        </TabsContent>
        <TabsContent value="tab2">
          <ChangePassword />
        </TabsContent>
      </Tabs>
    </div>
  );
};
