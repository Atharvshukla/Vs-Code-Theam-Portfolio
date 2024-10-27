import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoLogoJavascript } from "react-icons/io";

function File(props) {
    const router = useRouter();
    return (
        <Link href={props.path}>
            <button
                className={`flex ${
                    router.pathname === props.path && !props.applyProps
                        ? "bg-gray-700"
                        : "hover:bg-gray-900"
                } items-center space-x-1 px-6 py-1 text-sm cursor-pointer select-none`}
            >
                <IoLogoJavascript className="text-yellow-400 w-4 h-4" />
                <h1>{props.filename}</h1>
            </button>
        </Link>
    );
}

export default File;
