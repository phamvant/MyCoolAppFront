import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Edit2,
  Clock,
  Activity,
} from "lucide-react";

interface UserActivity {
  id: number;
  action: string;
  timestamp: string;
  details: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // This would typically come from an API
  const [user] = useState({
    id,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Developer",
    location: "New York, USA",
    joinDate: "Jan 2022",
    status: "Active",
    avatar: "JD",
  });

  const [recentActivity] = useState<UserActivity[]>([
    {
      id: 1,
      action: "Project Update",
      timestamp: "2 hours ago",
      details: "Updated the documentation for Project X",
    },
    {
      id: 2,
      action: "Task Completed",
      timestamp: "1 day ago",
      details: "Completed the implementation of new features",
    },
    {
      id: 3,
      action: "Meeting",
      timestamp: "2 days ago",
      details: "Attended the weekly team sync",
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-2xl font-semibold">
                {user.avatar}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.role}</p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/user/${id}/edit`)}
            className="flex items-center px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-150"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* User Information */}
        <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Projects</div>
              <div className="text-2xl font-semibold text-blue-600">12</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Completed Tasks</div>
              <div className="text-2xl font-semibold text-green-600">134</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600">Team Members</div>
              <div className="text-2xl font-semibold text-purple-600">8</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-3 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                <div className="bg-blue-100 rounded-full p-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{activity.action}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {activity.timestamp}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
