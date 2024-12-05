import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Request {
  id: number;
  sender: string;
  title: string;
  state: 'pending' | 'processing' | 'done';
  avatar: string;
  department: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastActivity: string;
}

const Requests: React.FC = () => {
  const [requests] = useState<Request[]>([
    {
      id: 1,
      sender: "John Doe",
      title: "Project Proposal Review",
      state: 'pending',
      avatar: "JD",
      department: "Engineering",
      priority: 'high',
      createdAt: "2024-03-15T10:30:00",
      lastActivity: "2 mins ago"
    },
    {
      id: 2,
      sender: "Jane Smith",
      title: "Meeting Reschedule Request",
      state: 'processing',
      avatar: "JS",
      department: "Marketing",
      priority: 'medium',
      createdAt: "2024-03-15T09:15:00",
      lastActivity: "30 mins ago"
    }
  ]);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | Request['state']>('all');

  const filteredRequests = requests.filter(request =>
    (filter === 'all' || request.state === filter) &&
    (request.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // const handleStateChange = (requestId: number, newState: Request['state']) => {
    // setRequests(requests.map(request =>
    //   request.id === requestId ? { ...request, state: newState } : request
    // ));
  // };

  const getStateColor = (state: Request['state']) => {
    switch (state) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'done': return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityColor = (priority: Request['priority']) => {
    switch (priority) {
      case 'low': return 'text-gray-600';
      case 'medium': return 'text-orange-600';
      case 'high': return 'text-red-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Requests</h1>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="border rounded-lg px-4 py-2 text-sm"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, title, or department..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="divide-y">
          {filteredRequests.map(request => (
            <div
              key={request.id}
              className="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              onClick={() => navigate(`/request/${request.id}`)}
            >
              <div className="flex items-center space-x-6">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-medium text-lg">{request.avatar}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className='flex flex-col space-y-2 w-60'>
                      <h4 className="text-base font-medium text-gray-900">{request.title}</h4>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium">{request.sender}</h3>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{request.department}</span>
                      </div>
                      <div className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority.toUpperCase()} PRIORITY
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`items-center px-3 py-1 rounded-full text-sm font-medium ${getStateColor(request.state)}`}>
                        {request.state}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Created: {formatDate(request.createdAt)}
                    </div>

                    <div className="flex-shrink-0">
                      <select
                        value={request.state}
                        onChange={(e) => {
                          e.stopPropagation();
                          // handleStateChange(request.id, e.target.value as Request['state']);
                        }}
                        className="text-sm border rounded-lg px-3 py-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;