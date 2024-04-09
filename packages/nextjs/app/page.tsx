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
      <div
        className="flex transform 
                items-center flex-col flex-grow pt-10  bg-[url(/storeFront.png)] bg-no-repeat bg-contain bg-center bg-red-500 origin-center"
      >
        <div className="relative px-5  bottom-0 space-y-2 -skew-y-12">
          <div className="relative flex flex-col justify-center lg:text-sm 2xl:text-md items-center md:-left-20 lg:-left-52 sm:-left:20 2xl:-left-96  space-x-2 backdrop-blur-lg text-white bg-red-600 bg-opacity-40">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>

        <Link
          href="/Farms"
          onClick={() => sound.play()}
          className="bg-[url(/doorSign.png)] bg-contain bg-no-repeat animate-bounce fixed border-e-gray-200 top-1/2 left-1/2 lg:left-1/3 lg:ml-20 2xl:left-1/3 2xl:ml-20 transform -translate-x-1/2 -translate-y-1/2 lg:-translate-x-0 lg:-translate-y-0 2xl:-translate-x-0 2xl:-translate-y-0 h-[50px] w-[50px] lg:h-[75px] lg:w-[75px] p-0.5 backdrop-blur-sm text-white"
        ></Link>
      </div>
    </>
  );
};

export default Home;
