import React from 'react';

const Dashboard = ({ name, image, email }) => {
  return (
    <div>
      <h1>{name}</h1>
      {image && <img src={image} alt={`${name}'s profile`} />}
      <p>{email}</p>
    </div>
  );
};

export default Dashboard;
