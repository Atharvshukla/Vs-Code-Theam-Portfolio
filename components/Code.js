import React from "react";

function Code() {
    return (
        <div className="font-mono">
            <p className="pl-4 pt-2 text-sm text-blue-400">
                <span className="text-gray-300 mr-6 text-xs">1</span>
                <span className="text-red-400">import</span>{" "}
                <span className="text-white">HomePageStuff</span>{" "}
                <span className="text-red-400">from</span> "../stuff"{" "}
                <span className="text-white">;</span>
            </p>
            <p className="pl-4 pt-1 text-sm text-blue-400">
                <span className="text-gray-300 mr-6 text-xs">2</span>
                <span className="text-red-400">
                    export default function
                </span>{" "}
                <span className="text-purple-400">Home</span>
                <span className="text-orange-400">()</span>{" "}
                <span className="text-white">{"{"}</span>
            </p>
            <p className="pl-4 pt-1 text-sm text-blue-400">
                <span className="text-gray-300 mr-6 text-xs">3</span>
                <span className="text-red-400">return</span>{" "}
                <span className="text-white">{"<"}</span>
                <span className="text-green-400">{"HomePageStuff"}</span>
                <span className="text-white">{" /> ;"}</span>
            </p>
            <p className="pl-4 pt-1 text-sm text-blue-400">
                <span className="text-gray-300 mr-6 text-xs">4</span>
                <span className="text-white">{"}"}</span>
            </p>
        </div>
    );
}

export default Code;
