
"use client";
import type { NextPage } from "next";
import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import YouTube from "react-youtube";
import Modal from "react-modal";
import OsWindow from "~~/components/nerdOS/newWindow";
import 'winbox/dist/css/winbox.min.css'; // required
import 'winbox/dist/css/themes/modern.min.css'; // optional
import 'winbox/dist/css/themes/white.min.css'; // optional
import dynamic from 'next/dynamic';
const WinBox = dynamic(() => import('react-winbox'), { ssr: false });
import FarmApprove from "~~/components/nerdOS/farmApprove";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth"
import { useAccount } from "wagmi"
import { ethers } from "ethers";

const Farms: NextPage = () => {
    const maxAmount = ethers.MaxUint256;

    const account = useAccount();
    const stakingPool = "0x7de38e45A074fBa05053801Bd3a66f3C8C155d31"


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
        const [modalIsOpen, setModalIsOpen] = React.useState(true);
        const [videoUrl, setVideoUrl] = React.useState("https://www.youtube.com/watch?v=rPjez8z61rI");
        let videoCode;
        if (videoUrl) {
            videoCode = videoUrl.split("v=")[1]?.split("&")[0];
        }



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
                            <h1 className="text-2xl">$FCKN 🍗 Jukebox</h1>
                            <div></div>
                        </div>
                        <div>
                            <label> Now Playing:</label> <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                            <div>
                                <YouTube
                                    videoId={videoCode}
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
                    <div className="flex flex-col items-center text-justify">
                        <h3>Welcome to the... <br /><strong className="underline-offset-1 underline text-xl">FRIED CHICKEN $FCKN 🍗<br /> Farm to table Experience</strong></h3>
                        <p className="text-center">Indulge in the ULTIMATE  <strong>$FCKN 🍗</strong> yield farming frenzy.<br />
                            COMMUNITY LED<strong className="underline-offset-1 underline"> FARM FACTORY</strong><br />
                            <strong className="underline-offset-1 underline">HIGH APR POOLS</strong>, <br />
                            Pair your <strong className="underline-offset-1 underline">$DEGEN </strong>
                            tokens with our <br /><strong className="underline-offset-1 underline">RUG-PULL PROOF </strong>
                            liquidity pools! <br />New adrenaline-pumping opportunities<br /> every <strong className="underline-offset-1 underline">$FCKN 🍗 Friday</strong></p>

                        <button className="btn" onClick={() => { setModalIsOpen(false) }}>Enjoy</button>                    </div>
                </Modal>
            </div>
        );
    }
    type FarmProps = {
        name: ("$FCKN/$WETH" | "$FCKN/$DEGEN");
        address: string;
        pool: string;
        poolName: ("wethStakingPool" | "degenStakingPool");
    }
    const LiqStaking = () => {
        const farmList: FarmProps[] =
            [
                { name: "$FCKN/$WETH", address: "0x9c449D92b6Fcb8285b8175B8f9C5dc00F05B797C", poolName: "wethStakingPool", pool: "0x8B7246d22dFE2f8e5F09e466f5f98f2f62DD52b6" },
                { name: "$FCKN/$DEGEN", address: "0x0b1174Bdf13057B7b31D7a3cb5EEe186F33b4107", poolName: "degenStakingPool", pool: "0xcF9ccEF568228831CBed0C5b5fB961Ba70e833F1" }
            ]
        const [farmIndex, setFarmIndex] = useState(0);
        const currentFarm = farmList[farmIndex];
        const [isUnstake, setIsUnstake] = useState(false);
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const [modal2IsOpen, setModal2IsOpen] = useState(false);
        const [optIndex, setOptIndex] = useState(0);
        const [fcknBalance, setFcknBalance] = useState(0)
        const [xFcknBalance, setXFcknBalance] = useState(0)
        const indexHandler = () => {
            if (farmIndex >= farmList.length - 1) {
                setFarmIndex(0)
            }
            else {
                setFarmIndex(farmIndex + 1)
            }
        }
        const approval = useScaffoldContractRead({
            contractName: currentFarm.name,
            functionName: "allowance",
            args: [account.address, currentFarm.pool]
        })
        const balance = useScaffoldContractRead({
            contractName: currentFarm.name,
            functionName: "balanceOf",
            args: [account.address]
        })
        const earned = useScaffoldContractRead({
            contractName: currentFarm.poolName,
            functionName: "earned",
            args: [account.address]
        })
        const stakedBalance = useScaffoldContractRead({
            contractName: currentFarm.poolName,
            functionName: "balanceOf",
            args: [account.address]
        })
        const claim = useScaffoldContractWrite({
            contractName: currentFarm.poolName,
            functionName: "getReward",
        })


        const stake = useScaffoldContractWrite({
            contractName: currentFarm.poolName,
            functionName: "stake",
            args: [BigInt(fcknBalance * 1e18)]
        })

        const approve = useScaffoldContractWrite({
            contractName: currentFarm.name,
            functionName: "approve",
            args: [currentFarm.pool, maxAmount]
        })

        const unstake = useScaffoldContractWrite({

            contractName: currentFarm.poolName,
            functionName: "withdraw",
            args: [BigInt(xFcknBalance * 1e18)]
        })

        useEffect(() => {
            if (currentFarm!) return
            balance.refetch();
            stakedBalance.refetch();
            approval.refetch();
            earned.refetch();
        }, [currentFarm, account.address]);

        const optts = ["selector", "deposit", "withdraw", "approve"];

        const liquidityFunctionRender = () => {

            switch (optts[optIndex]) {
                case "selector":
                    return <div className="flex flex-row">

                        <div className="flex flex-col items-center space-y-2 ">
                            <strong>$FCKN 🍗 Liquidity Staking</strong>
                            <p className="flex flex-row ">
                                farms:
                                {farmList.map((farm, index) => {
                                    return <button className="border-e-emerald-200 border-2" key={index} onClick={() => setFarmIndex(index)}> {farm.name}</button>
                                })}
                            </p>
                            Selected Farm: <strong>{currentFarm.name}</strong><br />
                            balance: {(Number(balance.data) * 1e-18).toFixed(3)} {currentFarm.name}<br />
                            Earned: {(Number(earned.data) * 1e-18).toFixed(3)} $FCKN 🍗 🍗<br />


                            <a className="text-xs text-blue-500" href={`https://basescan.org/token/${currentFarm.address}`} target="_blank">View in BaseScan</a>
                            {Number(stakedBalance.data) !== 0 &&
                                <Tippy className="relative" content={<span>Claim $FCKN 🍗 Tokens</span>}>
                                    <button className="color-blue-500 border-e-rose-200 border-2 bg-[url(/liquidity.png)] bg-contain bg-no-repeat h-[75px] w-[50px]" onClick={() => { claim.write() }} />
                                </Tippy>}
                            {Number(approval.data) == 0 &&
                                <Tippy className="relative" content={<span>Approve $FCKN 🍗 Tokens</span>}>
                                    <button className="color-blue-500 border-e-rose-200 border-2 bg-[url(/shaker.png)] bg-contain bg-no-repeat h-[75px] w-[50px]" onClick={() => { approve.write() }} />
                                </Tippy>}
                            <div className="flex flex-row space-x-4">

                                <Tippy className="relative" content={<span>Add $FCKN 🍗 Liquidity</span>}>
                                    <button className="color-blue-500 border-e-rose-200 border-2 bg-[url(/addLiquidity.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { setOptIndex(1) }} />
                                </Tippy>
                                <Tippy className="relative" content={<span>Withdraw $FCKN 🍗 Liquidity</span>}>
                                    <button className="color-blue-500 border-e-rose-200 border-2 bg-[url(/noLiquidity.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { setOptIndex(2) }} />
                                </Tippy>
                            </div>

                        </div>
                    </div>
                case "deposit":
                    return <>
                        <strong>$FCKN 🍗 Liquidity Staking</strong>
                        <span className="text-sm">Balance:  {(Number(balance?.data) * 1e-18).toFixed(3)} {currentFarm.name} </span>

                        <label className="cursor-pointer" onClick={() => setFcknBalance(Number(balance.data) * 1e-18 || 0)}>max</label><input className="border-2" placeholder="$FCKN 🍗 Balance" value={fcknBalance} type="number" onChange={e => setFcknBalance(Number(e.target.value))} />

                        <Tippy className="relative" content={<span>$FCKN  🍗 STAKE</span>}>
                            <button className="border-e-rose-200 border-2 bg-[url(/chicken.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { stake.write(); setModalIsOpen(false) }} />
                        </Tippy>

                        <Tippy className="relative" content={<span>$FCKN 🍗 Farm Menu</span>}>
                            <button className="color-blue-500 border-e-rose-200 border-2 bg-[url(/liquidity.png)] bg-contain bg-no-repeat h-[75px] w-[50px]" onClick={() => { setOptIndex(0) }} />
                        </Tippy>

                    </>
                case "withdraw":
                    return <>
                        <strong>$FCKN 🍗 unStaking</strong>
                        <span className="text-sm">$FCKN 🍗 Balance:  {(Number(balance.data) * 10e-18).toFixed(3)} $FCKN</span>
                        <span className="text-sm"> Staked $FCKN 🍗 Balance: {(Number(stakedBalance.data) * 10e-18).toFixed(3)} $FCKN </span>
                        <label onClick={() => setXFcknBalance(Number(stakedBalance.data) * 1e-18 || 0)} className="cursor-pointer" >max</label><input className="border-2" placeholder="$xFCKN Balance" value={xFcknBalance} type="number" onChange={e => setXFcknBalance(Number(e.target.value))} />
                        <Tippy className="relative" content={<span>$FCKN  🍗 WITHDRAW</span>}>

                            <button className="border-e-rose-200 border-2 bg-[url(/noLiquidity.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { unstake.write(); setModalIsOpen(false) }} />
                        </Tippy>
                        <Tippy className="relative" content={<span>$FCKN 🍗 Farm Menu</span>}>
                            <button className="color-blue-500 border-e-rose-200 border-2 bg-[url(/liquidity.png)] bg-contain bg-no-repeat h-[75px] w-[50px]" onClick={() => { setOptIndex(0) }} />
                        </Tippy>
                    </>

                case "approve":
                    return <FarmApprove />
                default:
                    return <div>default</div>
            }
        }

        return (

            <>
                <Tippy className="relative" content={<span>View $FCKN 🍗 Liquidity Farms</span>}>
                    <div onClick={() => setModal2IsOpen(true)} className="bg-[url(/liquidity.png)] bg-contain bg-no-repeat relative h-2/3 w-1/4 -top-12 sm:mt-12 sm:ml-12 2xl:mt-4 lg:mt-16 md:mt-24 md:ml-12 2xl:ml-20 left-1/3 cursor-pointer transform origin-bottom-left hover:scale-110" />
                </Tippy>



                <Modal
                    isOpen={modal2IsOpen}
                    onRequestClose={() => setModal2IsOpen(false)}
                    contentLabel="Exercise Completed"
                    style={modalStyles}
                >
                    <div className="relative flex flex-col bg-transparent -backdrop-hue-rotate-30 align-baseline snap-center items-center space-y-2">


                        {liquidityFunctionRender()}
                    </div>
                </Modal>
            </>
        );
    }



    const Staking = () => {
        const [isUnstake, setIsUnstake] = useState(false);
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const [modal2IsOpen, setModal2IsOpen] = useState(false);
        const [optIndex, setOptIndex] = useState(0);
        const [fcknBalance, setFcknBalance] = useState(0)
        const [xFcknBalance, setXFcknBalance] = useState(0)
        const approval = useScaffoldContractRead({
            contractName: "fcknToken",
            functionName: "allowance",
            args: [account.address, stakingPool]
        })
        const balance = useScaffoldContractRead({
            contractName: "fcknToken",
            functionName: "balanceOf",
            args: [account.address]
        })
        const stakedBalance = useScaffoldContractRead({
            contractName: "xStakingPool",
            functionName: "balanceOf",
            args: [account.address]
        })
        const ppShare = useScaffoldContractRead({
            contractName: "xStakingPool",
            functionName: "getPricePerFullShare",
        })

        const stake = useScaffoldContractWrite({
            contractName: "xStakingPool",
            functionName: "stake",
            args: [BigInt(fcknBalance * 1e18)]
        })

        const unstake = useScaffoldContractWrite({
            contractName: "xStakingPool",
            functionName: "withdraw",
            args: [BigInt(xFcknBalance * 1e18)]
        })

        useEffect(() => {
            if (Number(approval.data) > 0) {
                if (isUnstake === true) {
                    setOptIndex(1);
                    console.log("Unstaking");
                    return
                }
                setOptIndex(0);
                return
            }
            setOptIndex(2);

        }, [isUnstake, modalIsOpen]);

        const optts = ["deposit", "withdraw", "approve"];


        const functionRender = () => {

            switch (optts[optIndex]) {
                case "deposit":
                    return <>
                        <strong>$FCKN 🍗 Staking</strong>
                        <span className="text-sm">$FCKN 🍗 Balance:  {(Number(balance?.data) * 1e-18).toFixed(3)} $FCKN</span>

                        <span className="text-sm">Staked $FCKN 🍗 Balance: {((Number(ppShare.data) * 1e-18) * (Number(stakedBalance.data) * 1e-18)).toFixed(3)} $FCKN </span>
                        <label className="cursor-pointer" onClick={() => setFcknBalance(Number(balance.data) * 1e-18 || 0)}>max</label><input className="border-2" placeholder="$FCKN %🍗" value={fcknBalance} type="number" onChange={e => setFcknBalance(Number(e.target.value))} />
                        <Tippy className="relative" content={<span>$FCKN  🍗 STAKE</span>}>
                            <button className="border-e-rose-200 border-2 bg-[url(/chicken.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { stake.write(); setModalIsOpen(false) }} />
                        </Tippy>
                        <Tippy className="relative" content={<span>$FCKN  🍗 TOGGLE</span>}>
                            <button className="bg-[url(/noChicken.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { setIsUnstake(true) }} />
                        </Tippy>

                    </>
                case "withdraw":
                    return <>
                        <strong>$FCKN 🍗 unStaking</strong>
                        <span className="text-sm">$FCKN 🍗 Balance:  {(Number(balance.data) * 1e-18).toFixed(3)} $FCKN</span>
                        <span className="text-sm"> Staked $FCKN 🍗 Balance: {(Number(stakedBalance.data) * 1e-18).toFixed(3)} $FCKN </span>
                        <label onClick={() => setXFcknBalance(Number(stakedBalance.data) * 1e-18 || 0)} className="cursor-pointer" >max</label> <input className="border-2" placeholder="$xFCKN Balance" value={Number(xFcknBalance)} type="number" onChange={e => setXFcknBalance(Number(e.target.value))} />
                        <Tippy className="relative" content={<span>$FCKN  🍗 WITHDRAW</span>}>

                            <button className="border-e-rose-200 border-2 bg-[url(/noChicken.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { unstake.write(); setModalIsOpen(false) }} />
                        </Tippy>
                        <Tippy className="relative" content={<span>$FCKN  🍗 TOGGLE</span>}>
                            <button className="bg-[url(/chicken.png)] bg-contain bg-no-repeat h-[75px] w-[75px]" onClick={() => { ; setIsUnstake(false) }} />
                        </Tippy>
                    </>

                case "approve":
                    return <FarmApprove />
                default:
                    return <div>default</div>
            }
        }



        return (

            <>
                <Tippy className="relative -left-24" content={<span>View $FCKN 🍗 Staking</span>}>
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
                <LiqStaking />



                <a className="" href="https://app.uniswap.org/swap?outputcurrency=0x7d12aeb5d96d221071d176980d23c213d88d9998&chain=base" target="_blank" >
                    <Tippy content={<span>Buy $FCKN 🍗</span>}>

                        <div className="bg-[url(/shaker.png)] bg-contain bg-no-repeat relative -top-1/3 sm:-mt-12 sm:-ml-32 md:-mt-10 lg:-mt-16 lg:-ml-16 2xl:-mt-12 md:-ml-32 2xl:ml-4 left-52 h-1/4 w-32 cursor-pointer transform origin-bottom-left hover:scale-110" />
                    </Tippy>
                </a>


                <a href="https://app.uniswap.org/swap?outputcurrency=0x7d12aeb5d96d221071d176980d23c213d88d9998&chain=base" target="_blank" >
                    <Tippy className="" content={<span>Add $FCKN 🍗 Liquidity</span>}>
                        <div className="bg-[url(/shaker.png)] bg-contain bg-no-repeat relative -top-2/3 lg:mt-16  md:mt-12 left-32 h-1/4 w-32 md:-ml-20 2xl:-ml-6 cursor-pointer transform origin-bottom-left hover:scale-110" />

                    </Tippy>
                </a>


            </div>
            <Content />
        </>



    )
};

export default Farms;
