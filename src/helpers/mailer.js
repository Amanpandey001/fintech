import User from "@/models/User";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({email, userId}) => {
    try {
        const hashedtoken = await bcryptjs.hash(userId.toString(), 12);
        await User.findOneAndUpdate({email},{
            $set: {
                verifyToken: hashedtoken,
                isVerified: false
            }});
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "83abb4ecd91ea9",
              pass: "e9cb90fafd6701"
            }
          });
        
          const mailOptions = {
            from: "HACKATHONAMAN",
            to: email,
            subject: "Email Verification",
            html: `<h1>Click here to verify your email</h1>
            <p><a href="http://localhost:3000/verify?token=${hashedtoken}">click here</a></p>`
          }

         const info = await transport.sendMail(mailOptions);
         console.log("Message sent: %s", info.messageId);
         return info;
    } catch (error) {
        console.log("Error Occured in sendEmail:", error);
        return;
    }
}