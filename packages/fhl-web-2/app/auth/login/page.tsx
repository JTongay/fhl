"use client"

import { PropsWithChildren } from "react";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage(props: PropsWithChildren) {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <SignIn
                signUpUrl={"/auth/signup"}
                redirectUrl={"/"}
            />
        </div>
    )
}
