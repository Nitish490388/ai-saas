"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {Montserrat} from "next/font/google"
import { 
    LayoutDashboard,
    MessageSquare,
    VideoIcon,
    ImageIcon,
    Music,
    Code,
    Settings
 } from "lucide-react";

import { cn } from "@/lib/utils";


const montserrat = Montserrat({weight: "600", subsets: ["latin"]});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/",
        color: "text-violet-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/",
        color: "text-pink-700",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/",
        color: "text-orange-700",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/",
        color: "text-emerald-500",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/",
        color: "text-green-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/",
    },
    
]

const Sidebar = () => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>Genius</h1>
        </Link>
        <div className="space-y-1">
        {
            routes.map((route) => (
                <Link 
                    href={route.href}
                    key={route.href}
                    className="text-sm group flex p-3 w-full justify-start font-medium
                        cursor-pointer hover:text-white hover:bg-white/10 rounded-lg
                        trasition
                    "
                >
                    <div className="flex items-center flex-1">
                        <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                        {route.label}
                    </div>
                </Link>
            ))
        }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
