'use client';
import { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../../../lib/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ username: user.username, email: user.email });
  };

  const handleUpdate = async (id) => {
    if (confirm("Are you sure you want to update this user?")) {
      await updateUser(id, formData);
      setEditingUser(null);
      fetchUsers();
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage registered users</p>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold text-gray-800">User List</h2>
            <p className="text-gray-600 text-sm mt-1">
              {users.length} user{users.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUser === user.id ? (
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          className="p-2 border rounded text-black"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingUser === user.id ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="p-2 border rounded text-black"
                        />
                      ) : (
                        <div className="text-sm text-gray-600">{user.email}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {editingUser === user.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(user.id)}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <div className="text-gray-500 text-lg">No users found.</div>
                      <div className="text-gray-400 text-sm mt-1">Users will appear once registered.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
