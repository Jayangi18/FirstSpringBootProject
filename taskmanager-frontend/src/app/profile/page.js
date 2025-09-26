'use client';
import { useEffect, useState } from "react";
import { getProfile, deleteUser } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error("Failed to load profile:", err);
      alert("Session expired or unauthorized. Please login again.");
      router.push("/login");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser(profile.id);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert("Account deleted!");
        router.push("/login");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Delete failed!");
      }
    }
  };

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">My Profile</h1>

        <div className="space-y-3 text-black">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => router.push("/updateProfile")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Update Profile
          </button>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
