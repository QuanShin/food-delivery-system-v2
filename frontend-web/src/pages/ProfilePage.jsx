import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/authApi";

function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("No token found. Please login first.");
        return;
      }

      try {
        const data = await getCurrentUser(token);
        setUserInfo(data);
      } catch (error) {
        setMessage("Failed to load profile.");
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>My Profile</h2>

      {message && <p>{message}</p>}

      {userInfo && (
        <div>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Authorities:</strong> {JSON.stringify(userInfo.authorities)}</p>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;