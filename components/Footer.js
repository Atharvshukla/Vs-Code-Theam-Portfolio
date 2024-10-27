import React from "react";
import {
    VscFiles,
    VscSearch,
    VscBell,
    VscSourceControl,
    VscCloudUpload,
    VscError,
    VscWarning,
    VscFeedback,
    VscDebugAlt,
    VscExtensions,
    VscSettingsGear,
    VscAccount,
} from "react-icons/vsc";
import { SiPrettier } from "react-icons/si";

function Footer() {
    return (
        <div className="hidden lg:inline-block sticky bottom-0">
            <div className="bg-[#15181d] text-gray-500">
                <div className="flex px-4 py-1 justify-between items-center space-x-5 border-t text-sm border-gray-600">
                    <div className="flex items-center space-x-5">
                        <a href="https://github.com/MEGA-BLASTER2004">
                            <div className="flex items-center space-x-1">
                                <VscSourceControl className="h-4 w-4" />
                                <h1 className="text-gray-400 text-sm">
                                    master*
                                </h1>
                            </div>
                        </a>
                        <VscCloudUpload className="h-4 w-4" />
                        <div className="flex items-center space-x-1">
                            <VscError className="h-4 w-4" />
                            <h1>0</h1>
                            <VscWarning className="h-4 w-4" />
                            <h1>0</h1>
                        </div>
                    </div>
                    <div className="flex space-x-5 items-center">
                        <h1>Powered By Next.js</h1>
                        <h1>Spaces: 4</h1>
                        <h1>UTF-8</h1>
                        <h1>LF</h1>
                        <h1>{"{ } JavaScript"}</h1>
                        <h1 className="flex items-center space-x-1">
                            <SiPrettier />
                            <span>Prettier</span>
                        </h1>
                        <VscFeedback />
                        <VscBell />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
