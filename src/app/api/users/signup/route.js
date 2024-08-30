import { dbconnect } from "@/utils/dbconnect";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
export async function POST( request ) {
    try {
        await dbconnect();
        const body = await request.json();
        const { name, email, password } = body;
        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcryptjs.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        const mailResponse = await sendEmail({ email, userId: newUser._id });
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}