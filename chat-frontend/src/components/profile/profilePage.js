import React, { useState } from "react";
import ProfileForm from "./profileForm";
import "./profilePage.css";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/100",
    coverImage: "https://via.placeholder.com/300x150",
  });

  const handleSave = (updatedProfile) => {
    setUser({
      ...user,
      username: updatedProfile.name,
      email: updatedProfile.email,
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="cover-image">
        <img src={user.coverImage} alt="User Cover" />
      </div>
      {isEditing ? (
        <ProfileForm onSave={handleSave} />
      ) : (
        <div className="profile-info">
          <img className="avatar" src={user.avatar} alt="User Avatar" />
          <h2>{user.username}</h2>
          <p>{user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
