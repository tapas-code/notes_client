"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const page = () => {
  const router = useRouter();
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
            <form className="min-w-[320px] flex flex-col gap-3.5">
              <div className="relative">
                <input
                  type="text"
                  id="your_name"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
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
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="OTP"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="OTP"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  OTP
                </label>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:scale-95">
                Sign up
              </button>
            </form>
            <div className="relative my-6">
              <hr />
              <span className="absolute -top-3 bg-white px-2 text-gray-400 font-light left-1/2 -translate-x-1/2">
                or
              </span>
            </div>
            <div>
              <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-800 flex justify-center items-center gap-2 hover:scale-95">
                <span className="font-semibold">Continue with Google</span> <span><FcGoogle size={20}/></span>
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
