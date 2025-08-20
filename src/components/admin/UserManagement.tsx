import React, { useState } from 'react';
import { useAuth, User } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Edit, Trash2, User as UserIcon, Shield } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const { users, currentUser, logout } = useAuth();
  const { t } = useLanguage();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    role: 'user' as 'user' | 'admin'
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role
    });
  };

  const handleDelete = (userId: string) => {
    // Prevent deleting the current user or the default admin
    if (userId === currentUser?.id) {
      alert(t('admin.users.cannotDeleteSelf'));
      return;
    }
    
    if (userId === 'admin-1') {
      alert(t('admin.users.cannotDeleteDefaultAdmin'));
      return;
    }
    
    if (confirm(t('admin.users.confirmDelete'))) {
      // In a real app, you would call an API to delete the user
      // For now, we'll just show an alert
      alert(t('admin.users.deleteSuccess'));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.username.trim() || !formData.email.trim()) {
      alert(t('admin.users.fillAllFields'));
      return;
    }
    
    // In a real app, you would call an API to update the user
    // For now, we'll just show an alert
    alert(editingUser ? t('admin.users.updateSuccess') : t('admin.users.createSuccess'));
    resetForm();
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormData({
      fullName: '',
      username: '',
      email: '',
      role: 'user'
    });
  };

  const filteredUsers = users.filter(user => user.id !== 'admin-1'); // Exclude default admin from list

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t('admin.users.title')}</h2>
        <button
          onClick={resetForm}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <UserIcon size={20} />
          {t('admin.users.addUser')}
        </button>
      </div>

      {/* User Form */}
      {(editingUser || !editingUser) && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">
            {editingUser ? t('admin.users.editUser') : t('admin.users.addUser')}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.users.fullName')}</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.users.username')}</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.users.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.users.role')}</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as 'user' | 'admin'})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">{t('admin.users.userRole')}</option>
                  <option value="admin">{t('admin.users.adminRole')}</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {editingUser ? t('admin.users.updateUser') : t('admin.users.createUser')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
              >
                {t('admin.users.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.fullName')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.username')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.email')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.role')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className={user.id === currentUser?.id ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role === 'admin' ? (
                        <div className="flex items-center gap-1">
                          <Shield size={12} />
                          {t('admin.users.adminRole')}
                        </div>
                      ) : (
                        t('admin.users.userRole')
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={user.id === currentUser?.id || user.id === 'admin-1'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length === 0 && (
          <div className="text-center py-12">
            <UserIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">{t('admin.users.noUsers')}</p>
          </div>
        )}
      </div>
    </div>
  );
};