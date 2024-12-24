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
      <label>Name</label>
      <input name="name" value={profile.name} onChange={handleChange} />
      <label>Email</label>
      <input name="email" value={profile.email} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
