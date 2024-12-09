import React from 'react';
import { BarChart3, TrendingUp, Users, Star } from 'lucide-react';

const FeedbackAnalytics = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Responses',
      value: '2,847',
      change: '+12.5%',
      icon: BarChart3,
    },
    {
      id: 2,
      title: 'Average Rating',
      value: '4.8/5.0',
      change: '+0.3',
      icon: Star,
    },
    {
      id: 3,
      title: 'Active Students',
      value: '1,249',
      change: '+85',
      icon: Users,
    },
    {
      id: 4,
      title: 'Response Rate',
      value: '89%',
      change: '+5.2%',
      icon: TrendingUp,
    },
  ];

  const courseRatings = [
    { course: 'Advanced Programming', rating: 4.8, responses: 156 },
    { course: 'Data Structures', rating: 4.6, responses: 142 },
    { course: 'Web Development', rating: 4.9, responses: 168 },
    { course: 'Database Systems', rating: 4.7, responses: 134 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500"> vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Course Ratings Overview
          </h2>
          <div className="space-y-4">
            {courseRatings.map((course) => (
              <div key={course.course} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {course.course}
                  </span>
                  <span className="text-sm text-gray-500">
                    {course.responses} responses
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${(course.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Feedback
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
              >
                <img
                  src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                  alt="Student"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      Student {i}
                    </h3>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    "Great course content and excellent teaching methodology.
                    Looking forward to more advanced topics."
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAnalytics;