import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  Filter, 
  Plus, 
  Search,
  AlertCircle,
  Users,
  Building
} from 'lucide-react';

interface Department {
  id: number;
  name: string;
  description: string;
  head: string;
  employeeCount: number;
  status: 'Active' | 'Inactive';
}

interface DeleteDialogProps {
  isOpen: boolean;
  department: Department | null;
  onClose: () => void;
  onConfirm: () => void;
}

interface CreateEditDialogProps {
  isOpen: boolean;
  department?: Department;
  onClose: () => void;
  onSubmit: (data: Partial<Department>) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, department, onClose, onConfirm }) => {
  if (!isOpen || !department) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-3 text-red-600 mb-4">
          <AlertCircle className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Delete Department</h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete the department "{department.name}"? This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-150"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateEditDialog: React.FC<CreateEditDialogProps> = ({ isOpen, department, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: department?.name || '',
    description: department?.description || '',
    head: department?.head || '',
    status: department?.status || 'Active'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">
          {department ? 'Edit Department' : 'Create Department'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Head
            </label>
            <input
              type="text"
              name="head"
              value={formData.head}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-150"
            >
              {department ? 'Save Changes' : 'Create Department'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Departments: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; department: Department | null }>({
    isOpen: false,
    department: null
  });
  const [createEditDialog, setCreateEditDialog] = useState<{ isOpen: boolean; department?: Department }>({
    isOpen: false
  });

  const [departments] = useState<Department[]>([
    {
      id: 1,
      name: 'Engineering',
      description: 'Software development and technical operations',
      head: 'John Doe',
      employeeCount: 25,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Marketing',
      description: 'Brand management and marketing operations',
      head: 'Jane Smith',
      employeeCount: 15,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Human Resources',
      description: 'Employee management and recruitment',
      head: 'Mike Johnson',
      employeeCount: 8,
      status: 'Active'
    }
  ]);

  const handleDeleteClick = (department: Department) => {
    setDeleteDialog({ isOpen: true, department });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.department) {
      // Implement delete logic here
      console.log('Deleting department:', deleteDialog.department.id);
    }
    setDeleteDialog({ isOpen: false, department: null });
  };

  const handleCreateEdit = (data: Partial<Department>) => {
    // Implement create/edit logic here
    console.log('Saving department:', data);
    setCreateEditDialog({ isOpen: false });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Departments</h1>
        <button 
          onClick={() => setCreateEditDialog({ isOpen: true })}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors duration-150"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Department
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center space-x-4">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search departments..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="bg-gray-100 p-2 rounded-lg">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Departments Table */}
      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Department</th>
              <th className="text-left p-4">Head</th>
              <th className="text-left p-4">Employees</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(department => (
              <tr key={department.id} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{department.name}</div>
                      <div className="text-sm text-gray-500">{department.description}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">{department.head}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{department.employeeCount}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${department.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {department.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setCreateEditDialog({ isOpen: true, department })}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(department)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        department={deleteDialog.department}
        onClose={() => setDeleteDialog({ isOpen: false, department: null })}
        onConfirm={handleDeleteConfirm}
      />

      <CreateEditDialog
        isOpen={createEditDialog.isOpen}
        department={createEditDialog.department}
        onClose={() => setCreateEditDialog({ isOpen: false })}
        onSubmit={handleCreateEdit}
      />
    </div>
  );
};

export default Departments; 