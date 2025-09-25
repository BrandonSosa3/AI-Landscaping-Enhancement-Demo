import React from 'react';
import { OptimizationResult } from '../types';

interface ResultsDashboardProps {
  result: OptimizationResult;
  onStartOver: () => void;
}

function ResultsDashboard({ result, onStartOver }: ResultsDashboardProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
           Optimization Results
        </h2>
        
        {/* Efficiency Report */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-lawn-green-50 p-4 rounded-lg border border-lawn-green-200">
            <p className="text-sm text-gray-600 mb-1">Efficiency Gain</p>
            <p className="text-3xl font-bold text-lawn-green-600">
              {result.efficiency_report.efficiency_gain}%
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Miles Saved</p>
            <p className="text-3xl font-bold text-blue-600">
              {result.efficiency_report.miles_saved}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Time Saved</p>
            <p className="text-3xl font-bold text-purple-600">
              {result.efficiency_report.time_saved}h
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Extra Revenue</p>
            <p className="text-3xl font-bold text-green-600">
              ${result.efficiency_report.extra_revenue}
            </p>
          </div>
        </div>

        {/* Optimized Routes */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
             Optimized Routes
          </h3>
          
          <div className="space-y-4">
            {result.routes.map((route) => (
              <div 
                key={route.crew_id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {route.crew_name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                       {route.total_drive_time} driving •  {route.total_work_time} working
                    </p>
                  </div>
                  <div className="bg-lawn-green-100 text-lawn-green-800 px-3 py-1 rounded-full font-semibold">
                    {route.efficiency_score}% efficient
                  </div>
                </div>

                <div className="space-y-2">
                  {route.jobs.map((job, idx) => (
                    <div key={job.id} className="flex items-center gap-3 text-sm">
                      <span className="font-bold text-lawn-green-600">
                        {idx + 1}.
                      </span>
                      <span className="text-gray-700">
                        {job.customer} - {job.service_type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-gray-500">
                        ({job.estimated_duration} min)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              💡 AI Recommendations
            </h3>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <ul className="space-y-2">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Start Over Button */}
        <div className="text-center">
          <button
            onClick={onStartOver}
            className="bg-lawn-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-lawn-green-700 transition-colors"
          >
             Start Over
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsDashboard;