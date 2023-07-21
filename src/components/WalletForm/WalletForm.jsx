import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { startPayment } from "../../service/walletOperations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WalletForm() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [send, setSend] = useState(false);

  const handlerOnChahge = (e) => {
    switch (e.target.name) {
      case "address":
        console.log(e.target.name);
        setAddress(e.target.value);
        break;
      case "amount":
        setAmount(e.target.value);
        console.log(e.target.name);
        break;
      default:
        break;
    }
  };
  const notify = () =>
    toast("Invalid Ethereum wallet address format !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyAmoun = () =>
    toast("sum must be more then 0 ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSend(true);
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!address.match(addressRegex)) {
      notify();
      setSend(false);
      return;
    }
    if (amount <= 0) {
      notifyAmoun();
      setSend(false);
      return;
    }

    await startPayment(amount, address);
    setSend(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-screen-l mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg  rounded-lg bg-red-700">
          <h1 className="p-5 text-center text-2xl font-bold text-white sm:text-3xl">
            Get Send
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-white">
            Enter the recipient address and the amount of tokens you want to
            transfer.
          </p>

          <form
            action=""
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <div>
              <label htmlFor="address" className="sr-only">
                address
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={handlerOnChahge}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter wallet address"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
              </div>
            </div>

            <div>
              <label htmlFor="number" className="sr-only">
                Number
              </label>

              <div className="relative">
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={handlerOnChahge}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="0.00"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
              </div>
            </div>
            {!send ? (
              <button
                type="submit"
                className="block w-full rounded-lg bg-red-900 px-5 py-3 text-lg font-medium text-white hover:bg-yellow-400"
              >
                Transfer
              </button>
            ) : (
              <button
                type="submit"
                className="block w-full rounded-lg bg-red-900 px-5 py-3 text-lg font-medium text-white hover:bg-yellow-400"
              >
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#e2b80f"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{ justifyContent: "center" }}
                  wrapperClassName=""
                  visible={true}
                />
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
