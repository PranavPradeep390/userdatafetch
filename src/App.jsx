import React, { useState, useEffect } from "react";
import "./App.css";

const UserAddress = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(1);
  const [bgColor, setBgColor] = useState("#FFFFFF"); // Initial background color

  const fetchUser = async () => {
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    const data = await response.json();
    setUser(data);
  };

  const handleRefresh = () => {
    const newUserId = Math.floor(Math.random() * 10) + 1;
    setUserId(newUserId);
    fetchUser();
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16); 
    setBgColor(randomColor);
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <>
      <div className="user-address text-center" style={{ backgroundColor: bgColor }}>
        <div className="imagediv">
          <img src={user && user.image} alt="" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
        </div>
        <h3>
          {user && user.firstName} {user && user.lastName} <br />
        </h3>
        <span> Gender: {user && user.gender}</span>

        {user && (
          <>
            {/* <p> Street Name :{user.address.street}</p> */}
            <p> City Name: {user.address.city}</p>
            <p> Address: {user.address.address}</p>
            <p> Postal Code: {user.address.postalCode}</p>
            <p> Phone No: {user.phone}</p>
          </>
        )}
        <button id="btn" onClick={handleRefresh}>Get User Data</button>
      </div>
    </>
  );
};

export default UserAddress;
