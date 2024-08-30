import { dbconnect } from "@/utils/dbconnect";
import User from "@/models/User";
import { NextResponse } from "next/server";


dbconnect();

export async function POST(req) {
    try {
        const body=await req.json();
        const {token}=body;
        console.log("token:",token);
        const checkUser = await User.findOne({ verifyToken: token });
        if (!checkUser) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        else {
            console.log("checkUser:",checkUser);
            checkUser.isVerified = true;
            checkUser.verifyToken = undefined;
            await checkUser.save();
            return NextResponse.json({ message: "User verified successfully" }, { status: 200 });
        }
    } catch (error) {
        console.log("error in verify/route.js: ",error);
        return NextResponse.json({ error: "Something went wrong in verify/route.js" }, { status: 500 });
    }
}