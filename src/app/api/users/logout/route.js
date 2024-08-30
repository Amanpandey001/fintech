import { dbconnect } from "@/utils/dbconnect";
import { NextResponse } from "next/server";

dbconnect();

export async function POST(req) {
    try {
        // Create the response indicating successful logout
        const response = NextResponse.json({ message: "User logged out successfully" }, { status: 200 });
        
        // Set the access_token cookie to an empty string and expire it immediately
        response.cookies.set("access_token", "", {
            httpOnly: true,
            path: "/",  // Ensure this path matches where the cookie was originally set
            sameSite: "strict",
            expires: new Date(0)  // Expire the cookie immediately
        });
        
        console.log("User logged out successfully");
        return response;
    } catch (error) {
        console.error("Error in logout/route.js: ", error);
        return NextResponse.json({ error: "Something went wrong in logout/route.js" }, { status: 500 });
    }
}
