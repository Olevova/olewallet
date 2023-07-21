import React from "react";
import { AiTwotoneApi } from "react-icons/ai";
import { useState } from "react";
import { ethers } from "ethers";

export default function Header() {
  const [userMask, setUserMask] = useState(null);
  const [balance, setBalance] = useState(null);

  const getBalance = async (account) => {
    try {
      if (!window.ethereum) {
        throw new Error("No crypto wallet found. Please install it.");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const addr = ethers.utils.getAddress(account);
      const balanceWei = await provider.getBalance(addr);
      const balanceEther = ethers.utils.formatEther(balanceWei);
      console.log(balanceEther);
      setBalance(parseFloat(balanceEther).toFixed(3));
    } catch (error) {
      console.error(error);
    }
  };

  const getAccount = async () => {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    const account = accounts[0];
    setUserMask(account);
    getBalance(account);
  };

  const truncateAddress = (address) => {
    if (address) {
      const start = address.substring(0, 5);
      const end = address.substring(address.length - 4);
      return `${start}...${end}`;
    }
    return null;
  };

  console.log(userMask, "mask");
  return (
    <div>
      <div className="font- flex h-[100px] w-full justify-center bg-red-800 px-10 py-3 text-zinc-50 ">
        <div className="flex h-full w-10/12 items-center justify-between">
          <span className="h-10 w-24 text-sm text-white sm:text-sm md:text-base lg:text-lg xl:text-xl">
            OLEVOVA
          </span>

          <div className="flex w-auto items-start justify-around rounded-xl bg-red-900 ">
            {!userMask ? (
              <button
                className="relative flex w-auto cursor-pointer items-start justify-start rounded-xl bg-red-900 px-3 py-3  hover:text-yellow-400"
                onClick={getAccount}
              >
                <AiTwotoneApi size={40} className="cursor-pointer" />
                <p className="my-auto flex flex-row text-xl uppercase leading-normal">
                  Connect Wallet
                </p>
              </button>
            ) : (
              <button className="relative flex w-auto cursor-pointer flex-row items-start justify-center rounded-xl bg-red-900 px-2 py-2 ">
                <p className="my-auto text-xs uppercase leading-normal sm:flex sm:flex-row sm:pr-4">
                  Wallet:{" "}
                  <span className="pl-3 text-yellow-400">
                    {truncateAddress(userMask)}
                  </span>
                </p>
                <p className="my-auto flex flex-row text-xs uppercase leading-normal">
                  balance:{" "}
                  <span className="pl-3 text-yellow-400">{balance}</span>
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// const getBalance = async (account) => {
//   try {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     console.log(provider);
//     const balanceWei = await provider.getBalance(account);
//     // const formattedBalance = ethers.utils.parseUnits(balanceWei.toString());
//     console.log(balanceWei);
//     setBalance(parseFloat(balanceWei).toFixed(3));
//   } catch (error) {
//     console.error(error);
//   }
// };
