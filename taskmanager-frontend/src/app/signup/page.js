'use client';
import { useState } from 'react';
import { signup } from '../../lib/api';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'USER'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signup(formData);
      console.log('Signup successful:', result);
      alert('Signup successful!');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed!');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}