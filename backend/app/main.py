from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.mock_data import MockDataService
from app.services.scheduler import ScheduleOptimizer

app = FastAPI(title="Landscaping AI Scheduler", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
mock_data = MockDataService()
scheduler = ScheduleOptimizer()

@app.get("/")
def read_root():
    return {"message": "Landscaping AI Scheduler API"}

@app.get("/api/demo-data")
def get_demo_data():
    """Get pre-loaded demo data for the presentation"""
    return {
        "jobs": mock_data.get_sample_jobs(),
        "crews": mock_data.get_sample_crews()
    }

@app.post("/api/optimize-schedule")
def optimize_schedule(request: dict):
    """Main optimization endpoint"""
    jobs = request.get("jobs", [])
    crews = request.get("crews", [])
    
    result = scheduler.optimize_schedule(jobs, crews)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)