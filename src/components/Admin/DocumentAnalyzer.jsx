import React, {useState, useCallback} from 'react';
import {motion} from 'framer-motion';
import {useDropzone} from 'react-dropzone';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiUpload, FiFile, FiImage, FiDownload, FiEye, FiTrash2, 
  FiFileText, FiCpu, FiZap, FiTarget, FiCheckCircle
} = FiIcons;

const DocumentAnalyzer = ({darkMode}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      status: 'uploaded',
      analysis: null
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast.success(`${acceptedFiles.length} file(s) uploaded successfully!`);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: true
  });

  const analyzeDocument = async (fileData) => {
    setAnalyzing(true);
    setSelectedFile(fileData);

    try {
      // Simulate AI document analysis
      await new Promise(resolve => setTimeout(resolve, 3000));

      const analysis = {
        id: Math.random().toString(36).substr(2, 9),
        fileId: fileData.id,
        sentiment: {
          positive: Math.random() * 0.4 + 0.3,
          negative: Math.random() * 0.3 + 0.1,
          neutral: Math.random() * 0.3 + 0.3
        },
        keyPhrases: [
          'patient consultation',
          'medical diagnosis',
          'treatment plan',
          'follow-up appointment',
          'medication dosage'
        ],
        topics: [
          {name: 'Medical Consultation', confidence: 0.94},
          {name: 'Treatment Planning', confidence: 0.87},
          {name: 'Patient Care', confidence: 0.82}
        ],
        entities: [
          {text: 'Dr. Smith', type: 'PERSON', confidence: 0.99},
          {text: 'Cardiology Department', type: 'ORGANIZATION', confidence: 0.95},
          {text: 'January 15, 2024', type: 'DATE', confidence: 0.98}
        ],
        summary: 'This document contains medical consultation notes discussing patient symptoms, diagnosis, and recommended treatment plan. The overall tone is professional and clinical.',
        wordCount: Math.floor(Math.random() * 2000) + 500,
        readingTime: Math.floor(Math.random() * 10) + 2,
        complexity: Math.random() > 0.5 ? 'Medium' : 'High'
      };

      setAnalysisResults(prev => [...prev, analysis]);
      setUploadedFiles(prev => prev.map(file => 
        file.id === fileData.id 
          ? {...file, status: 'analyzed', analysis}
          : file
      ));

      toast.success('Document analysis completed!');
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
      setSelectedFile(null);
    }
  };

  const deleteFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setAnalysisResults(prev => prev.filter(result => result.fileId !== fileId));
    toast.success('File deleted successfully!');
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return FiFileText;
    if (type.includes('image')) return FiImage;
    if (type.includes('word') || type.includes('document')) return FiFileText;
    return FiFile;
  };

  const getSentimentColor = (sentiment) => {
    const {positive, negative, neutral} = sentiment;
    if (positive > negative && positive > neutral) return 'text-green-600';
    if (negative > positive && negative > neutral) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="space-y-6"
    >
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiCpu} className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">AI Document Analyzer</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Upload and analyze documents with advanced NLP and AI
            </p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h4 className="font-semibold mb-4">Upload Documents</h4>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : darkMode
              ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <SafeIcon icon={FiUpload} className="text-4xl text-gray-400 mb-4 mx-auto" />
          {isDragActive ? (
            <p className="text-blue-600 font-medium">Drop your documents here...</p>
          ) : (
            <div>
              <p className="text-gray-600 font-medium mb-2">
                Drag & drop documents here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, DOC, DOCX, TXT, and image files
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Tools */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h4 className="font-semibold mb-4">AI Analysis Tools</h4>
        <div className="grid md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <SafeIcon icon={FiZap} className="text-blue-500 text-2xl mb-2 mx-auto" />
            <h5 className="font-medium mb-1">Sentiment Analysis</h5>
            <p className="text-xs text-gray-600">Analyze emotional tone</p>
          </div>
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <SafeIcon icon={FiTarget} className="text-green-500 text-2xl mb-2 mx-auto" />
            <h5 className="font-medium mb-1">Key Phrase Extraction</h5>
            <p className="text-xs text-gray-600">Extract important terms</p>
          </div>
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
            <SafeIcon icon={FiFileText} className="text-purple-500 text-2xl mb-2 mx-auto" />
            <h5 className="font-medium mb-1">Topic Classification</h5>
            <p className="text-xs text-gray-600">Categorize document topics</p>
          </div>
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
            <SafeIcon icon={FiCpu} className="text-orange-500 text-2xl mb-2 mx-auto" />
            <h5 className="font-medium mb-1">Entity Recognition</h5>
            <p className="text-xs text-gray-600">Identify names, dates, places</p>
          </div>
        </div>
      </div>

      {/* File List and Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Uploaded Files */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <h4 className="font-semibold mb-4">Uploaded Documents ({uploadedFiles.length})</h4>
          
          {uploadedFiles.length === 0 ? (
            <div className="text-center py-8">
              <SafeIcon icon={FiFileText} className="text-4xl text-gray-300 mb-4 mx-auto" />
              <p className="text-gray-500">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={getFileIcon(file.type)} className="text-blue-500 text-xl" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB • {file.status}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {file.status === 'uploaded' && (
                      <button
                        onClick={() => analyzeDocument(file)}
                        disabled={analyzing}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <SafeIcon icon={FiCpu} />
                      </button>
                    )}
                    {file.analysis && (
                      <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                        <SafeIcon icon={FiEye} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiTrash2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analysis Results */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <h4 className="font-semibold mb-4">Analysis Results</h4>
          
          {analyzing && selectedFile && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiCpu} className="text-white text-2xl animate-pulse" />
              </div>
              <h5 className="font-medium mb-2">Analyzing {selectedFile.name}...</h5>
              <p className="text-sm text-gray-500">AI is processing the document</p>
            </div>
          )}

          {!analyzing && analysisResults.length === 0 && (
            <div className="text-center py-8">
              <SafeIcon icon={FiZap} className="text-4xl text-gray-300 mb-4 mx-auto" />
              <p className="text-gray-500">Upload and analyze documents to see results</p>
            </div>
          )}

          {!analyzing && analysisResults.length > 0 && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {analysisResults.slice(-1).map((result) => (
                <div key={result.id} className="space-y-4">
                  {/* Summary */}
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <h5 className="font-medium mb-2">📄 Document Summary</h5>
                    <p className="text-sm">{result.summary}</p>
                  </div>

                  {/* Sentiment Analysis */}
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h5 className="font-medium mb-3">😊 Sentiment Analysis</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Positive</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{width: `${result.sentiment.positive * 100}%`}}
                            ></div>
                          </div>
                          <span className="text-xs">{(result.sentiment.positive * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Negative</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{width: `${result.sentiment.negative * 100}%`}}
                            ></div>
                          </div>
                          <span className="text-xs">{(result.sentiment.negative * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Neutral</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gray-500 h-2 rounded-full" 
                              style={{width: `${result.sentiment.neutral * 100}%`}}
                            ></div>
                          </div>
                          <span className="text-xs">{(result.sentiment.neutral * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Phrases */}
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                    <h5 className="font-medium mb-3">🔑 Key Phrases</h5>
                    <div className="flex flex-wrap gap-2">
                      {result.keyPhrases.map((phrase, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {phrase}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                    <h5 className="font-medium mb-3">📋 Topics</h5>
                    <div className="space-y-2">
                      {result.topics.map((topic, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-sm">{topic.name}</span>
                          <span className="text-xs font-medium">{(topic.confidence * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Entities */}
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                    <h5 className="font-medium mb-3">🏷️ Entities</h5>
                    <div className="space-y-2">
                      {result.entities.map((entity, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div>
                            <span className="text-sm font-medium">{entity.text}</span>
                            <span className="text-xs text-gray-500 ml-2">({entity.type})</span>
                          </div>
                          <span className="text-xs">{(entity.confidence * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Document Stats */}
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h5 className="font-medium mb-3">📊 Document Statistics</h5>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold">{result.wordCount}</p>
                        <p className="text-xs text-gray-500">Words</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{result.readingTime}min</p>
                        <p className="text-xs text-gray-500">Reading Time</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{result.complexity}</p>
                        <p className="text-xs text-gray-500">Complexity</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentAnalyzer;