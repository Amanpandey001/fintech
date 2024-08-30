import jwt from "jsonwebtoken";

export const getDataFromToken = (req) => {
    try {
        const token = req.cookies.get("access_token")?.value || "";
        console.log("token:", token);
        if (!token) {
            throw new Error("Token not found");
        }
        
        const decodedToken = jwt.verify(token, "test");
        console.log("decodedToken:", decodedToken.id);
        return decodedToken.id;
    } catch (error) {
        console.error("An error occurred in getDataFromToken:", error.message);
        return null; // Or throw an error, depending on how you want to handle it
    }
}
