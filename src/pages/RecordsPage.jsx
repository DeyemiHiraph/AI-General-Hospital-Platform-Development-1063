import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import SafeIcon from '../common/SafeIcon';
import useMedicalStore from '../store/medicalStore';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUpload, FiFile, FiImage, FiDownload, FiEye, 
  FiTrash2, FiCalendar, FiUser, FiFileText 
} = FiIcons;

const RecordsPage = () => {
  const { patientRecords, addRecord } = useMedicalStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Records', count: patientRecords.length },
    { id: 'lab-results', name: 'Lab Results', count: 3 },
    { id: 'imaging', name: 'Imaging', count: 2 },
    { id: 'prescriptions', name: 'Prescriptions', count: 1 },
    { id: 'reports', name: 'Reports', count: 4 }
  ];

  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true);
    setUploadProgress(0);

    acceptedFiles.forEach((file) => {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            
            // Add the record
            addRecord({
              name: file.name,
              type: file.type.includes('image') ? 'imaging' : 'lab-results',
              size: file.size,
              file: file
            });
            
            toast.success(`${file.name} uploaded successfully!`);
            return 0;
          }
          return prev + 10;
        });
      }, 200);
    });
  }, [addRecord]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.pdf'],
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv']
    },
    multiple: true
  });

  const mockRecords = [
    {
      id: '1',
      name: 'Blood Test Results - Complete Panel',
      type: 'lab-results',
      date: '2024-01-15',
      size: '2.3 MB',
      doctor: 'Dr. AI Laboratory',
      status: 'analyzed'
    },
    {
      id: '2',
      name: 'Chest X-Ray - Routine Checkup',
      type: 'imaging',
      date: '2024-01-10',
      size: '15.7 MB',
      doctor: 'Dr. AI Radiology',
      status: 'reviewed'
    },
    {
      id: '3',
      name: 'Cardiology Report - ECG Analysis',
      type: 'reports',
      date: '2024-01-08',
      size: '1.1 MB',
      doctor: 'Dr. AI Cardiology',
      status: 'completed'
    },
    {
      id: '4',
      name: 'Prescription - Hypertension Medication',
      type: 'prescriptions',
      date: '2024-01-05',
      size: '0.8 MB',
      doctor: 'Dr. AI General Practice',
      status: 'active'
    }
  ];

  const allRecords = [...mockRecords, ...patientRecords];
  const filteredRecords = selectedCategory === 'all' 
    ? allRecords 
    : allRecords.filter(record => record.type === selectedCategory);

  const getFileIcon = (type) => {
    switch (type) {
      case 'imaging':
        return FiImage;
      case 'lab-results':
        return FiFileText;
      case 'prescriptions':
        return FiFile;
      case 'reports':
        return FiFileText;
      default:
        return FiFile;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'analyzed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg medical-card p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Medical Records</h1>
        <p className="text-gray-600 mb-6">
          Upload and manage your medical documents. Our AI will analyze and organize them for easy access.
        </p>

        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-medical-500 bg-medical-50'
              : 'border-gray-300 hover:border-medical-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <SafeIcon icon={FiUpload} className="text-4xl text-gray-400 mb-4 mx-auto" />
          {isDragActive ? (
            <p className="text-medical-600 font-medium">Drop your files here...</p>
          ) : (
            <div>
              <p className="text-gray-600 font-medium mb-2">
                Drag & drop your medical files here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, JPG, PNG, CSV files up to 50MB
              </p>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-medical-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Categories and Records */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-lg medical-card p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-medical-100 text-medical-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Records List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-xl shadow-lg medical-card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {categories.find(c => c.id === selectedCategory)?.name} ({filteredRecords.length})
                </h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    Sort by Date
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {filteredRecords.length === 0 ? (
                <div className="text-center py-12">
                  <SafeIcon icon={FiFileText} className="text-4xl text-gray-300 mb-4 mx-auto" />
                  <h4 className="text-lg font-medium text-gray-600 mb-2">No records found</h4>
                  <p className="text-gray-500">Upload some medical documents to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRecords.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-medical-300 hover:bg-medical-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center group-hover:bg-medical-200 transition-colors">
                          <SafeIcon icon={getFileIcon(record.type)} className="text-medical-600 text-xl" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 group-hover:text-medical-700">
                            {record.name}
                          </h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500 flex items-center">
                              <SafeIcon icon={FiCalendar} className="mr-1" />
                              {record.date || new Date(record.uploadDate).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center">
                              <SafeIcon icon={FiUser} className="mr-1" />
                              {record.doctor || 'Self-uploaded'}
                            </span>
                            <span className="text-xs text-gray-400">
                              {record.size || '0 MB'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {record.status && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        )}
                        
                        <div className="flex space-x-1">
                          <button className="p-2 text-gray-400 hover:text-medical-600 hover:bg-medical-50 rounded-lg transition-colors">
                            <SafeIcon icon={FiEye} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                            <SafeIcon icon={FiDownload} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <SafeIcon icon={FiTrash2} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecordsPage;