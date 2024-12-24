import React from "react";
import "./profilePage.css";

const ProfilePage = () => {
  const user = {
    username: "John Doe",
    avatar: "https://via.placeholder.com/100",
    coverImage: "https://via.placeholder.com/300x150",
  };

  return (
    <div className="profile-page">
      <div className="cover-image">
        <img src={user.coverImage} alt="User Cover" />
      </div>
      <div className="profile-info">
        <img className="avatar" src={user.avatar} alt="User Avatar" />
        <h2>{user.username}</h2>
      </div>
    </div>
  );
};

export default ProfilePage;
