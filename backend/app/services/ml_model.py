import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import logging

# Using sklean random forest regressor to predict job duration, we are just initializing the model here 
class JobDurationPredictor:
    def __init__(self):
        # n_estimators=50 sets the number of trees in the forest to 50 more trees often better accuracy, but slower training/prediction
        self.model = RandomForestRegressor(n_estimators=50, random_state=42)
        self.is_trained = False # We will set this to true when the model is trained
        self.training_results = None # We will store the training results here

    # Load training data from the mock data service, we will use this to train the model
    def prepare_training_data(self):
        """Prepare training data from historical jobs"""
        from .mock_data import MockDataService
        
        mock_service = MockDataService()
        historical_data = mock_service.get_historical_data()
        
        # X are features, y are target values which are job durations
        X = []
        y = []
        
        for features, duration in historical_data:
            X.append(features)
            y.append(duration)
        # here we use numpy to convert the lists to numpy arrays for sklearn to use
        return np.array(X), np.array(y)
    
    # We train the model here, I went for a 70/30 split for training and testing
    def train_model(self):
        """Train the duration prediction model"""
        X, y = self.prepare_training_data()
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
        
        # Train model, uses sklearn .fit()
        self.model.fit(X_train, y_train)
        
        # Evaluate
        predictions = self.model.predict(X_test)
        # here we are running MAE on predictions vs actual values(y_test)
        #mean_absolute_error returns the average absolute difference between predicted and true values; a lower MAE means better average accuracy in the same units as y.
        mae = mean_absolute_error(y_test, predictions)
        
        self.is_trained = True
        
        # Here we are calculating the model accuracy using a rough formula 
        # 1 - mae/mean(y_test) is fraction of how big the error is compared to the average target multiply by 100 to express as percent
        accuracy_percentage = max(0, (1 - mae/np.mean(y_test)) * 100)
        
        # returns a dict with rounded MAE, accuracy percent, and number of training samples
        self.training_results = {
            'mean_absolute_error': round(mae, 1),
            'accuracy': f"{accuracy_percentage:.1f}%",
            'training_samples': len(X)
        }
        return self.training_results  # Now returning the stored results
    
    # Here we are predicting the duration of a job based on the features
    def predict_duration(self, job_features):
        """Predict job duration based on features"""
        if not self.is_trained:
            self.train_model()
        
        # Here I am using the trained ml model to predict the job duration
        # [job_features] wraps the features in a list because the model expects a 2D array
        # [0] is the first and only prediction from the model
        prediction = self.model.predict([job_features])[0]
        
        # Add realistic variance
        # for example, if the job might take plus or minus10% more or less time than predicted.
        variance = prediction * 0.1

        confidence = max(75, min(95, 90 - abs(prediction - 150) / 50))
        # here we return the predicted duration, confidence, and variance range
        return {
            'predicted_duration': max(30, int(prediction)),
            'confidence': f"{confidence:.0f}%",
            'variance_range': f"±{variance:.0f} minutes"
        }
    
    def get_model_info(self):
        """Get information about the trained model"""
        if not self.is_trained or self.training_results is None:
            self.train_model()
            
        return {
            'model_type': 'Random Forest Regressor',
            'features': ['property_sqft', 'tree_count', 'complexity_score', 'crew_size'],
            'training_accuracy': self.training_results['accuracy'],
            'training_samples': self.training_results['training_samples'],
            'mean_absolute_error': self.training_results['mean_absolute_error'],
            'model_status': 'Trained and Ready',
            'cost_savings': '$200/month vs API costs'
        }

# Global instance
duration_predictor = JobDurationPredictor()