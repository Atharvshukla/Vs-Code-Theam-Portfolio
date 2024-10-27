import React from "react";

function Socials() {
    return (
        <div>
            <h1 className="font-mono text-red-500 text-xl">
                const <span className="text-green-500">socials</span>{" "}
                <span className="text-white">={" {"}</span>
            </h1>
            {/* <h1 className="text-white font-mono text-base">
                "website":{" "}
                <span className="text-orange-500">
                    <a
                        href="https://dev.devmegablaster.engineer"
                        className="hover:underline"
                    >
                        dev.devmegablaster.engineer
                    </a>
                </span>
                ,
            </h1> */}
            <h1 className="text-white font-mono text-base">
                "github":{" "}
                <span className="text-orange-500">
                    <a
                        href="https://github.com/atharvshukla"
                        className="hover:underline"
                    >
                        ATHARVSHUKLA
                    </a>
                </span>
                ,
            </h1>
            <h1 className="text-white font-mono text-base">
                "Linkedin":{" "}
                <span className="text-orange-500">
                    <a
                        href="https://www.linkedin.com/in/atharv-shukla-634419171/"
                        className="hover:underline"
                    >
                        Atharv Shukla
                    </a>
                </span>
                ,
            </h1>
            <h1 className="text-white font-mono text-base">
                "Instagram":{" "}
                <span className="text-orange-500">
                    <a
                        href="https://www.instagram.com/__imatharv"
                        className="hover:underline"
                    >
                        __imatharv
                    </a>
                </span>
                ,
            </h1>
            <h1 className="text-white font-mono text-base">
                "Email":{" "}
                <span className="text-orange-500">
                    <span className="hover:underline select-all">
                        atharvshukla.dev@gmail.com
                    </span>
                </span>
            </h1>
            <h1 className="text-xl">{"}"}</h1>
        </div>
    );
}

export default Socials;
