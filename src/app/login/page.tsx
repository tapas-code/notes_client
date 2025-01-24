"use client";
import axios from "../../api/axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
    //   .min(8, "Password must be at least 8 characters long")
    //   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    //     message:
    //       "Password must contain at least one uppercase, one lowercase, and one digit.",
    //   }),
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedData = loginSchema.parse({ email, password });

      const response = await axios.post(
        "/auth/login",
        parsedData
      );

      // Store the token in local storage
      localStorage.setItem("token", response.data.token);
      toast.success('Login Successful!', {position: 'top-right'})
      setEmail("");
      setPassword("");

      // Redirect to the notes dashboard (or any other protected route)
      router.push("/notes");
    } catch (error: any) {
      if (error.response && (error.response.status === 404 || error.response.status === 400)) {
          setErrorMessage("Invalid credentials.");
          toast.error('Login Failed!', {position: 'top-right'})
      } else if (error instanceof z.ZodError) {
        setErrorMessage(error.errors[0].message);
      } else {
          console.error("Login error:", error);
          setErrorMessage("An error occurred during login.");
          toast.error('Login Failed!', {position: 'top-right'})
      }
    }
  };
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Section  */}
      <div className="flex-[2] flex items-center justify-center">
        {/* Sign in Form  */}
        <div>
          {/* Header  */}
          <div className="flex gap-2 max-lg:justify-center">
            <img src="/HD.svg" alt="HD icon" className="w-8" />
            <p className="text-2xl font-semibold">HD</p>
          </div>
          {/* Form  */}
          <div className="flex flex-col gap-2">
            <div className="my-8 flex flex-col gap-1 max-lg:text-center">
              <h1 className="text-3xl font-semibold">Sign In</h1>
              <p className="text-sm font-light">
                Please login to continue to your account.
              </p>
            </div>
            <form
              onSubmit={handleLogin}
              className="w-[320px] flex flex-col gap-3.5"
            >
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Password
                </label>
              </div>
              {errorMessage && <p className="flex justify-center text-sm text-red-500">{errorMessage}</p>}
              <p className="text-blue-600 font-semibold text-sm underline underline-offset-2 cursor-pointer">Forgot Password?</p>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="loggedIn" id="loggedIn" className="focus:outline-none border-2 border-black rounded-sm focus:ring-0" />
                <label htmlFor="loggedIn" className="text-sm cursor-pointer">Keep me logged in</label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg active:scale-95"
              >
                Sign In
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
              Need an account?{" "}
              <span
                className="text-blue-600 font-semibold underline underline-offset-2 cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Create one
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
