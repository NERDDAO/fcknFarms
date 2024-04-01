
"use client";
import type { NextPage } from "next";
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const Farms: NextPage = () => {

    return (
        <div className="absolute align-center left-1/4 -ml-24 h-[100%] w-[100%] bg-[url(/fcknBg.png)] bg-no-repeat bg-contain">
            <Tippy content={<span>View $FCKN Staking</span>}>
                <div className="bg-[url(/chicken.png)] bg-contain bg-no-repeat relative h-1/2 w-1/4 top-1/3 -mt-12 left-64 cursor-pointer transform origin-bottom hover:scale-110" /></Tippy>
            <Tippy content={<span>View $FCKN Liquidity Farms</span>}>
                <div className="bg-[url(/liquidity.png)] bg-contain bg-no-repeat relative h-2/3 w-1/4 -top-12 -mt-12 left-1/3 -ml-24 cursor-pointer transform origin-bottom-left hover:scale-110" />
            </Tippy>
            <a className="btn bg-transparent backdrop-blur-md relative -ml-20  -right-1/2 " href="https://app.uniswap.org/swap?outputcurrency=0x7d12aeb5d96d221071d176980d23c213d88d9998&chain=base" target="_blank">buy $FCKN </a>
            <a className="btn bg-transparent backdrop-blur-md relative ml-20  -right-1/2 " href="https://app.uniswap.org/add/v2/ETH/0x7D12aEb5d96d221071d176980D23c213d88d9998" target="_blank">Add $FCKN Liquidity</a>
        </div>
    )
};

export default Farms;
