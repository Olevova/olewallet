import { ethers } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = () =>
  toast("Please connect to MetaMask.", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const notifyErr = (err) =>
  toast(`${err}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const notifyInsufficientFunds = () => {
  toast("Your wallet has insufficient funds.", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const startPayment = async (amount, address) => {
  try {
    if (!window.ethereum) {
      notify();
    }

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = ethers.utils.getAddress(address);
    const balance = await provider.getBalance(signer.getAddress());
    console.log(balance, "balance");
    console.log(Number(amount));
    console.log(balance / 1000000000000000000);
    if (balance < Number(amount)) {
      console.log("errrrr");
      notifyInsufficientFunds();
      return;
    }
    console.log(58);
    const amountInString = parseFloat(amount).toFixed(2);
    const tx = {
      to: addr,
      value: ethers.utils.parseEther(amountInString),
    };
    console.log(tx);
    const signedTx = await signer.sendTransaction(tx);
    console.log(signedTx);
  } catch (err) {
    console.log(err.message);
    notifyErr(err.message);
  }
};

// export const startPayment = async (amount, address) => {
//   try {
//     if (!window.ethereum) {
//       notify();
//     }

//     const provider = new ethers.BrowserProvider(window.ethereum);
//     // const provider = new ethers.BrowserProvider(); // Use BrowserProvider
//     const signer = provider.getSigner();
//     console.log(provider, "provider", signer, "signer");
//     // If you need to ensure recipientAddress is a valid Ethereum address, use getAddress
//     const addr = ethers.getAddress(address);
//     // balance = await provider.getBalance(addr);
//     // console.log(addr, balance);

//     console.log(addr, amount);
//     const tx = {
//       to: addr,
//       value: ethers.utils.parseEther(amount.toString()), // Ensure amount is converted to a string
//     };
//     console.log(txArg);
//     const signedTx = await wallet.sendTransaction(tx);
//     console.log(signedTx);
//     console.log(amount, recipientAddress, 22);
//   } catch (err) {
//     notifyErr(err.message);
//   }
// };
