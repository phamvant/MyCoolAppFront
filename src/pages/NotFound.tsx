import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        
        <div className="mt-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-150"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-150"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
