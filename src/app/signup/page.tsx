"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import axios from "@/api/axios";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signupSchema = z.object({
    username: z.string().min(1, "Name is required"),
    dob: z.string(),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message:
          "Password must contain at least one uppercase, one lowercase, and one digit.",
      }),
  });

  const otpSchema = z.object({
    otp: z.string().min(6, "OTP must be 6 digits long"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (step === 1) {
        const payload = {
          username: formData.username,
          dob: formData.dob,
          email: formData.email,
          password: formData.password,
        };
        const parsedData = signupSchema.parse(payload);
        await axios.post("/auth/signup", parsedData);
        setStep(2);
        setErrorMessage("");
        setOtpMessage("Enter the OTP sent to your email (valid for 10 mins).")
        toast.success("OTP sent to mail.", { position: "top-right" });
      } else if (step === 2) {
        otpSchema.parse({ otp: formData.otp });
        const response = await axios.post("/auth/verify-otp", {
          email: formData.email,
          otp: formData.otp,
        });

        if (response.status !== 200) {
          setErrorMessage(response.data.message || "Invalid OTP.");
          return;
        }
        localStorage.setItem("token", response.data.token);
        setOtpMessage("");
        toast.success("Sign Up Successful!", { position: "top-right" });
        router.push("/notes");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors[0].message);
      } else {
        console.error("Signup error:", error);
        setErrorMessage(error.response.data.message || "An error occurred during signup. Please try again.");
        toast.error("Sign Up Failed!", { position: "top-right" });
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Section  */}
      <div className="flex-[2] flex items-center justify-center">
        {/* Sign up Form  */}
        <div>
          {/* Header  */}
          <div className="flex gap-2 max-lg:justify-center">
            <img src="/HD.svg" alt="HD icon" className="w-8" />
            <p className="text-2xl font-semibold">HD</p>
          </div>
          {/* Form  */}
          <div className="flex flex-col gap-2">
            <div className="my-8 flex flex-col gap-1 max-lg:text-center">
              <h1 className="text-3xl font-semibold">Sign up</h1>
              <p className="text-sm font-light">
                Sign up to enjoy the feature of HD.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-[320px] flex flex-col gap-3.5"
            >
              {step === 1 && (
                <>
                  <div className="relative">
                    <input
                      type="text"
                      id="your_name"
                      className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="your_name"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Your Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      id="dob"
                      className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="dob"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Date of Birth
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Password
                    </label>
                  </div>
                </>
              )}
              {step === 2 && (
                <div className="relative">
                  <input
                    type="text"
                    id="OTP"
                    className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="OTP"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    OTP
                  </label>
                </div>
              )}
              {errorMessage && <p className="flex justify-center text-sm text-red-500">{errorMessage}</p>}
              {otpMessage && <p className="flex justify-center text-sm text-blue-500">{otpMessage}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg active:scale-95"
              >
                {step === 1 ? "Sign up" : "Verify OTP"}
              </button>
            </form>
            <div className="relative my-6">
              <hr />
              <span className="absolute -top-3 bg-white px-2 text-gray-400 font-light left-1/2 -translate-x-1/2">
                or
              </span>
            </div>
            <div>
              <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-800 flex justify-center items-center gap-2 active:scale-95">
                <span className="font-semibold">Continue with Google</span>{" "}
                <span>
                  <FcGoogle size={20} />
                </span>
              </button>
            </div>
          </div>
          {/* Redirects  */}
          <div className="flex justify-center mt-6">
            <p className="text-sm font-light">
              Already have an account?{" "}
              <span
                className="text-blue-600 font-semibold underline underline-offset-2 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section  */}
      <div className="flex-[3] bg-[#232323] max-lg:hidden">
        <img
          src="https://blogs.windows.com/wp-content/uploads/prod/sites/2/2021/10/Windows-11-Bloom-Screensaver-Dark-scaled.jpg"
          alt="Blossom Background"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default page;
