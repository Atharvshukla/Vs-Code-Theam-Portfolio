import Head from "next/head";
import File from "../components/File";
import { SiVisualstudio } from "react-icons/si";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import { BiCodeAlt } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import Paths from "../components/Paths";
import OpenEditor from "../components/OpenEditor";
import Code from "../components/Code";
import Footer from "../components/Footer";
import ReactTypingEffect from "react-typing-effect";
import TopNav from "../components/TopNav";
import { RoughNotation } from "react-rough-notation";
import CursorAnimation from "../components/CursorAnimation";
import dynamic from "next/dynamic";
const AnimatedCursor = dynamic(import("react-animated-cursor"), { ssr: false });

export default function Home(props) {
    const router = useRouter();
    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-center mt-10 text-center sm:hidden">
                <h1>Please Rotate your Screen or view on Desktop</h1>
            </div>
            {console.log(props.cursor)}
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
                        <div className="bg-content h-screen sm:h-max bg-no-repeat bg-cover flex flex-col p-8 justify-center space-y-5 flex-grow text-lg">
                            <div className="rounded-full bg-red-500 self-baseline">
                                <img
                                    src="https://i.ibb.co/b1fGdd2/d07f973f0f01cb8a3c96d1655deee96a-sticker.png"
                                    alt="Ojas"
                                    className="w-36 h-36 rounded-full z-10"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <h1 className="text-white font-mono link text-5xl">
                                    <RoughNotation
                                        type="highlight"
                                        color="#ff00004d"
                                        iterations={2}
                                        animationDuration={1500}
                                        show={true}
                                        strokeWidth={0.2}
                                    >
                                        Atharv Shukla
                                    </RoughNotation>
                                </h1>
                            </div>
                            <h1 className="text-white font-mono text-3xl">
                                <ReactTypingEffect
                                    text={[
                                        'Full Stack Developer',
                                        'AWS Cloud Practitioner',
                                        'DAPP Developer',
                                        'Computer Science Student',
                                    ]}
                                    speed={100}
                                    eraseDelay={1500}
                                    eraseSpeed={100}
                                    typingDelay={800}
                                />
                            </h1>
                            <div className="flex space-x-10 pt-10">
                                <button
                                    onClick={() => {
                                        router.push("/projects");
                                    }}
                                    className="bg-red-500 font-mono hover:shadow-2xl font-bold p-2 rounded-md border border-white hover:bg-red-600 hover:scale-105 active:scale-95 duration-150"
                                >
                                    View Projects
                                </button>
                                <button
                                    className="border font-bold font-mono hover:shadow-2xl border-red-500 p-2 hover:scale-105 active:scale-95 rounded-md hover:bg-red-500 duration-150"
                                    onClick={() => {
                                        router.push("/socials");
                                    }}
                                >
                                    Socials
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
