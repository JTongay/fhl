import { FC, ReactNode } from "react"

interface Props {
    children?: ReactNode;
    type: "text" | "email" | "password";
}

export const Input = (props: Props) => {
    return (
        <div>
            Booyah
        </div>
    )
}