import React, { useState, useEffect } from 'react';
import { Crew } from '../types';

interface CrewManagerProps {
  crews: Crew[];
  setCrews: (crews: Crew[]) => void;
  onNext: () => void;
  onBack: () => void;
}

function CrewManager({ crews, setCrews, onNext, onBack }: CrewManagerProps) {
  const [loading, setLoading] = useState(false);

  const loadDemoCrews = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/demo-data');
      const data = await response.json();
      setCrews(data.crews);
    } catch (error) {
      console.error('Error loading demo data:', error);
    }
    setLoading(false);
  };

  // Auto-load crews
  useEffect(() => {
    if (crews.length === 0) {
      loadDemoCrews();
    }
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
         Available Crews
      </h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Your teams ready to work today
      </p>

      {/* Crews Grid */}
      {crews.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {crews.map((crew) => (
            <div
              key={crew.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderTop: '4px solid #2563eb'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {crew.name}
                  </h3>
                  <p style={{ color: '#666' }}> {crew.start_location}</p>
                </div>
                <div
                  style={{
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    height: 'fit-content'
                  }}
                >
                  {crew.size} people
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#333', marginBottom: '12px' }}>
                 <strong>{crew.available_hours} hours</strong> available today
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {crew.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={onBack}
          style={{
            padding: '12px 32px',
            fontSize: '16px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← Back to Jobs
        </button>

        {crews.length > 0 && (
          <button
            onClick={onNext}
            style={{
              padding: '12px 32px',
              fontSize: '16px',
              backgroundColor: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
             Optimize Schedule →
          </button>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#6b7280' }}>Loading crews...</p>
        </div>
      )}
    </div>
  );
}

export default CrewManager;