import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect if token is missing
    } else {
      const fetchProfileData = async () => {
        try {
          // Corrected Authorization header using backticks
          const response = await axios.get('https://vynceianoani.helioho.st/cedeno/getProfile.php', {
            headers: {
              Authorization: `Bearer ${token}`, // Send token correctly
            },
          });
          setName(response.data.name); // Set name from response
          setAddress(response.data.address); // Set address from response
        } catch (error) {
          console.error('Error fetching profile data:', error);
          alert('Failed to fetch profile data. Please log in again.');
          navigate('/login'); // Redirect to login if error occurs
        }
      };
      fetchProfileData(); // Call the function to fetch data
    }
  }, [navigate]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault(); // Prevent form submission

    const token = localStorage.getItem('token'); // Get the token from local storage

    try {
      // Corrected Authorization header using backticks
      const response = await axios.put('https://vynceianoani.helioho.st/cedeno/updateProfile.php', {
        name, // Send name from state
        address, // Send address from state
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      });

      // Handle success response
      alert(response.data); // Display success message
    } catch (error) {
      console.error('Error updating profile:', error);
      // Fixed alert message with template literal
      alert(`Failed to update profile: ${error.response?.data || 'Unknown error occurred'}`); // Display error message
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
