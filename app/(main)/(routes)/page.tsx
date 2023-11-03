"use client";

import { ModeToggle } from "@/components/ToggleMode";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
 
  return (
    <>
      <UserButton afterSignOutUrl="/"/>
      <Button >
        Pay 100000 Rupees to shyam
      </Button>
      <ModeToggle />
    </>
  );
}
