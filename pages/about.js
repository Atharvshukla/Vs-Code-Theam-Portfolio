import Head from 'next/head';
import File from '../components/File';
import Sidebar from '../components/Sidebar';
import { BiCodeAlt } from 'react-icons/bi';
import { VscClose } from 'react-icons/vsc';
import Paths from '../components/Paths';
import OpenEditor from '../components/OpenEditor';
import Code from '../components/Code';
import Footer from '../components/Footer';
import TopNav from '../components/TopNav';
import ProjectTile from '../components/ProjectTile';
import ReactTypingEffect from 'react-typing-effect';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';
import Link from 'next/link';
import CursorAnimation from '../components/CursorAnimation';
import dynamic from 'next/dynamic';
const AnimatedCursor = dynamic(import('react-animated-cursor'), { ssr: false });

export default function about() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-center mt-10 text-center sm:hidden">
                <h1>Please Rotate your Screen or view on Desktop</h1>
            </div>
            <div className="hidden selection:text-gray-400 sm:flex flex-grow">
                <Sidebar />
                <div className="bg-[#1f2428] border-r border-gray-600 text-white w-60">
                    <Paths />
                </div>
                <div className="bg-[#24292f] flex-grow flex flex-col text-white">
                    <div className="flex">
                        <TopNav />
                    </div>
                    <div className="flex-grow border-t flex flex-col border-gray-600">
                        <div className="bg-conten bg-no-repeat bg-cover flex flex-col p-8 space-y-5 flex-grow text-lg">
                            <div className="flex items-center ">
                                <img
                                    src="https://i.ibb.co/YWQ1pCq/i-Screen-Shoter-20240630051408930.jpg"
                                    alt="alt"
                                    className="w-24 h-24 border-2 border-red-500 rounded-full"
                                />
                                <div className="flex flex-col ml-4">
                                    <h1 className="font-bold text-lg">
                                        Atharv Shukla
                                    </h1>
                                    <h1 className="font-light text-green-500">
                                        <ReactTypingEffect
                                            text={[
                                                'Full Stack Developer',
                                                'AWS Cloud Practitioner',
                                                'DAPP Developer',
                                                'Computer Science Student',
                                                'Competitive Coder',
                                            ]}
                                            speed={75}
                                            eraseDelay={1500}
                                            eraseSpeed={50}
                                            typingDelay={800}
                                        />
                                    </h1>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 pb-6 rounded-xl border-b border-blue-500">
                                <Link href="/socials">
                                    <button className="border border-red-500 p-2 w-28 hover:rounded-xl rounded-md hover:scale-105 hover:shadow-xl hover:bg-red-500 transition">
                                        Contact Me
                                    </button>
                                </Link>
                                <Link href="/projects">
                                    <button className="border border-red-500 p-2 w-32 hover:rounded-xl rounded-md hover:scale-105 hover:shadow-xl hover:bg-red-500 transition">
                                        View Projects
                                    </button>
                                </Link>
                            </div>
                            <h1 className="font-serif text-2xl w-48 shadow-xl text-center p-1 rounded-md">
                                <RoughNotation
                                    type="underline"
                                    show={true}
                                    color="red"
                                    iterations={3}
                                >
                                    A little About Me
                                </RoughNotation>
                            </h1>
                            <p className="font-mono text-base font-light leading-10">
                                <p className="text-gray-300">Hey There,</p>I am{' '}
                                <span className="hover:underline transition">
                                    <RoughNotation
                                        type="circle"
                                        color="orange"
                                        show={true}
                                        padding={9}
                                        animationDelay={400}
                                    >
                                        Atharv&nbsp;Shukla
                                    </RoughNotation>
                                </span>
                                , a{' '}
                                <span className="text-white font-semibold transition hover:p-1 p-1">
                                    <RoughNotation
                                        type="highlight"
                                        color="purple"
                                        show={true}
                                        padding="13"
                                        animationDelay={800}
                                    >
                                        Full&nbsp;Stack&nbsp;Developer
                                    </RoughNotation>
                                </span>
                                ,{' '}
                                <span className="text-white font-semibold transition hover:p-1 p-1">
                                    <RoughNotation
                                        type="highlight"
                                        color="green"
                                        show={true}
                                        padding="15"
                                        animationDelay={1600}
                                    >
                                        AWS&nbsp;Cloud&nbsp;Practitioner
                                    </RoughNotation>
                                </span>
                                ,{' '}
                                <span className="text-white font-semibold transition hover:p-1 p-1">
                                    <RoughNotation
                                        type="highlight"
                                        color="blue"
                                        show={true}
                                        padding="16"
                                        animationDelay={2400}
                                    >
                                        Dapp&nbsp;Developer
                                    </RoughNotation>
                                </span>
                                ,{' '}
                                {/* <span className="text-white font-semibold transition hover:p-1 p-1">
                                    <RoughNotation
                                        type="highlight"
                                        color="red"
                                        show={true}
                                        padding="10"
                                        animationDelay={3200}
                                    >
                                        Competitive&nbsp;Coder
                                    </RoughNotation>
                                </span>{' '} */}
                                and {'a '}
                                <span className="text-white font-semibold transition hover:p-1 p-1">
                                    <RoughNotation
                                        type="highlight"
                                        color="teal"
                                        show={true}
                                        padding="10"
                                        animationDelay={4000}
                                    >
                                        Learner
                                    </RoughNotation>
                                    !
                                </span>
                                <div className="font-mono">
                                    I am currently a{' '}
                                    <RoughNotation
                                        type="box"
                                        animationDelay={4800}
                                        show={true}
                                        color="violet"
                                        iterations={4}
                                    >
                                        B.Tech&nbsp;Computer&nbsp;Science
                                    </RoughNotation>{' '}
                                    Undergrad at{' '}
                                    <RoughNotation
                                        type="highlight"
                                        animationDelay={5600}
                                        show={true}
                                        color="gray"
                                    >
                                        Vellore&nbsp;Institute&nbsp;of&nbsp;Technology
                                    </RoughNotation>
                                    , Vellore, India.
                                </div>{' '}
                                Catch up with me on{' '}
                                <a
                                    href="https://instagram.com/__imatharv"
                                    className="hover:underline"
                                >
                                    <RoughNotation
                                        type="circle"
                                        color="pink"
                                        show={true}
                                        animationDelay={6400}
                                        padding={8}
                                    >
                                        Instagram
                                    </RoughNotation>
                                </a>
                                <br />
                                <RoughNotation
                                    type="box"
                                    color="#e75480"
                                    show={true}
                                    animationDelay={7200}
                                    padding={5}
                                >
                                    Life
                                </RoughNotation>
                                &nbsp;
                                {'->'} 99 little bugs in the code. 99 little
                                bugs in the code. Take one down, patch it
                                around. 127 little bugs in the code...👨‍💻 <br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
