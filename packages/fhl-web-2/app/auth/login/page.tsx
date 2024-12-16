"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div
      className="
        h-screen w-screen flex flex-col justify-center items-center"
    >
      <SignIn signUpUrl={"/auth/signup"} redirectUrl={"/"} />
    </div>
  );
}
