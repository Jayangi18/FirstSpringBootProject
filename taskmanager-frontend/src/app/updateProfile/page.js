'use client';
import { useEffect, useState } from "react";
import { getProfile, updateUser } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function UpdateProfilePage() {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [profileId, setProfileId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfileId(data.id);
      setFormData({ username: data.username, email: data.email });
    } catch (err) {
      console.error("Failed to load profile:", err);
      alert("Session expired or unauthorized. Please login again.");
      router.push("/login");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateUser(profileId, formData);

      // Save new token if backend sends it
      if (updatedData.token) {
        localStorage.setItem("token", updatedData.token);
      }

      alert("Profile updated successfully!");
      router.push("/profile"); // navigate back to Profile
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Update Profile</h1>
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block mb-2 text-black font-medium">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-black font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
