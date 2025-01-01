import React, { useState } from "react";

const ProfileForm = ({ onSave }) => {
  const [profile, setProfile] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
