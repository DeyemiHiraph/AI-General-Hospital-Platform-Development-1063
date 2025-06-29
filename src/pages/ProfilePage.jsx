import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../common/SafeIcon';
import useAuthStore from '../store/authStore';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, 
  FiEdit3, FiSave, FiX, FiCamera, FiShield 
} = FiIcons;

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    address: user?.address || '',
    emergencyContact: user?.emergencyContact || '',
    medicalConditions: user?.medicalConditions || '',
    allergies: user?.allergies || '',
    medications: user?.medications || ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Simulate saving profile
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || '',
      address: user?.address || '',
      emergencyContact: user?.emergencyContact || '',
      medicalConditions: user?.medicalConditions || '',
      allergies: user?.allergies || '',
      medications: user?.medications || ''
    });
    setIsEditing(false);
  };

  const ProfileField = ({ label, value, name, type = 'text', options = null }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {isEditing ? (
        options ? (
          <select
            name={name}
            value={value}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
          />
        )
      ) : (
        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
          {value || 'Not specified'}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg medical-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-medical-500 text-white rounded-lg hover:bg-medical-600 transition-colors"
            >
              <SafeIcon icon={FiEdit3} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <SafeIcon icon={FiSave} />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <SafeIcon icon={FiX} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-medical-200"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-medical-500 text-white rounded-full flex items-center justify-center hover:bg-medical-600 transition-colors">
                <SafeIcon icon={FiCamera} className="text-sm" />
              </button>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">Patient ID: {user?.medicalId}</p>
            <p className="text-sm text-gray-500">Member since {new Date(user?.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg medical-card p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <SafeIcon icon={FiUser} className="mr-2 text-medical-600" />
            Personal Information
          </h3>
          
          <div className="space-y-4">
            <ProfileField
              label="Full Name"
              value={formData.name}
              name="name"
            />
            
            <ProfileField
              label="Email Address"
              value={formData.email}
              name="email"
              type="email"
            />
            
            <ProfileField
              label="Phone Number"
              value={formData.phone}
              name="phone"
              type="tel"
            />
            
            <ProfileField
              label="Date of Birth"
              value={formData.dateOfBirth}
              name="dateOfBirth"
              type="date"
            />
            
            <ProfileField
              label="Gender"
              value={formData.gender}
              name="gender"
              options={[
                { value: '', label: 'Select gender' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'prefer-not-to-say', label: 'Prefer not to say' }
              ]}
            />
            
            <ProfileField
              label="Address"
              value={formData.address}
              name="address"
              type="textarea"
            />
          </div>
        </motion.div>

        {/* Medical Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg medical-card p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <SafeIcon icon={FiShield} className="mr-2 text-medical-600" />
            Medical Information
          </h3>
          
          <div className="space-y-4">
            <ProfileField
              label="Emergency Contact"
              value={formData.emergencyContact}
              name="emergencyContact"
            />
            
            <ProfileField
              label="Medical Conditions"
              value={formData.medicalConditions}
              name="medicalConditions"
              type="textarea"
            />
            
            <ProfileField
              label="Allergies"
              value={formData.allergies}
              name="allergies"
              type="textarea"
            />
            
            <ProfileField
              label="Current Medications"
              value={formData.medications}
              name="medications"
              type="textarea"
            />
          </div>
        </motion.div>
      </div>

      {/* Account Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg medical-card p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <SafeIcon icon={FiShield} className="mr-2 text-medical-600" />
          Account Security
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Privacy Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-medical-600 focus:ring-medical-500" />
                <span className="ml-2 text-sm text-gray-600">Allow data sharing for research</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-medical-600 focus:ring-medical-500" />
                <span className="ml-2 text-sm text-gray-600">Enable appointment reminders</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-medical-600 focus:ring-medical-500" />
                <span className="ml-2 text-sm text-gray-600">Receive health tips and updates</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Account Actions</h4>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 text-sm text-medical-600 hover:bg-medical-50 rounded-lg transition-colors">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-medical-600 hover:bg-medical-50 rounded-lg transition-colors">
                Download My Data
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;