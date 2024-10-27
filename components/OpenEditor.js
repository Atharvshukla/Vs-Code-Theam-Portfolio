import { useRouter } from "next/router";
import React from "react";
import { VscClose } from "react-icons/vsc";
import File from "./File";

function OpenEditor(props) {
    const router = useRouter();
    return (
        <div>
            <div
                className={`w-max border-t ${
                    router.pathname === props.path
                        ? "border-orange-500"
                        : "border-none"
                }`}
            >
                <div className="border-r flex items-center border-gray-600">
                    <div
                        className={`p-1  ${
                            router.pathname === props.path
                                ? "bg-gray-700"
                                : "hover:bg-gray-900"
                        }`}
                    >
                        <File filename={props.open} path={props.path} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OpenEditor;
