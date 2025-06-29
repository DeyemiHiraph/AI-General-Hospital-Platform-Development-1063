import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../common/SafeIcon';
import useMedicalStore from '../store/medicalStore';
import * as FiIcons from 'react-icons/fi';

const { 
  FiCalendar, FiClock, FiVideo, FiMapPin, FiPlus, 
  FiCheck, FiX, FiRefreshCw, FiUser, FiPhone 
} = FiIcons;

const AppointmentsPage = () => {
  const { departments } = useMedicalStore();
  const [selectedView, setSelectedView] = useState('upcoming');
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    department: '',
    date: '',
    time: '',
    type: 'virtual',
    reason: ''
  });

  const mockAppointments = [
    {
      id: '1',
      department: 'Cardiology',
      doctor: 'Dr. AI Cardiology Specialist',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'virtual',
      status: 'confirmed',
      reason: 'Follow-up consultation for heart rhythm monitoring'
    },
    {
      id: '2',
      department: 'General Practice',
      doctor: 'Dr. AI General Practitioner',
      date: '2024-01-22',
      time: '2:30 PM',
      type: 'virtual',
      status: 'pending',
      reason: 'Annual health checkup and blood pressure monitoring'
    },
    {
      id: '3',
      department: 'Psychology',
      doctor: 'Dr. AI Mental Health Specialist',
      date: '2024-01-25',
      time: '11:00 AM',
      type: 'virtual',
      status: 'confirmed',
      reason: 'Stress management and anxiety counseling session'
    }
  ];

  const pastAppointments = [
    {
      id: '4',
      department: 'Neurology',
      doctor: 'Dr. AI Neurology Specialist',
      date: '2024-01-10',
      time: '9:00 AM',
      type: 'virtual',
      status: 'completed',
      reason: 'Headache evaluation and neurological assessment'
    },
    {
      id: '5',
      department: 'Dermatology',
      doctor: 'Dr. AI Dermatology Specialist',
      date: '2024-01-05',
      time: '3:00 PM',
      type: 'virtual',
      status: 'completed',
      reason: 'Skin condition consultation and treatment plan'
    }
  ];

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!bookingData.department || !bookingData.date || !bookingData.time) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Appointment booked successfully!');
    setShowBooking(false);
    setBookingData({
      department: '',
      date: '',
      time: '',
      type: 'virtual',
      reason: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const appointments = selectedView === 'upcoming' ? mockAppointments : pastAppointments;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg medical-card p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointments</h1>
            <p className="text-gray-600">Manage your virtual consultations with AI specialists</p>
          </div>
          <button
            onClick={() => setShowBooking(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-medical-500 to-primary-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
          >
            <SafeIcon icon={FiPlus} />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedView('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'upcoming'
                ? 'bg-medical-100 text-medical-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            Upcoming ({mockAppointments.length})
          </button>
          <button
            onClick={() => setSelectedView('past')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'past'
                ? 'bg-medical-100 text-medical-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            Past ({pastAppointments.length})
          </button>
        </div>
      </motion.div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg medical-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-medical-100 to-primary-100 rounded-xl flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="text-medical-600 text-2xl" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{appointment.department}</h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{appointment.doctor}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} />
                      <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiClock} />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={appointment.type === 'virtual' ? FiVideo : FiMapPin} />
                      <span>{appointment.type === 'virtual' ? 'Virtual' : 'In-person'}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mt-3 text-sm">
                    <strong>Reason:</strong> {appointment.reason}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                {selectedView === 'upcoming' && appointment.status === 'confirmed' && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <SafeIcon icon={FiVideo} />
                    <span>Join Call</span>
                  </button>
                )}
                
                {selectedView === 'upcoming' && (
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-medical-600 hover:bg-medical-50 rounded-lg transition-colors">
                      <SafeIcon icon={FiRefreshCw} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <SafeIcon icon={FiX} />
                    </button>
                  </div>
                )}
                
                {selectedView === 'past' && (
                  <button className="px-4 py-2 text-medical-600 hover:text-medical-700 hover:bg-medical-50 rounded-lg transition-colors">
                    View Summary
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
              <button
                onClick={() => setShowBooking(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <select
                  value={bookingData.department}
                  onChange={(e) => setBookingData({...bookingData, department: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <select
                    value={bookingData.time}
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="virtual"
                      checked={bookingData.type === 'virtual'}
                      onChange={(e) => setBookingData({...bookingData, type: e.target.value})}
                      className="text-medical-600 focus:ring-medical-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Virtual</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="in-person"
                      checked={bookingData.type === 'in-person'}
                      onChange={(e) => setBookingData({...bookingData, type: e.target.value})}
                      className="text-medical-600 focus:ring-medical-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">In-person</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit
                </label>
                <textarea
                  value={bookingData.reason}
                  onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                  placeholder="Briefly describe your symptoms or reason for consultation..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBooking(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-medical-500 to-primary-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;