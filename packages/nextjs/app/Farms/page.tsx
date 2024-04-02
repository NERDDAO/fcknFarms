
"use client";
import type { NextPage } from "next";
import React, { useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import YouTube from "react-youtube";
import Modal from "react-modal";
import OsWindow from "~~/components/nerdOS/newWindow";
import 'winbox/dist/css/winbox.min.css'; // required
import 'winbox/dist/css/themes/modern.min.css'; // optional
import 'winbox/dist/css/themes/white.min.css'; // optional
import WinBox from 'react-winbox';
import FarmApprove from "~~/components/nerdOS/farmApprove";


const Farms: NextPage = () => {



    const modalStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)"
        }
    };

    // Render function for Prismic headless CMS pages
    function Content() {
        const [modalIsOpen, setModalIsOpen] = React.useState(false);
        const [videoUrl, setVideoUrl] = React.useState("https://www.youtube.com/watch?v=rPjez8z61rI");
        let videoCode;
        if (videoUrl) {
            videoCode = videoUrl.split("v=")[1]?.split("&")[0];
        }

        const checkElapsedTime = (e: any) => {
            console.log(e.target.playerInfo.playerState);
            const duration = e.target.getDuration();
            const currentTime = e.target.getCurrentTime();
            if (currentTime / duration > 0.95) {
                setModalIsOpen(true);
            }
        };

        const opts = {
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };

        const handleExerciseComplete = () => console.log("Do something");

        return (

            <div className="p-6">
                <WinBox
                    width={this?.state.boxWidth ?? 500}
                    height={300}
                    x="right"
                    y="bottom"
                    noClose={this?.state.inEditing}
                >
                    <div>

                        <div>
                            <h1 className="text-2xl">$FCKN Jukebox</h1>
                            <div></div>
                        </div>
                        <div>
                            <label> Now Playing:</label> <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                            <div>
                                <YouTube
                                    videoId={videoCode}
                                    onStateChange={(e: any) => checkElapsedTime(e)}
                                    opts={opts}
                                />
                            </div>
                        </div>
                    </div>
                </WinBox>



                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Exercise Completed"
                    style={modalStyles}
                >
                    <div>
                        <h3>Welcome to the <br /><strong className="underline-offset-1 underline text-xl">FRIED CHICKEN <br /> $FCKN Farm to table Experience</strong></h3>
                        <p>Indulge in the ULTIMATE  <strong>$FCKN</strong> yield farming frenzy.<br />
                            COMMUNITY LED<strong className="underline-offset-1 underline"> FARM FACTORY</strong><br />
                            <strong className="underline-offset-1 underline">HIGH APR POOLS</strong>, <br />
                            Pair your <strong className="underline-offset-1 underline">$DEGEN </strong>
                            tokens with our <br /><strong className="underline-offset-1 underline">RUG-PULL PROOF </strong>
                            liquidity pools! <br />New adrenaline-pumping opportunities<br /> every <strong className="underline-offset-1 underline">$FCKN Friday</strong></p>

                        <button className="btn" onClick={() => { handleExerciseComplete(); setModalIsOpen(false) }}>Enjoy</button>
                    </div>
                </Modal>
            </div>
        );
    }

    const Staking = () => {
        const [isUnstake, setIsUnstake] = React.useState(false);
        const [modalIsOpen, setModalIsOpen] = React.useState(false);
        const [optIndex, setOptIndex] = React.useState(0);
        useEffect(() => {
            if (isUnstake === true) {
                setOptIndex(1);
                console.log("Unstaking");
                return
            }
            setOptIndex(0);
        }, [isUnstake]);

        const optts = ["test", "test2", "test3"];
        const functionRender = () => {

            switch (optts[2]) {
                case "test":
                    return <>
                        <strong>$FCKN Staking</strong>
                        <span className="text-sm">Current Balance: 123 $FCKN</span>
                        <span className="text-sm"> Staked Balance: 12341 $FCKN </span>
                        <label className="cursor-pointer" onClick={() => console.log("setMax")}><input className="border-2" placeholder="$FCKN Balance" />max</label>
                        <button className="border-e-rose-200 border-2 bg-[url(/chicken.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { handleExerciseComplete(); }} />

                        <button className="bg-[url(/noChicken.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { handleExerciseComplete(); setIsUnstake(true) }} />

                    </>
                case "test2":
                    return <>
                        <strong>$FCKN unStaking</strong>
                        <span className="text-sm">Current Balance: 123 $FCKN</span>
                        <span className="text-sm"> Staked Balance: 12341 $FCKN </span>
                        <label className="cursor-pointer" onClick={() => console.log("setMax")}><input className="border-2" placeholder="$xFCKN Balance" />max</label>

                        <button className="border-e-rose-200 border-2 bg-[url(/noChicken.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { handleExerciseComplete(); setModalIsOpen(false) }} />
                        <button className="bg-[url(/chicken.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { handleExerciseComplete(); setIsUnstake(false) }} />
                    </>

                case "test3":
                    return <FarmApprove />
                default:
                    return <div>default</div>
            }
        }
        const handleExerciseComplete = () => console.log("Do something");

        return (

            <>
                <Tippy className="relative -left-24" content={<span>View $FCKN Staking</span>}>
                    <div onClick={() => setModalIsOpen(true)} className="bg-[url(/chicken.png)] bg-contain bg-no-repeat relative md:scale-90 sm:scale-90 h-[50%] w-[30%] top-1/3 sm:ml-16 sm:-mt-4 md:-mt-4 left-34 md:ml-32 lg:ml-24 lg:-mt-8 2xl:-mt-12  xl:ml-36 2xl:ml-52 cursor-pointer transform origin-bottom hover:scale-110" /></Tippy>



                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Exercise Completed"
                    style={modalStyles}
                >
                    <div className="flex flex-col bg-transparent -backdrop-hue-rotate-30 align-baseline snap-center items-center space-y-2">


                        {functionRender()}
                    </div>
                </Modal>
            </>
        );
    }




    return (
        <>
            <div className="container mx-auto h-[100%] w-[100%] absolute align-center left-1/4 md:-ml-8 lg:ml-24 xl:-ml-6 2xl:-ml-16 bg-[url(/fcknBg.png)] bg-no-repeat bg-contain overflow-clip">
                <Staking />

                <Tippy className="relative" content={<span>View $FCKN Liquidity Farms</span>}>
                    <div className="bg-[url(/liquidity.png)] bg-contain bg-no-repeat relative h-2/3 w-1/4 -top-12 sm:mt-12 sm:ml-12 2xl:mt-4 lg:mt-16 md:mt-24 md:ml-12 2xl:ml-20 left-1/3 cursor-pointer transform origin-bottom-left hover:scale-110" />
                </Tippy>

                <a className="" href="https://app.uniswap.org/swap?outputcurrency=0x7d12aeb5d96d221071d176980d23c213d88d9998&chain=base" target="_blank" >
                    <Tippy content={<span>Buy $FCKN</span>}>

                        <div className="bg-[url(/shaker.png)] bg-contain bg-no-repeat relative -top-1/3 sm:-mt-12 sm:-ml-32 md:-mt-10 lg:-mt-16 lg:-ml-16 2xl:-mt-12 md:-ml-32 2xl:ml-4 left-52 h-1/4 w-32 cursor-pointer transform origin-bottom-left hover:scale-110" />
                    </Tippy>
                </a>


                <a href="https://app.uniswap.org/swap?outputcurrency=0x7d12aeb5d96d221071d176980d23c213d88d9998&chain=base" target="_blank" >
                    <Tippy className="" content={<span>Add $FCKN Liquidity</span>}>
                        <div className="bg-[url(/shaker.png)] bg-contain bg-no-repeat relative -top-2/3 lg:mt-16  md:mt-12 left-32 h-1/4 w-32 md:-ml-20 2xl:-ml-6 cursor-pointer transform origin-bottom-left hover:scale-110" />

                    </Tippy>
                </a>


            </div>
            <Content />
        </>



    )
};

export default Farms;
