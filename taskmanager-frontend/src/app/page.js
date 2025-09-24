// src/app/page.js
export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">

        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-7xl font-extrabold text-blue-800">
            Task Manager
          </h1>
          <p className="text-lg text-gray-700">
            Organize your tasks, manage your time, and boost your productivity
            with ease. Sign up today and get started with TaskManager Web!
          </p>
          <div className="space-x-4">
            <a
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </a>

          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="flex justify-center">
          <img
            src="/task.jpg"
            alt="Task management illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
