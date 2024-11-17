from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load

app = Flask(__name__)
CORS(app)

# Load the trained model (Ensure the model is correctly placed in your project structure)
model_path = 'best_predictive_maintenance_model.joblib'
try:
    model = load(model_path)
    print(f"Model loaded from {model_path}")
except Exception as e:
    print(f"Error loading model: {str(e)}")

@app.route('/predict', methods=['POST'])
def predict_failure_type():
    data = request.json  # Get JSON data from the frontend
    try:
        # Validate input data
        required_fields = ['Type', 'Air_temperature', 'Process_temperature', 'Rotational_speed', 'Torque', 'Tool_wear']
        
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f"Missing required field: {field}"
                }), 400
        
        # Prepare the input for prediction
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

        # Return prediction result
        return jsonify({
            'success': True,
            'predicted_failure_type': predicted_failure_type
        })
    except Exception as e:
        # Return error if any exception occurs
        return jsonify({
            'success': False,
            'error': str(e)
        })

# Ensure the app runs with the correct host and port for deployment (especially on platforms like Heroku, Render, etc.)
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
