"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import Sidebar from "@/components/sidebar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileSidebar = () => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
      <div className="md:hidden">
        <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar/>
        <SheetHeader>
      <SheetTitle></SheetTitle>
      <SheetDescription>
      </SheetDescription>
    </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;


{/* <Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet> */}