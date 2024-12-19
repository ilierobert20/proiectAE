import  { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-4">Profile</h1>
      {userData ? (
        <div>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>User ID:</strong> {userData._id}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
