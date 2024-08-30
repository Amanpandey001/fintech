"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
const verify = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      const res = await axios.post("/api/users/verify", {
        token,
      });
      if (res.status === 200) {
        setVerified(true);
        setError(false);
        router.push("/login");
      }
    } catch (error) {
      setError(true);
      console.log("error occured while verifying email", error);
    }
  }

  useEffect(() => {
    const userToken = window.location.search.split("=")[1];
    setToken(userToken || "");
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token])
  return (
    <div>
      <div className="bg-slate-200 sm:w-[70%] mx-auto p-4 my-[20vh]">
        <h1 className="text-3xl text-center font-bold">Verify Email</h1>
        <h2 className="text-center my-3 text-xl font-semibold">
          {verified ? <div>Email Verified Successfully <Link href="/login" className="text-blue-500 underline">Login</Link></div> : "Email Verification Failed"}
        </h2>
      </div>
    </div>
  )
}

export default verify
