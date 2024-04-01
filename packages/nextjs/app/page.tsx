"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { Howl, Howler } from 'howler';

const Home: NextPage = () => {

    const sound = new Howl({
        src: ['bell.mp3']
    });

    const { address: connectedAddress } = useAccount();

    return (
        <>
            <div className="flex transform 
                items-center flex-col flex-grow pt-10  bg-[url(/storeFront.png)] bg-no-repeat bg-contain bg-center bg-red-500 origin-center">
                <div className="relative px-5  bottom-0 space-y-2 -skew-y-12">

                    <div className="relative flex flex-col justify-center lg:text-sm 2xl:text-md items-center md:-left-20 lg:-left-52 sm:-left:20 2xl:-left-96  space-x-2 backdrop-blur-lg text-white bg-red-600 bg-opacity-40">
                        <p className="my-2 font-medium">Connected Address:</p>
                        <Address address={connectedAddress} />
                    </div>


                </div>


                <Link href="/Farms" onClick={() => sound.play()} className=" bg-[url(/doorSign.png)] bg-contain bg-no-repeat animate-bounce fixed border-e-gray-200 top-1/2 left-1/2 2xl:h-[75px] 2xl:w-[75px] lg:h-[50px] lg:w-[50px] -ml-44 p-0.5 2xl:p-3 2xl:left-1/3 2xl:ml-20 backdrop-blur-sm text-white  ">
                </Link>
            </div>
        </>
    );
};

export default Home;
