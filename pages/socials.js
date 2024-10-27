import Head from "next/head";
import File from "../components/File";
import Sidebar from "../components/Sidebar";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { BiCodeAlt } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import Paths from "../components/Paths";
import OpenEditor from "../components/OpenEditor";
import Code from "../components/Code";
import Footer from "../components/Footer";
import ReactTypingEffect from "react-typing-effect";
import TopNav from "../components/TopNav";
import Socials from "../components/Socials";
import CursorAnimation from "../components/CursorAnimation";
import dynamic from "next/dynamic";
const AnimatedCursor = dynamic(import("react-animated-cursor"), { ssr: false });

export default function profile() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-center mt-10 text-center sm:hidden">
                <h1>Please Rotate your Screen or view on Desktop</h1>
            </div>
            <div className="hidden sm:flex flex-grow">
                <Sidebar />
                <div className="bg-[#1f2428] border-r border-gray-600 text-white w-60">
                    <Paths />
                </div>
                <div className="bg-[#24292f] flex-grow flex flex-col text-white">
                    <div className="flex">
                        <TopNav />
                    </div>
                    <div className="flex-grow border-t flex flex-col border-gray-600">
                        <div className="bg-cover h-max flex-grow text-lg lg:flex justify-center space-y-5 lg:space-y-0 lg:space-x-20 p-4">
                            <div className="flex flex-col space-y-4">
                                <h1 className="text-2xl font-light pb-2">
                                    <RoughNotation
                                        type="underline"
                                        color="orange"
                                        show={true}
                                        iterations={5}
                                        animationDuration={2000}
                                    >
                                        Reach out to me via Socials
                                    </RoughNotation>
                                </h1>
                                <Socials />
                            </div>
                            <div className="border border-red-500 lg:self-baseline lg:h-2/3" />
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-light pb-3">
                                    <RoughNotation
                                        type="underline"
                                        color="orange"
                                        show={true}
                                        iterations={5}
                                        animationDuration={2000}
                                        animationDelay={2000}
                                    >
                                        Or Fill out this Form
                                    </RoughNotation>
                                </h1>
                                <form className="p-1 flex flex-col space-y-4 font-mono">
                                    <div className="flex space-x-6">
                                        <div className="flex flex-col">
                                            <h1 className="font-mono font-medium text-sm">
                                                Name
                                            </h1>
                                            <input
                                                type="text"
                                                className="p-1 bg-zinc-700 text-orange-500 focus:border focus:border-orange-500 outline-none"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="font-mono font-medium text-sm">
                                                Email
                                            </h1>
                                            <input
                                                type="text"
                                                className="p-1 bg-zinc-700 text-orange-500 focus:border focus:border-orange-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="font-mono font-medium text-sm">
                                            Subject
                                        </h1>
                                        <input
                                            type="text"
                                            className="p-1 bg-zinc-700 text-orange-500 focus:border focus:border-orange-500 outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="font-mono font-medium text-sm">
                                            Message
                                        </h1>
                                        <textarea
                                            type="message"
                                            className="p-1 h-40 bg-zinc-700 text-orange-500 focus:border focus:border-orange-500 outline-none"
                                        />
                                    </div>
                                    <button className="bg-orange-500 p-2 mx-auto rounded-lg hover:bg-orange-600 hover:scale-105 active:scale-95 duration-150 border border-white font-mono">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
