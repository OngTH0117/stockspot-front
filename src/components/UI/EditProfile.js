import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = ({ userProfileData, onClose, updateUserProfile }) => {
  const [name, setName] = useState(userProfileData.name);
  const [contactNumber, setContactNumber] = useState(userProfileData.contactNumber);
  const [email, setEmail] = useState(userProfileData.email);
  const [address, setAddress] = useState(userProfileData.address);
  const [description, setDescription] = useState(userProfileData.description);


const handleSave = async () => {
  try {
    
    const updatedUserData = {
      name,
      contactNumber,
      email,
      address,
      description,
    };

    // Get the token from local storage 
    const token = localStorage.getItem("token");
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    await axios.put("http://127.0.0.1:8000/api/updateProfile", updatedUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      
      onClose();
  
      updateUserProfile(updatedUserData);
      window.location.reload(true)
    } catch (error) {
      
      console.log('Error updating user profile:', error);
    
    }
  };
  
    return (
       
      <div className="edit-profile-form" >
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input type="text" className="form-control" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="d-flex justify-content-between" style={{ marginTop: '20px' }}>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
   
    );
  };
  
  export default EditProfile;