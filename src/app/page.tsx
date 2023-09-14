import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <h1>Hello world</h1>

      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
