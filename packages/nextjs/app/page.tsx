"use client";

import Link from "next/link";
import { Howl } from "howler";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
    const sound = new Howl({
        src: ["bell.mp3"],
    });

    const { address: connectedAddress } = useAccount();


    return (
        <>
            <div className="flex transform 
                items-center flex-col flex-grow pt-10  bg-[url(/storeFront.png)] bg-no-repeat bg-contain bg-center bg-red-500 origin-center">
                <div className="absolute px-5  bottom-0 space-y-2 -skew-y-12">

                    <div className="relative flex flex-col justify-center lg:text-sm 2xl:text-md items-center sm:scale-75 sm:-left-44 sm:-top-28 md:-left-32 md:-top-32 lg:-left-40 2xl:-left-72 2xl:-top-96 2xl:scale-150 space-x-2 backdrop-blur-lg text-white bg-red-600 bg-opacity-40 -left-36 top-0 scale-75 mb-80 p-2 sm:mb-72 ">
                        <p className="my-2 font-medium">Connected Address:</p>
                        <Address address={connectedAddress} />
                    </div>


                </div>


                <Link href="/farms" onClick={() => sound.play()} className=" bg-[url(/doorSign.png)] bg-contain bg-no-repeat animate-bounce fixed border-e-gray-200 top-1/2 left-1/2 2xl:h-[75px] 2xl:w-[75px] lg:h-[50px] lg:w-[50px] sm:h-[50px] sm:w-[50px] md:w-[50px] h-[25px] w-[25px] sm:-ml-36 -ml-28 p-0.5 2xl:p-3 2xl:left-1/3 2xl:ml-20 md:-ml-46 backdrop-blur-sm text-white  ">
                </Link>
            </div>
        </>
    );
};

export default Home;
