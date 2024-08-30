import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className=" h-screen">
      </main>
      <div className="absolute top-0 left-0 w-full h-screen text-white p-4 ">
        <h1 className="font-bold text-center"><span className="text-4xl">FinTech</span><span>.com</span></h1>
        <div className=" sm:w-[70%] mx-auto my-10 sm:block hidden text-xl font-semibold leading-9">
          <h3 className="text-2xl font-semibold text-center my-2">About FinTech.com</h3>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          Welcome to FinTech.com, your gateway to smarter financial management. Our platform is designed to provide you with the tools and resources you need to take control of your finances, whether you're saving for the future, managing investments, or planning for major life events.

          At FinTech.com, we believe that financial services should be accessible, transparent, and tailored to your unique needs. We offer a range of solutions to help you navigate the complexities of personal finance with ease and confidence. Our innovative technology empowers you to make informed decisions, maximize your savings, and achieve your financial goals.

          Join us as we revolutionize the way you manage your money, providing you with the insights and support you need to secure a prosperous future.
        </div>
        <div className="sm:hidden m:w-[70%] mx-auto my-5 text-xl leading-tight text-center font-semibold">
          <h3 className="text-2xl font-semibold text-center my-2">About FinTech.com</h3>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Welcome to FinTech.com, your hub for smarter financial management. Our platform offers the tools you need to take control of your finances—whether saving, investing, or planning for the future.

          At FinTech.com, we believe financial services should be accessible, transparent, and personalized. Our innovative technology helps you make informed decisions, maximize savings, and achieve your goals.

          Join us in revolutionizing money management, empowering you to secure a prosperous future.

        </div>
        <div className="font-bold text-3xl text-center mt-5">Sign Up Now!</div>
        <div className="flex justify-center items-center my-2">
          <button><Link className="px-6 py-3 border flex rounded-md bg-gray-700 font-bold text-2xl hover:bg-gray-600" href="/signup">Sign Up</Link></button>
        </div>
      </div>
    </>
  );
}
