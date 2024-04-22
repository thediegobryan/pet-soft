import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="flex flex-col h-[500px] items-center justify-center">
        <p className="py-4">Logged in as example@gmail.com</p>
        <Button>Sign out</Button>
      </ContentBlock>
    </main>
  );
}
