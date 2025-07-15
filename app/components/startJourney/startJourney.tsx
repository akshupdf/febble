'use client';
import React, { useState } from "react";
import OtpVerify from "../otp/otpVerify";
import { useNavigate } from "react-router-dom";
import bg from '../../assets/fs2.svg'
import fl from '../../assets/logo.svg'
import star from '../../assets/star.svg'

export default function StartJourney(props: any) {
  const [mobile, setMobile] = useState(() => localStorage.getItem("userMobile") || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verLoad, setVerLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleBlur = () => {
    localStorage.setItem("userMobile", mobile);
  };


  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!mobile.trim()) {
      setErrorMsg("Phone number cannot be empty.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://reg-backend-staging.fabelle-hamper.vtour.tech/user/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNo: mobile }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setLoading(false);
      } else {
        setErrorMsg(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");

    if (!otp || otp.length !== 4) {
      setOtpError("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      setVerLoad(true);
      const response = await fetch(
        "https://reg-backend-staging.fabelle-hamper.vtour.tech/user/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNo: mobile,
            otp: otp,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.data);
        setVerLoad(true);
      } else {
        setOtpError(data.message || "Invalid OTP.");
      }

      props.handleNext();
    } catch (error) {
      setOtpError("Something went wrong during verification.");
    } finally {
      setVerLoad(false);
    }
  };


  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4 py-8">

      <div className="w-full  z-10  mx-auto mt-[10%] h-[72vh]">

        <div className="text-center animate-fade-in">
          <div className="golden-text w-60 text-wrap mx-auto">
            SHE'S ALWAYS
          </div>
          <div className="golden-text w-60 text-wrap mx-auto">
            KNOWN YOUR SWEET SIDE.
          </div>
          <img
            src={star}
            alt="star"
            className="w-3 h-3 mb-2 mx-auto mt-2"
          />
          <div className="golden-text w-60 text-wrap mx-auto">
            NOW SHOW HER
          </div>
          <div className="golden-text w-60 text-wrap mx-auto">
            SHE'S WORTH THE ONE.
          </div>

          <div className="max-w-60 text-center text-white mx-auto mt-4">
            <p>This Rakshi, skip the cliches. Let our Master Chocolatiers craft a chocolate box as unique as your bond.</p>
          </div>
          {!otpSent ? (
            <div>
              <div className=" gap-3 flex flex-col">
                <input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="10-digit mobile number"
                  className="w-fit mx-auto shiny-button p-2 px-8 mt-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-center"
                />
                <button
                  type="submit"
                  className="w-32 otp-shiny-button  mx-auto text-center text-sm cursor-pointer "
                  onClick={handleSendOtp}
                >
                  <p className="">   {loading ? "Sending..." : "SEND OTP"} </p>
                </button>
              </div>
              {errorMsg && (
                <p className="text-red-400 mb-2 text-sm mx-auto">
                  {errorMsg}
                </p>
              )}
            </div>
          ) : <div>
            <div className=" gap-3">
              <input
                id="mobile"
                type="tel"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-fit mx-auto shiny-button p-2 px-6 mt-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-center"
              />
              <button
                type="submit"
                className="otp-shiny-button  mx-auto text-center selected font-bold py-3 px-6  mt-2 cursor-pointer"
                onClick={handleVerifyOtp}
              >
                {!verLoad ? "VERIFY & BEGIN" : "Loading..."}
              </button>
            </div>
            {/* {errorMsg && (
                <p className="text-red-400 mb-2 text-sm text-left">
                  {errorMsg}
                </p>
              )} */}
          </div>}
        </div>

      </div>

    </div>
  );
}
