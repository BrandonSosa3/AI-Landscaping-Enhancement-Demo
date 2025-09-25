import React, { useState } from 'react';
import { Job } from '../types';

interface JobInputProps {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  onNext: () => void;
}

function JobInput({ jobs, setJobs, onNext }: JobInputProps) {
  const [loading, setLoading] = useState(false);

  const loadDemoJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/demo-data');
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error('Error loading demo data:', error);
      alert('Could not connect to backend');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
         Today's Scheduled Jobs
      </h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Add or load jobs to optimize your crew schedule
      </p>

      {/* Load Button */}
      <button
        onClick={loadDemoJobs}
        disabled={loading}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#16a34a',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          marginBottom: '30px',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? ' Loading...' : ' Load Demo Jobs'}
      </button>

      {/* Jobs List */}
      {jobs.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #16a34a'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                    {job.customer}
                  </h3>
                  <p style={{ color: '#666', marginBottom: '8px' }}>
                     {job.address}
                  </p>
                  <div style={{ fontSize: '14px', color: '#888' }}>
                    <span> {job.service_type.replace(/_/g, ' ')} • </span>
                    <span> {job.estimated_duration} min • </span>
                    <span> {job.crew_size_needed} people</span>
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: job.priority === 'high' ? '#fee2e2' : job.priority === 'medium' ? '#fef3c7' : '#dcfce7',
                      color: job.priority === 'high' ? '#991b1b' : job.priority === 'medium' ? '#92400e' : '#166534'
                    }}
                  >
                    {job.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Next Button */}
      {jobs.length > 0 && (
        <div style={{ textAlign: 'right' }}>
          <button
            onClick={onNext}
            style={{
              padding: '12px 32px',
              fontSize: '16px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Next: Set Up Crews →
          </button>
        </div>
      )}

      {/* Empty State */}
      {jobs.length === 0 && !loading && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '2px dashed #d1d5db'
          }}
        >
          <p style={{ color: '#6b7280', fontSize: '18px' }}>
            No jobs loaded yet. Click "Load Demo Jobs" to get started.
          </p>
        </div>
      )}
    </div>
  );
}

export default JobInput;