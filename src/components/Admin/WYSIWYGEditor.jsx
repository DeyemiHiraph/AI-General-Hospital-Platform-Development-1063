import React, { useState, useRef } from 'react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBold, FiItalic, FiUnderline, FiLink, FiImage, FiList, FiCode, FiAlignLeft, FiAlignCenter, FiAlignRight } = FiIcons;

const WYSIWYGEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyUp = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      executeCommand('createLink', linkUrl);
      setShowLinkDialog(false);
      setLinkUrl('');
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const toolbarButtons = [
    { command: 'bold', icon: FiBold, title: 'Bold' },
    { command: 'italic', icon: FiItalic, title: 'Italic' },
    { command: 'underline', icon: FiUnderline, title: 'Underline' },
    { command: 'justifyLeft', icon: FiAlignLeft, title: 'Align Left' },
    { command: 'justifyCenter', icon: FiAlignCenter, title: 'Align Center' },
    { command: 'justifyRight', icon: FiAlignRight, title: 'Align Right' },
    { command: 'insertUnorderedList', icon: FiList, title: 'Bullet List' },
    { command: 'formatBlock', icon: FiCode, title: 'Code Block', value: 'pre' }
  ];

  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-700 p-3 border-b border-gray-600">
        <div className="flex items-center space-x-2 flex-wrap">
          {/* Format Dropdown */}
          <select
            onChange={(e) => executeCommand('formatBlock', e.target.value)}
            className="px-2 py-1 bg-gray-600 text-white text-sm rounded border border-gray-500"
          >
            <option value="div">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="p">Paragraph</option>
          </select>

          <div className="w-px h-6 bg-gray-500"></div>

          {/* Toolbar Buttons */}
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => executeCommand(button.command, button.value)}
              className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition-colors"
              title={button.title}
            >
              <SafeIcon icon={button.icon} />
            </button>
          ))}

          <div className="w-px h-6 bg-gray-500"></div>

          {/* Link Button */}
          <button
            onClick={() => setShowLinkDialog(true)}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition-colors"
            title="Insert Link"
          >
            <SafeIcon icon={FiLink} />
          </button>

          {/* Image Button */}
          <button
            onClick={insertImage}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition-colors"
            title="Insert Image"
          >
            <SafeIcon icon={FiImage} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onKeyUp={handleKeyUp}
        onBlur={handleKeyUp}
        className="p-4 min-h-96 bg-gray-800 text-white focus:outline-none"
        style={{ lineHeight: '1.6' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-white font-medium mb-4">Insert Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white mb-4"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={() => setShowLinkDialog(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WYSIWYGEditor;