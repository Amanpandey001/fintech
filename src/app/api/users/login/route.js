import { dbconnect } from "@/utils/dbconnect";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbconnect();

export async function POST(req) {
    try {
        const body = await req.json();  // <-- Properly await the json() method
        const { email, password } = body;
        console.log("email:", email, "password:", password);

        const existingUser =  await User.findOne({ email });
        if (!existingUser) {
            console.log("User does not exist");
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            console.log("isPasswordCorrect:", isPasswordCorrect);
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, name: existingUser.name }, "test", { expiresIn: "1h" });
        console.log("token:", token);

        const response = NextResponse.json({ result: { email: existingUser.email } }, { status: 200 });
        console.log("email:", existingUser.email);
        console.log("response:", response);
        response.cookies.set("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            path: "/"
        });
        return response;
    } catch (error) {
        console.log("error in login/route.js: ", error);
        return NextResponse.json({ error: "Something went wrong in login/route.js" }, { status: 500 });
    }
}
