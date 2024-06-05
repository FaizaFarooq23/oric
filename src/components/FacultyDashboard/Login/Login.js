import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Login({ adminLogin, facultyLogin, setAdminLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState({ show: false, message: "" });
  const router = useRouter();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setLoading({ show: true, message: "Logging in..." });
    if (username === "" || password === "") {
      setLoading({ show: false, message: "" });
      alert("Please fill all the fields");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
    });
   // console.log(res);

    if (res.status === 200) {
      setLoading({ show: false, message: "" });
      router.push("/dashboard");
    }
    if (res.status === 401) {
      setLoading({ show: false, message: "" });
      alert(res.error);
    }


  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between  ">
      <div className=" flex flex-col items-center ">
        <div className="flex justify-between items-center px-12 ">
          <div className="flex justify-center ">
            <img src="images/white-logo.png" alt="logo" className="h-24 " />
          </div>
        </div>
        <div
       // style={{ backgroundImage: `url("images/")` }}
          className=" w-screen pt-[2%] gap-x-16 border-t flex justify-between items-center pl-40 pr-20 "
        >
                 
          <div className=" flex flex-col gap-y-6 w-[40%] py-10  ">
            <div className="text-3xl font-bold text-white ">
              Sign In
            </div>
            <form className="flex flex-col justify-between gap-y-4">
              <div className=" ">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  required
                  className="w-full  appearance-none rounded-none bg-transparent
                 border-b-2 border-gray-300 px-3  py-2 text-white placeholder-gray-500 focus:z-10 focus:border-mustard-yellow  focus:ring-slate-100  focus:outline-none  sm:text-sm"
                />
              </div>
              <div className="">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  id="password"
                  name="password"
                  type="Password"
                  autoComplete="off"
                  required
                  className="w-full px-3 appearance-none rounded-none bg-transparent
                  border-b-2 border-gray-300   py-2 text-white placeholder-gray-500 focus:z-10 focus:border-mustard-yellow  focus:ring-slate-100  focus:outline-none  sm:text-sm"
                />
                  <div className=" flex justify-end py-2">
              <a href="/reset-password" className="hover:text-mustard-yellow text-white">
                <span>Forgotten your username or password? </span>
              </a>
            </div>

              </div>
              
              <div className="">
                <button
                  onClick={handleLogin}
                  type="button"
                  className=" flex w-full justify-center border border-transparent
               bg-mustard-yellow py-2 px-4 text-sm font-medium text-blue-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login
                </button>
                
              </div>
              {!adminLogin && (
              <div className="flex justify-end cursor-pointer">
                <Link href={"/register"}>
                  <button
                    className="text-white hover:text-mustard-yellow"
                  >
                    Register Faculty
                  </button>
                </Link>
              </div>
            )}
            </form>
          </div>
       

          <div className="w-[40%]">
            <div className="flex justify-end">
          <img src="images/illustration.png" alt="man" className="h-96 pt-16 " />
          </div>

           
          </div>
        </div>
      </div>
  
    </div>
  );
}
