"use client";

import "@/lib/amplify";

import { Button } from "@web/ui/components/button";
import { helloWorld } from "@/lib/api/hello-world";

export default function Page() {
  const handleClick = async () => {
    console.log("Button clicked!");

    const response = await helloWorld();

    console.log("Response:", response);
  };

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm" onClick={handleClick}>
          Button
        </Button>
      </div>
    </div>
  );
}
