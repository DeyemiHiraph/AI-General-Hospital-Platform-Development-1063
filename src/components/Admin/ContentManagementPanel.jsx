import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import useAdminStore from '../../store/adminStore';
import WYSIWYGEditor from './WYSIWYGEditor';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiPlus, FiEdit, FiTrash2, FiEye, FiSend } = FiIcons;

const ContentManagementPanel = () => {
  const { blogPosts, createBlogPost, publishBlogPost } = useAdminStore();
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'health',
    tags: '',
    featured: false
  });

  const handleCreatePost = () => {
    setEditingPost(null);
    setPostData({
      title: '',
      content: '',
      excerpt: '',
      category: 'health',
      tags: '',
      featured: false
    });
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags?.join(', ') || '',
      featured: post.featured || false
    });
    setShowEditor(true);
  };

  const handleSavePost = async () => {
    if (!postData.title || !postData.content) {
      toast.error('Please fill in title and content');
      return;
    }

    const processedData = {
      ...postData,
      tags: postData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (editingPost) {
      // Update existing post logic would go here
      toast.success('Post updated successfully!');
    } else {
      await createBlogPost(processedData);
      toast.success('Post created successfully!');
    }

    setShowEditor(false);
  };

  const handlePublishPost = async (postId) => {
    await publishBlogPost(postId);
    toast.success('Post published successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {!showEditor ? (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Content Management</h2>
              <p className="text-gray-400">Create and manage blog posts and static pages</p>
            </div>
            <button
              onClick={handleCreatePost}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <SafeIcon icon={FiPlus} />
              <span>New Post</span>
            </button>
          </div>

          {/* Content Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Posts</p>
                  <p className="text-2xl font-bold text-white">{blogPosts.length}</p>
                </div>
                <SafeIcon icon={FiFileText} className="text-blue-400 text-2xl" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Published</p>
                  <p className="text-2xl font-bold text-white">
                    {blogPosts.filter(p => p.status === 'published').length}
                  </p>
                </div>
                <SafeIcon icon={FiSend} className="text-green-400 text-2xl" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Drafts</p>
                  <p className="text-2xl font-bold text-white">
                    {blogPosts.filter(p => p.status === 'draft').length}
                  </p>
                </div>
                <SafeIcon icon={FiEdit} className="text-yellow-400 text-2xl" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Views</p>
                  <p className="text-2xl font-bold text-white">1,234</p>
                </div>
                <SafeIcon icon={FiEye} className="text-purple-400 text-2xl" />
              </div>
            </div>
          </div>

          {/* Posts Table */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Recent Posts</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {blogPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">{post.title}</div>
                          <div className="text-sm text-gray-400 truncate max-w-xs">
                            {post.excerpt}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {post.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditPost(post)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <SafeIcon icon={FiEdit} />
                          </button>
                          {post.status === 'draft' && (
                            <button
                              onClick={() => handlePublishPost(post.id)}
                              className="text-green-400 hover:text-green-300"
                            >
                              <SafeIcon icon={FiSend} />
                            </button>
                          )}
                          <button className="text-red-400 hover:text-red-300">
                            <SafeIcon icon={FiTrash2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* WYSIWYG Editor */
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowEditor(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Post
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WYSIWYGEditor
                content={postData.content}
                onChange={(content) => setPostData({ ...postData, content })}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={postData.title}
                  onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={postData.excerpt}
                  onChange={(e) => setPostData({ ...postData, excerpt: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={postData.category}
                  onChange={(e) => setPostData({ ...postData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="health">Health</option>
                  <option value="technology">Technology</option>
                  <option value="news">News</option>
                  <option value="education">Education</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={postData.tags}
                  onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="health, ai, medicine"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={postData.featured}
                  onChange={(e) => setPostData({ ...postData, featured: e.target.checked })}
                  className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-300">
                  Featured Post
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ContentManagementPanel;