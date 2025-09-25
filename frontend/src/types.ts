export interface Job {
    id: string;
    customer: string;
    address: string;
    service_type: string;
    estimated_duration: number;
    priority: string;
    crew_size_needed: number;
  }
  
  export interface Crew {
    id: string;
    name: string;
    size: number;
    skills: string[];
    available_hours: number;
    start_location: string;
  }
  
  export interface OptimizationResult {
    status: string;
    routes: Route[];
    efficiency_report: EfficiencyReport;
    recommendations: string[];
  }
  
  export interface Route {
    crew_id: string;
    crew_name: string;
    jobs: Job[];
    total_drive_time: string;
    total_work_time: string;
    efficiency_score: number;
  }
  
  export interface EfficiencyReport {
    efficiency_gain: number;
    miles_saved: number;
    time_saved: number;
    extra_revenue: number;
    success_probability: number;
  }

  export interface OptimizationResult {
    status: string;
    routes: Route[];
    efficiency_report: EfficiencyReport;
    recommendations: string[];
    ml_model_info?: MLModelInfo;  // Add this line
  }
  
  // Add this new interface
  export interface MLModelInfo {
    model_type: string;
    features: string[];
    training_accuracy: string;
    training_samples: number;
    model_status: string;
    cost_savings: string;
  }