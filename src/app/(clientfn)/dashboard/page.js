"use client"
import Dashboard from '@/components/Dashboard'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const getUserDetails = async () =>{
    try {
      const res = await axios.post("/api/users/dashboard");
      console.log("res: ",res);
      setUserData(res.data.user);
    } catch (error) {
      console.log("Error in getuserdetails: ",error);
    }
  }

  useEffect(() => {
    setUserData(null);
    getUserDetails();
  }, []);
  if (!userData) return <div>Loading...</div>;  

  return (
    <div>
      <Dashboard
        name={userData.name}
        image={userData.image}
        email={userData.email}
      />
    </div>
  );
};

export default Profile;
