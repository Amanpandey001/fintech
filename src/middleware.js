import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("access_token")?.value || "";
    const { pathname } = req.nextUrl;

    // Define public pages
    const publicPages = ["/", "/login", "/signup"];

    // If the user is not logged in
    if (!token) {
        // If the user is trying to access a protected page, redirect to the login page
        if (!publicPages.includes(pathname)) {
            return NextResponse.redirect(new URL("/signup", req.url));
        }
    } else {
        // If the user is logged in and tries to access a public page, redirect to the home page
        if (publicPages.includes(pathname)) {
            return NextResponse.redirect(new URL("/home", req.url));
        }
       
    }

    // If none of the conditions match, let the request proceed as normal
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',        // Landing page
        '/login',   // Login page
        '/signup',  // Signup page
        '/home',    // Home page
        '/logout',
        '/dashboard',  // Logout page
        // Add other protected routes here
    ],
};
