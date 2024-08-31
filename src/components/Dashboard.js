import Profileoptions from "./Profileoptions";

const Dashboard = ({ name, image, email }) => {
  return (
    <div className=" bg-slate-200 rounded-md p-5">
      <h1 className="text-center text-2xl  my-2 font-semibold">{name}'s Dashboard</h1>
      <div className="flex  mt-5  justify-between items-center">
        <h2 className=" text-2xl w-[40%] text-end ">Profile Options</h2>
        <div className=" flex gap-3 items-center mx-5">
          <div className="flex flex-col items-end leading-3 ">
            <h1 className="text-xl font-semibold">{name}</h1>
            <p className="text-gray-700">{email}</p>
          </div>
          {image && <span><img src={image} alt={name} title={name} className="w-14 h-14 border p-1 bg-gray-600 border-black rounded-full" /></span>}
        </div>
      </div>
      <div className="profileoptions">
        <Profileoptions />
      </div>
    </div>
  );
};

export default Dashboard;
