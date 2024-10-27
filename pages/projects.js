import Head from 'next/head';
import File from '../components/File';
import Sidebar from '../components/Sidebar';
import { BiCodeAlt } from 'react-icons/bi';
import { VscClose } from 'react-icons/vsc';
import Paths from '../components/Paths';
import OpenEditor from '../components/OpenEditor';
import Code from '../components/Code';
import Footer from '../components/Footer';
import ReactTypingEffect from 'react-typing-effect';
import TopNav from '../components/TopNav';
import ProjectTile from '../components/ProjectTile';
import { RoughNotation } from 'react-rough-notation';
import CursorAnimation from '../components/CursorAnimation';
import dynamic from 'next/dynamic';
const AnimatedCursor = dynamic(import('react-animated-cursor'), { ssr: false });

export default function projects(props) {
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
                        <div className="bg-conten bg-no-repeat bg-cover flex flex-col p-8 space-y-5 flex-grow text-lg">
                            <h1 className="font-mono text-red-500 text-5xl">
                                <RoughNotation
                                    type="underline"
                                    color="red"
                                    animationDuration={4000}
                                    iterations={6}
                                    show="true"
                                    strokeWidth={0.5}
                                >
                                    Projects
                                </RoughNotation>
                            </h1>
                            <div className="grid grid-cols-2 overflow-y-auto lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-2 gap-2">
                                <ProjectTile
                                    title="Expensesage"
                                    githubLink="https://github.com/Atharvshukla/ExpenseSage"
                                    viewLink="http://expensesage.vercel.app"
                                    description="ExpenseSage is a web application that enables users to track their daily expenses and income in a modular format.ExpenseSage provides investment advice based on Machine Learning."
                                    image="https://i.ibb.co/g4w1NK4/favicon.png"
                                />
                                <ProjectTile
                                    title="LiveTrace"
                                    githubLink="https://github.com/Atharvshukla/LiveTrace"
                                    viewLink="http://livetrace.onrender.com/"
                                    description="LiveTrace is an incident reporting and real-time tracking application focused on enhancing women’s safety. "
                                    image="https://i.ibb.co/bNm843G/favicon.png"
                                />
                                
                                <ProjectTile
                                    title="SyncSheets"
                                    githubLink="https://github.com/Atharvshukla/SyncSheets"
                                    viewLink="https://drive.google.com/file/d/17XCh46P7JMpKIVdO0UBSLkyRX3sgJ2VZ/view?usp=sharing"
                                    description="SyncSheets is an automated tool that synchronizes data between Google Sheets and databases in real-time, leveraging Node.js, Express, and Google Cloud Services to ensure seamless, error-free data management across platforms."
                                    image="https://i.ibb.co/6rzm5y7/logo-color.png"
                                />
                                <ProjectTile
                                    title="Dappstagram"
                                    githubLink="https://github.com/Atharvshukla/Dappstragram"
                                    viewLink="https://www.youtube.com/watch?v=wq3HQqQrJpo&ab_channel=Atharvshukla"
                                    description="Dappstragram is a decentralized application built on Ethereum that allows users to upload images and receive Ether tips, utilizing IPFS for censorship-resistant storage and smart contracts for secure transactions."
                                    image="https://i.ibb.co/4dvw3Kq/dapp.png"
                                />
                                <ProjectTile
                                    title="VSCode Portfolio"
                                    githubLink=""
                                    viewLink=""
                                    description="Portfolio made using React.Js inspired by Visual Studio Code IDE Dark Theme (Renovation Soon :) )"
                                    image="https://i.ibb.co/pJ528RY/port.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
