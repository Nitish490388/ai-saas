import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Landing Page 
      <Link href="/sign-up">
      <Button >Sign-up</Button>
      </Link>
      <Link href="/sign-in">
      <Button >Sign-in</Button>
      </Link>
    </div>
  );
}
