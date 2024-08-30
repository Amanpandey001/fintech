"use client";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
    const [passVisible, setPassVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userVerified, setUserVerified] = useState(false);
    const router = useRouter();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password) => {
        return String(password)
            .toLowerCase()
            .match(/^.{8,}$/);
    };

    const validateForm = (email, password) => {
        if (!validateEmail(email)) {
            setErrorMessage("Invalid email address");
            return false;
        }

        if (!validatePassword(password)) {
            setErrorMessage("Password must be at least 8 characters long.");
            return false;
        }

        setErrorMessage(null); // Clear error message if validation passes
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const { email, password } = e.target.elements;

        if (!validateForm(email.value, password.value)) {
            return; // Stop if validation fails
        }

        try {
            setLoading(true);
            const res = await axios.post("/api/users/login", {
                email: email.value,
                password: password.value,
            });
            console.log(res);
            if (res.status === 200) {
                setUserVerified(true);
                setLoading(false);
                router.push("/dashboard"); // Redirect to dashboard after successful login
            }
        } catch (error) {
            console.error("error in login.js: ", error);
            setErrorMessage("Login failed. Please check your credentials and try again.");
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center h-screen justify-center">
            {loading && <div className="loader"></div>}
            <div className="sm:w-[60%] w-full min-h-[60%] mx-auto p-4 bg-slate-300 bg-opacity-70 shadow-xl shadow-black rounded-xl">
                <h1 className="text-3xl font-bold text-center underline my-4">Login</h1>
                {!userVerified && <p className="text-center text-red-700 my-3">Please Check Your Email</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:w-[60%] mx-auto">
                    <input
                        type="email"
                        className="px-4 py-4 rounded-lg text-white placeholder:font-bold font-bold bg-black bg-opacity-45"
                        placeholder="Email"
                        name="email"
                        id="email"
                        disabled={loading} // Disable the input when loading
                    />
                    <div className="relative">
                        <input
                            type={passVisible ? "text" : "password"}
                            className="px-4 py-4 rounded-lg text-white w-full placeholder:font-bold font-bold bg-black bg-opacity-45"
                            placeholder="Password"
                            name="password"
                            id="password"
                            disabled={loading} // Disable the input when loading
                        />
                        <span
                            className="absolute text-white top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                            onClick={() => setPassVisible(!passVisible)}
                        >
                            {passVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </span>
                    </div>
                    {errorMessage && (
                        <p className="text-red-600 font-bold">*{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-4 rounded-lg text-white text-xl font-bold bg-teal-600"
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                <p className="text-center my-2 font-bold">
                    Don't have an account?{" "}
                    <a href="/signup" className="hover:underline hover:text-blue-900">
                        Sign Up
                    </a>
                </p>
                <h2 className="text-center text-2xl font-bold my-3">OR</h2>
                <div className="flex flex-col gap-4 sm:w-[60%] mx-auto mb-5">
                    <button
                        className="px-4 w-full py-4 rounded-lg text-white text-xl font-bold flex items-center justify-center gap-4 bg-teal-600"
                        disabled={loading} // Disable the button when loading
                    >
                        <FcGoogle size={30} />
                        Sign Up with Google
                    </button>
                    <button
                        className="px-4 py-4 w-full rounded-lg text-white flex items-center justify-center gap-4 text-xl font-bold bg-teal-600"
                        disabled={loading} // Disable the button when loading
                    >
                        <BsGithub size={30} />
                        Sign Up with Github
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
