import React from "react";
import {
    VscFiles,
    VscSearch,
    VscSourceControl,
    VscDebugAlt,
    VscExtensions,
    VscSettingsGear,
    VscAccount,
} from "react-icons/vsc";

function Sidebar() {
    return (
        <div className="hidden sm:flex flex-col bg-[#24292f] text-white-500 border-r border-gray-600 p-2 space-y-6">
            <div className="flex-grow space-y-6">
                <VscFiles className="text-white h-8 w-8" />
                <VscSearch className="text-gray-400 h-8 w-8" />
                <VscSourceControl className="text-gray-400 h-8 w-8" />
                <VscDebugAlt className="text-gray-400 h-8 w-8" />
                <VscExtensions className="text-gray-400 h-8 w-8" />
            </div>
            <VscAccount className="text-gray-400 h-8 w-8" />
            <VscSettingsGear className="text-gray-400 h-8 w-8" />
        </div>
    );
}

export default Sidebar;
