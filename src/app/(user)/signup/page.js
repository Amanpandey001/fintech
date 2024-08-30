"use client";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
    const [passvisible, setPassVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
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
            .match(
                /^.{8,}$/
            );
    };

    const validateUsername = (username) => {
        return String(username)
            .toLowerCase()
            .match(/^[a-zA-Z0-9_]+$/);
    };

    const validateForm = (name, email, password) => {
        if (!validateEmail(email)) {
            setErrorMessage("Invalid email address");
            return false;
        }

        if (!validatePassword(password)) {
            setErrorMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            return false;
        }

        if (!validateUsername(name)) {
            setErrorMessage("Username must only contain alphanumeric characters and underscores");
            return false;
        }

        setErrorMessage(null); // Clear error message if validation passes
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const { name, email, password } = e.target.elements;


        if (!validateForm(name.value, email.value, password.value)) {
            return; // Stop if validation fails
        }

        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", {
                name: name.value,
                email: email.value,
                password: password.value
            });
            console.log(res);
            router.push("/login");
            setLoading(false);
            e.target.reset(); // Clear form on successful submission
        } catch (error) {
            setErrorMessage("Username Not Available or User Already Exists");
            console.error(error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center h-screen justify-center">
            {loading && <div class="loader"></div>}
            <div className="sm:w-[60%] w-full min-h-[60%] mx-auto p-4 bg-slate-300 bg-opacity-70 shadow-xl shadow-black rounded-xl">
                <h1 className="text-3xl font-bold text-center underline my-4">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:w-[60%] mx-auto">
                    <input
                        type="text"
                        className="px-4 py-4 rounded-lg text-white placeholder:font-bold font-bold bg-black bg-opacity-45"
                        placeholder="Username"
                        name="name"
                        id="name"
                    />
                    <input
                        type="email"
                        className="px-4 py-4 rounded-lg text-white placeholder:font-bold font-bold bg-black bg-opacity-45"
                        placeholder="Email"
                        name="email"
                        id="email"
                    />
                    <div className="relative">
                        <input
                            type={passvisible ? "text" : "password"}
                            className="px-4 py-4 rounded-lg text-white w-full placeholder:font-bold font-bold bg-black bg-opacity-45"
                            placeholder="Password"
                            name="password"
                            id="password"
                        />
                        <span
                            className="absolute text-white top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                            onClick={() => setPassVisible(!passvisible)}
                        >
                            {passvisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </span>
                    </div>
                    {errorMessage && (
                        <p className="text-red-600 font-bold">*{errorMessage}</p>
                    )}
                    <button type="submit" className="px-4 py-4 rounded-lg text-white text-xl font-bold bg-teal-600">
                        Sign Up
                    </button>
                </form>
                <p className="text-center my-2 font-bold">
                    Already have an account?{" "}
                    <a href="/login" className="hover:underline hover:text-blue-900">
                        Login
                    </a>
                </p>
                <h2 className="text-center text-2xl font-bold my-3">OR</h2>
                <div className="flex flex-col gap-4 sm:w-[60%] mx-auto mb-5">
                    <button className="px-4 w-full py-4 rounded-lg text-white text-xl font-bold flex items-center justify-center gap-4 bg-teal-600">
                        <FcGoogle size={30} />
                        Sign Up with Google
                    </button>
                    <button className="px-4 py-4 w-full rounded-lg text-white flex items-center justify-center gap-4 text-xl font-bold bg-teal-600">
                        <BsGithub size={30} />
                        Sign Up with Github
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
