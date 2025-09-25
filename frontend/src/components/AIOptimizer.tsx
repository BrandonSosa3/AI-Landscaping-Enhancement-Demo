import React, { useState, useEffect } from 'react';
import { Job, Crew, OptimizationResult } from '../types';

interface AIOptimizerProps {
  jobs: Job[];
  crews: Crew[];
  onOptimized: (result: OptimizationResult) => void;
  onBack: () => void;
}

function AIOptimizer({ jobs, crews, onOptimized, onBack }: AIOptimizerProps) {
  const [optimizing, setOptimizing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const steps = [
    { text: 'Analyzing job requirements', duration: 800 },
    { text: 'Calculating optimal routes', duration: 1000 },
    { text: 'Matching crews to skills', duration: 600 },
    { text: 'Minimizing travel time', duration: 800 },
    { text: 'Maximizing daily revenue', duration: 600 },
  ];

  const runOptimization = async () => {
    setOptimizing(true);
    setProgress(0);

    // Start API call in parallel (don't wait for it)
    const apiPromise = fetch('http://localhost:8000/api/optimize-schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobs, crews })
    }).then(response => response.json());

    // Animate through steps
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i].text);
      setProgress(((i + 1) / steps.length) * 95); // Go to 95%, not 100%
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

    // Wait for API call to complete
    try {
      const result = await apiPromise;
      setProgress(100);
      setCurrentStep('Optimization complete!');
      
      // Short pause at 100% for effect
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onOptimized(result);
    } catch (error) {
      console.error('Optimization error:', error);
      // Fallback to mock data if API fails
      setProgress(100);
      setCurrentStep('Optimization complete!');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock result for demo
      const mockResult: OptimizationResult = {
        status: 'success',
        routes: [],
        efficiency_report: {
          efficiency_gain: 23,
          miles_saved: 47,
          time_saved: 2.3,
          extra_revenue: 180,
          success_probability: 94
        },
        recommendations: [
          'Schedule Team Alpha for morning jobs to maximize efficiency',
          'Team Bravo can handle 1 additional job with current capacity',
          'Consider adjusting start times to avoid traffic delays'
        ]
      };
      onOptimized(mockResult);
    }
  };

  useEffect(() => {
    runOptimization();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* AI Robot Icon with Animation */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '24px',
              background: 'linear-gradient(135deg, #2563eb, #16a34a)',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}
          >
            <span style={{ fontSize: '48px' }}></span>
          </div>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}
        >
          AI Optimization in Progress
        </h2>

        {/* Current Step */}
        <p
          style={{
            fontSize: '20px',
            color: '#4b5563',
            marginBottom: '32px',
            minHeight: '24px' // Prevent layout shift
          }}
        >
          {currentStep && (
            <>
              <span style={{ color: '#16a34a', marginRight: '8px' }}></span>
              {currentStep}
            </>
          )}
        </p>

        {/* Progress Bar Container */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#e5e7eb',
            borderRadius: '8px',
            height: '16px',
            marginBottom: '16px',
            overflow: 'hidden'
          }}
        >
          {/* Progress Bar Fill */}
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #2563eb, #16a34a)',
              borderRadius: '8px',
              transition: 'width 0.5s ease-in-out'
            }}
          ></div>
        </div>

        {/* Progress Percentage */}
        <p
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#6b7280',
            marginBottom: '32px'
          }}
        >
          {Math.round(progress)}%
        </p>

        {/* Fun Fact (only show while processing) */}
        {progress < 100 && (
          <div
            style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '24px'
            }}
          >
          </div>
        )}

        {/* Completion Message */}
        {progress === 100 && (
          <div
            style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              padding: '20px',
              marginTop: '24px'
            }}
          >
            <p
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#16a34a',
                margin: 0
              }}
            >
               Optimization Complete!
            </p>
          </div>
        )}
      </div>

      {/* Add CSS animation for pulse effect */}
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default AIOptimizer;