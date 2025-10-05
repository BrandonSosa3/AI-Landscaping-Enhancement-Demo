class MockDataService:
    def __init__(self):
        self.sample_jobs = [
            {
                "id": "job_1",
                "customer": "Wilson Family",
                "address": "1234 Oak Street, Austin TX",
                "service_type": "weekly_mowing",
                "estimated_duration": 90,
                "priority": "medium",
                "crew_size_needed": 2,
                "estimated_sqft": 1200,
                "tree_count": 2
            },
            {
                "id": "job_2",
                "customer": "City Parks Department", 
                "address": "Downtown Central Park, Austin TX",
                "service_type": "large_cleanup",
                "estimated_duration": 240,
                "priority": "high",
                "crew_size_needed": 3,
                "estimated_sqft": 3000,
                "tree_count": 5
            },
            {
                "id": "job_3",
                "customer": "Johnson Residence",
                "address": "5678 Pine Avenue, Austin TX", 
                "service_type": "tree_trimming",
                "estimated_duration": 180,
                "priority": "medium",
                "crew_size_needed": 2,
                "estimated_sqft": 1500,
                "tree_count": 8
            },
            {
                "id": "job_4",
                "customer": "Martinez Property",
                "address": "2100 Cedar Lane, Austin TX",
                "service_type": "weekly_mowing",
                "estimated_duration": 75,
                "priority": "low",
                "crew_size_needed": 2,
                "estimated_sqft": 900,
                "tree_count": 1
            },
            {
                "id": "job_5",
                "customer": "Sunset Office Complex",
                "address": "4500 Business Park Dr, Austin TX",
                "service_type": "large_cleanup",
                "estimated_duration": 300,
                "priority": "high",
                "crew_size_needed": 3,
                "estimated_sqft": 4200,
                "tree_count": 3
            },
            {
                "id": "job_6",
                "customer": "Thompson Family",
                "address": "7890 Maple Street, Austin TX",
                "service_type": "weekly_mowing",
                "estimated_duration": 60,
                "priority": "medium",
                "crew_size_needed": 1,
                "estimated_sqft": 800,
                "tree_count": 1
            },
            {
                "id": "job_7",
                "customer": "Green Valley HOA",
                "address": "3300 Valley View Rd, Austin TX", 
                "service_type": "tree_trimming",
                "estimated_duration": 210,
                "priority": "medium",
                "crew_size_needed": 2,
                "estimated_sqft": 1800,
                "tree_count": 12
            }
        ]
        
        self.sample_crews = [
            {
                "id": "crew_alpha",
                "name": "Team Alpha",
                "size": 3,
                "skills": ["mowing", "cleanup", "tree_work", "landscaping"],
                "available_hours": 8,
                "start_location": "Main Office"
            },
            {
                "id": "crew_bravo", 
                "name": "Team Bravo",
                "size": 2,
                "skills": ["mowing", "cleanup", "basic_trimming"], 
                "available_hours": 8,
                "start_location": "North Depot"
            },
            {
                "id": "crew_charlie",
                "name": "Team Charlie",
                "size": 2,
                "skills": ["mowing", "landscaping"],
                "available_hours": 6,
                "start_location": "South Station"
            }
        ]

        # Historical job data for ML training, 18 jobs we will train the model with 
        self.historical_job_data = [
            # Format: [lawn_sqft, tree_count, complexity_score, crew_size] -> actual_duration_minutes
            # Example: ([1200, 2, 2, 2], 90) means 1200 sqft property with 2 trees took 90 minutes
            ([800, 1, 1, 2], 75),    # Small simple lawn
            ([1200, 2, 2, 2], 90),   # Medium lawn with trees  
            ([2000, 0, 1, 3], 120),  # Large simple lawn
            ([1500, 4, 3, 2], 180),  # Medium complex property
            ([3000, 3, 2, 3], 200),  # Large property
            ([1000, 6, 4, 2], 240),  # Small but very complex
            ([2500, 2, 1, 3], 150),  # Large simple
            ([1800, 5, 3, 3], 210),  # Medium complex
            ([900, 1, 1, 2], 70),    # Small simple
            ([1600, 3, 2, 2], 110),  # Medium standard
            ([2200, 1, 2, 3], 130),  # Large medium
            ([1300, 7, 4, 2], 260),  # Complex tree work
            ([2800, 2, 1, 3], 160),  # Large simple
            ([1100, 4, 3, 2], 190),  # Small but complex
            ([1900, 1, 1, 2], 95),   # Medium simple
            ([4200, 5, 3, 3], 300),  # Large complex office
            ([800, 1, 1, 1], 60),    # Small simple single person
            ([1800, 12, 4, 2], 210), # Medium with many trees
        ]
    
    def get_sample_jobs(self):
        return self.sample_jobs
    
    def get_sample_crews(self):
        return self.sample_crews
    
    def get_historical_data(self):
        return self.historical_job_data

# Feature engineering function, turning the raw data into ML ready numerical features
# We are just giving each job a difficulty as the model cannot use strings so we assign a number to each service type
# You may be wondering why we are not using 2 here, you will see in the next feature
def get_job_features(job):
    """Extract features from job for ML model"""
    service_complexity = {
        'weekly_mowing': 1,
        'large_cleanup': 3, 
        'tree_trimming': 4
    }
    
    # here we are getting the estimated sqft from the job, if not provided we use the estimated duration * 15
    # This creates a fallback for jobs that don't have sqft provided, we assume 1 minute of work = 15 sqft
    estimated_sqft = job.get('estimated_sqft', job['estimated_duration'] * 15)
    # here we are getting the the tree count from the job, if not provided we assume 2 trees for tree trimming and 1 for mowing
    estimated_trees = job.get('tree_count', 2 if 'tree' in job['service_type'] else 1)
    # here we are getting the complexity of the job, if not provided we assume 2
    complexity = service_complexity.get(job['service_type'], 2)
    # We return the list of 4 values that we will use to train the model, they need to be in this specific order
    return [estimated_sqft, estimated_trees, complexity, job['crew_size_needed']]