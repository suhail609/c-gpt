"use client";

import { Card } from "@repo/ui/card";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const LINKS = [
    {
      title: "Sign Up",
      description: "",
      onClick: () => {
        router.push("/signup");
      },
    },
    {
      title: "Sign In",
      description: "",
      onClick: () => {
        router.push("/signin");
      },
    },
  ];

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="grid mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {LINKS.map(({ title, description, onClick }, index) => (
          <Card href="" key={index} title={title} onClick={onClick}>
            {description}
          </Card>
        ))}
      </div>
    </main>
  );
}
