import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import { dbconnect } from "@/utils/dbconnect";
import { NextResponse } from "next/server";

dbconnect();
export async function POST(req) {
    try {
        const userId = await getDataFromToken(req);
        console.log("userId:", userId);
        const user = await User.findOne({userId}).select("-password");
        console.log("user:", user);
        return NextResponse.json({ message: "User fetched successfully" , user });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong in dashboard/route.js" }, { status: 500 });
    }
}