import React, {useState} from 'react';
import {motion} from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import useDemoStore from '../../store/demoStore';
import * as FiIcons from 'react-icons/fi';

const {FiStar, FiThumbsUp, FiThumbsDown, FiMessageSquare, FiSend} = FiIcons;

const DemoFeedback = ({onSubmit}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [helpful, setHelpful] = useState(true);
  const [hoveredStar, setHoveredStar] = useState(0);
  const {submitDemoFeedback} = useDemoStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await submitDemoFeedback({
        rating,
        comment,
        helpful,
        userId: 'demo_user' // In real app, get from auth
      });
      
      toast.success('Thank you for your feedback!');
      onSubmit?.();
    } catch (error) {
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          How was the demo?
        </h3>
        <p className="text-gray-600 text-sm">
          Your feedback helps us improve the MediVerse AI experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 mb-3">Rate your experience</p>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="p-1 transition-colors"
              >
                <SafeIcon
                  icon={FiStar}
                  className={`text-2xl ${
                    star <= (hoveredStar || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Helpful Toggle */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 mb-3">Was this demo helpful?</p>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setHelpful(true)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                helpful
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-300'
              }`}
            >
              <SafeIcon icon={FiThumbsUp} />
              <span>Yes</span>
            </button>
            <button
              type="button"
              onClick={() => setHelpful(false)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                !helpful
                  ? 'bg-red-100 text-red-700 border border-red-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-300'
              }`}
            >
              <SafeIcon icon={FiThumbsDown} />
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Comments (Optional)
          </label>
          <div className="relative">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you think about the demo..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent resize-none"
              rows="3"
            />
            <SafeIcon 
              icon={FiMessageSquare} 
              className="absolute top-3 right-3 text-gray-400" 
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-medical-500 to-primary-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiSend} />
          <span>Submit Feedback</span>
        </button>
      </form>

      {/* Demo Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-medical-600">12k+</div>
            <div className="text-xs text-gray-600">Demo Views</div>
          </div>
          <div>
            <div className="text-lg font-bold text-medical-600">4.9</div>
            <div className="text-xs text-gray-600">Avg Rating</div>
          </div>
          <div>
            <div className="text-lg font-bold text-medical-600">94%</div>
            <div className="text-xs text-gray-600">Found Helpful</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoFeedback;