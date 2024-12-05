import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className='p-6 overflow-auto'>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { 
              user: "John Doe", 
              action: "Purchased Premium Plan", 
              time: "2 minutes ago" 
            },
            { 
              user: "Jane Smith", 
              action: "Updated Profile", 
              time: "1 hour ago" 
            },
            { 
              user: "Mike Johnson", 
              action: "Submitted Support Ticket", 
              time: "3 hours ago" 
            }
          ].map((activity, index) => (
            <div key={index} className="flex justify-between border-b pb-2 last:border-b-0">
              <div>
                <p className="font-medium">{activity.user}</p>
                <p className="text-gray-500 text-sm">{activity.action}</p>
              </div>
              <span className="text-gray-500 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;