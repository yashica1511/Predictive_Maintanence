from flask import Flask, request, jsonify
from flask_cors import CORS 
from joblib import load
import pandas as pd

app = Flask(__name__)
CORS(app)
# Load the trained model
model_path = 'best_predictive_maintenance_model.joblib'
model = load(model_path)
print(f"Model loaded from {model_path}")

@app.route('/predict', methods=['POST'])
def predict_failure_type():
    data = request.json  # Get JSON data from the frontend
    try:
        # Extract features from JSON
        sample_data = pd.DataFrame([{
            'Type': data['Type'],
            'Air temperature [K]': data['Air_temperature'],
            'Process temperature [K]': data['Process_temperature'],
            'Rotational speed [rpm]': data['Rotational_speed'],
            'Torque [Nm]': data['Torque'],
            'Tool wear [min]': data['Tool_wear']
        }])

        # Predict failure type
        prediction = model.predict(sample_data)
        predicted_failure_type = prediction[0]

        # Send response back to frontend
        return jsonify({
            'success': True,
            'predicted_failure_type': predicted_failure_type
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
