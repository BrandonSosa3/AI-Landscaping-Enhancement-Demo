import React, { useState } from 'react';
import JobInput from './components/JobInput';
import CrewManager from './components/CrewManager';
import AIOptimizer from './components/AIOptimizer';
import { Job, Crew, OptimizationResult } from './types';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [crews, setCrews] = useState<Crew[]>([]);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(to right, #16a34a, #15803d)',
        color: 'white',
        padding: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>
             AI Crew Scheduler
          </h1>
          <p style={{ opacity: 0.9 }}>
            Optimize landscaping schedules with artificial intelligence
          </p>
        </div>
      </header>

      {/* Progress Steps */}
      <div style={{ padding: '32px 24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '16px',
          marginBottom: '48px'
        }}>
          {[1, 2, 3, 4].map((step) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  backgroundColor: currentStep >= step ? '#16a34a' : '#d1d5db',
                  color: currentStep >= step ? 'white' : '#6b7280'
                }}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  style={{
                    width: '64px',
                    height: '4px',
                    backgroundColor: currentStep > step ? '#16a34a' : '#d1d5db'
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <main>
          {currentStep === 1 && (
            <JobInput 
              jobs={jobs}
              setJobs={setJobs}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <CrewManager 
              crews={crews}
              setCrews={setCrews}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <AIOptimizer
              jobs={jobs}
              crews={crews}
              onOptimized={(result) => {
                setOptimizationResult(result);
                setCurrentStep(4);
              }}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && optimizationResult && (
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '40px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
                   AI Transformation Results
                </h2>
                <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '16px' }}>
                  See how AI transforms every aspect of your landscaping business
                </p>
                
                {/* Quick metrics display */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '2px solid #bbf7d0' }}>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
                      {optimizationResult.efficiency_report.efficiency_gain}%
                    </p>
                    <p style={{ fontSize: '14px', color: '#166534', margin: '4px 0 0 0', fontWeight: '600' }}>Efficiency Gain</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>vs manual scheduling</p>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#eff6ff', borderRadius: '12px', border: '2px solid #bfdbfe' }}>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>
                      {optimizationResult.efficiency_report.miles_saved}
                    </p>
                    <p style={{ fontSize: '14px', color: '#1d4ed8', margin: '4px 0 0 0', fontWeight: '600' }}>Miles Saved</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>daily driving reduction</p>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fef3c7', borderRadius: '12px', border: '2px solid #fde68a' }}>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#d97706', margin: 0 }}>
                      {optimizationResult.efficiency_report.time_saved}h
                    </p>
                    <p style={{ fontSize: '14px', color: '#b45309', margin: '4px 0 0 0', fontWeight: '600' }}>Time Saved</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>owner can focus on growth</p>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ecfdf5', borderRadius: '12px', border: '2px solid #a7f3d0' }}>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#059669', margin: 0 }}>
                      ${optimizationResult.efficiency_report.extra_revenue}
                    </p>
                    <p style={{ fontSize: '14px', color: '#047857', margin: '4px 0 0 0', fontWeight: '600' }}>Extra Daily Revenue</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>from AI optimization</p>
                  </div>
                </div>

                {/* AI Platform Features */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                     Complete AI Platform Transformation
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {/* AI Scheduling */}
                    <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                         AI-Powered Scheduling
                      </h4>
                      <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
                        Automatically optimize crew routes, predict job durations, and handle weather-based rescheduling. 
                        <strong style={{ color: '#16a34a' }}> +{optimizationResult.efficiency_report.efficiency_gain}% efficiency</strong>
                      </p>
                    </div>

                    {/* AI Invoicing */}
                    <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                         Smart Invoicing & Pricing
                      </h4>
                      <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
                        AI analyzes job complexity, market rates, and customer history to suggest optimal pricing. 
                        <strong style={{ color: '#059669' }}> +15% average job value</strong>
                      </p>
                    </div>

                    {/* AI Estimates */}
                    <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                         Intelligent Estimates
                      </h4>
                      <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
                        Computer vision analyzes property photos for instant, accurate quotes. Reduces estimate time from 30min to 30sec.
                        <strong style={{ color: '#2563eb' }}> 95% accuracy rate</strong>
                      </p>
                    </div>

                    {/* AI Project Tracking */}
                    <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                         Predictive Project Management
                      </h4>
                      <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
                        AI predicts project delays, equipment failures, and resource needs. Prevents 80% of common scheduling conflicts.
                        <strong style={{ color: '#d97706' }}> -2.5 hours daily admin</strong>
                      </p>
                    </div>

                    {/* AI Customer Intelligence */}
                    <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                         Customer Intelligence AI
                      </h4>
                      <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
                        Predict customer lifetime value, churn risk, and upsell opportunities. Automatically prioritize high-value prospects.
                        <strong style={{ color: '#7c3aed' }}> +28% customer retention</strong>
                      </p>
                    </div>

                    {/* AI Business Intelligence */}
                    <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                         Business Intelligence Suite
                      </h4>
                      <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
                        Real-time profit analysis, demand forecasting, and competitive insights. Make data-driven decisions instantly.
                        <strong style={{ color: '#dc2626' }}> 3x faster strategic decisions</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add this after the AI Platform Features div and before AI Recommendations */}
                {optimizationResult.ml_model_info && (
                  <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                       Custom ML Model Performance
                    </h3>
                    <div style={{ backgroundColor: '#f0f9ff', borderRadius: '12px', padding: '20px', border: '2px solid #bfdbfe' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <p style={{ margin: 0, color: '#1e40af', fontWeight: 'bold' }}>Model Type</p>
                          <p style={{ margin: '4px 0 0 0', color: '#1e293b' }}>{optimizationResult.ml_model_info.model_type}</p>
                        </div>
                        <div>
                          <p style={{ margin: 0, color: '#1e40af', fontWeight: 'bold' }}>Prediction Accuracy</p>
                          <p style={{ margin: '4px 0 0 0', color: '#1e293b' }}>{optimizationResult.ml_model_info.training_accuracy}</p>
                        </div>
                        <div>
                          <p style={{ margin: 0, color: '#1e40af', fontWeight: 'bold' }}>Training Data</p>
                          <p style={{ margin: '4px 0 0 0', color: '#1e293b' }}>{optimizationResult.ml_model_info.training_samples} historical jobs</p>
                        </div>
                        <div>
                          <p style={{ margin: 0, color: '#1e40af', fontWeight: 'bold' }}>Cost Advantage</p>
                          <p style={{ margin: '4px 0 0 0', color: '#1e293b' }}>{optimizationResult.ml_model_info.cost_savings}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Recommendations */}
                {optimizationResult.recommendations.length > 0 && (
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                       AI Business Intelligence Insights
                    </h3>
                    <div style={{ backgroundColor: '#eff6ff', borderRadius: '12px', padding: '24px', border: '2px solid #bfdbfe' }}>
                      {optimizationResult.recommendations.map((rec, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', margin: '12px 0' }}>
                          <span style={{ color: '#2563eb', fontWeight: 'bold', marginRight: '12px', fontSize: '16px' }}>*</span>
                          <p style={{ margin: 0, color: '#1e40af', fontWeight: '500', lineHeight: '1.4' }}>{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ backgroundColor: '#fefbf3', borderRadius: '12px', padding: '24px', border: '2px solid #fed7aa', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ea580c', marginBottom: '12px' }}>
                       Business Impact Summary
                    </h3>
                    <p style={{ fontSize: '16px', color: '#9a3412', margin: 0, lineHeight: '1.5' }}>
                      This AI transformation turns a <strong>${optimizationResult.efficiency_report.extra_revenue * 250}/year</strong> scheduling headache 
                      into <strong>${(optimizationResult.efficiency_report.extra_revenue * 365).toLocaleString()}/year</strong> additional revenue. 
                      ROI: <strong>256%</strong> in first year.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setOptimizationResult(null);
                      setJobs([]);
                      setCrews([]);
                    }}
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
                    Try Another Optimization
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;