import React from 'react';
import { Plus, FileText, Edit2, Trash2 } from 'lucide-react';

const FeedbackForms = () => {
  const forms = [
    {
      id: 1,
      title: 'End of Semester Feedback',
      description: 'Comprehensive feedback for the Fall 2023 semester',
      responses: 156,
      status: 'Active',
      lastModified: '2024-02-15',
    },
    {
      id: 2,
      title: 'Course Content Evaluation',
      description: 'Feedback on course materials and content delivery',
      responses: 142,
      status: 'Draft',
      lastModified: '2024-02-14',
    },
    {
      id: 3,
      title: 'Teaching Methodology Assessment',
      description: 'Evaluation of teaching methods and effectiveness',
      responses: 168,
      status: 'Active',
      lastModified: '2024-02-13',
    },
    {
      id: 4,
      title: 'Student Experience Survey',
      description: 'General feedback on student learning experience',
      responses: 134,
      status: 'Closed',
      lastModified: '2024-02-12',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Feedback Forms</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Create New Form</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <div
            key={form.id}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {form.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {form.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit2 className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Responses</p>
                <p className="text-lg font-semibold text-gray-900">
                  {form.responses}
                </p>
              </div>
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    form.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : form.status === 'Draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {form.status}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last modified: {form.lastModified}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackForms;