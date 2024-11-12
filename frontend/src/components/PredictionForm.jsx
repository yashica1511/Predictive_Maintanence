import React, { useState } from 'react';
import axios from 'axios';

function PredictionForm() {
  // State to store the input values and the response
  const [type, setType] = useState('');
  const [airTemperature, setAirTemperature] = useState('');
  const [processTemperature, setProcessTemperature] = useState('');
  const [rotationalSpeed, setRotationalSpeed] = useState('');
  const [torque, setTorque] = useState('');
  const [toolWear, setToolWear] = useState('');
  const [predictedFailureType, setPredictedFailureType] = useState(null);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      Type: type,
      Air_temperature: airTemperature,
      Process_temperature: processTemperature,
      Rotational_speed: rotationalSpeed,
      Torque: torque,
      Tool_wear: toolWear,
    };

    try {
      const response = await axios.post('http://localhost:5000/predict', requestData);

      if (response.data.success) {
        setPredictedFailureType(response.data.predicted_failure_type);
        setError(null);
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError('Error making prediction');
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-white p-4" 
      style={{ 
        backgroundImage: 'url("/Pred.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="bg-white p-8 rounded-lg shadow-2xl border-2 border-white max-w-4xl w-full z-10 mt-8">
        <h1 className="text-3xl mb-4 font-semibold text-center text-blue-700">Predictive Maintenance</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter type"
                required
                style={{ color: 'black', backgroundColor: '#f7f7f7' }}
              />
            </div>

            <div>
              <label htmlFor="airTemperature" className="block text-sm font-medium text-gray-700">Air Temperature (K)</label>
              <input
                type="number"
                id="airTemperature"
                value={airTemperature}
                onChange={(e) => setAirTemperature(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Air Temperature"
                required
                style={{ color: 'black', backgroundColor: '#f7f7f7' }}
              />
            </div>

            <div>
              <label htmlFor="processTemperature" className="block text-sm font-medium text-gray-700">Process Temperature (K)</label>
              <input
                type="number"
                id="processTemperature"
                value={processTemperature}
                onChange={(e) => setProcessTemperature(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Process Temperature"
                required
                style={{ color: 'black', backgroundColor: '#f7f7f7' }}
              />
            </div>

            <div>
              <label htmlFor="rotationalSpeed" className="block text-sm font-medium text-gray-700">Rotational Speed (rpm)</label>
              <input
                type="number"
                id="rotationalSpeed"
                value={rotationalSpeed}
                onChange={(e) => setRotationalSpeed(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Rotational Speed"
                required
                style={{ color: 'black', backgroundColor: '#f7f7f7' }}
              />
            </div>

            <div>
              <label htmlFor="torque" className="block text-sm font-medium text-gray-700">Torque (Nm)</label>
              <input
                type="number"
                id="torque"
                value={torque}
                onChange={(e) => setTorque(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Torque"
                required
                style={{ color: 'black', backgroundColor: '#f7f7f7' }}
              />
            </div>

            <div>
              <label htmlFor="toolWear" className="block text-sm font-medium text-gray-700">Tool Wear (min)</label>
              <input
                type="number"
                id="toolWear"
                value={toolWear}
                onChange={(e) => setToolWear(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Tool Wear"
                required
                style={{ color: 'black', backgroundColor: '#f7f7f7' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Predict Failure Type
          </button>
        </form>

        {predictedFailureType && (
          <div className="mt-6 p-4 text-center text-lg font-medium text-blue-700 border border-blue-700 rounded-lg shadow-lg">
            <span className="text-xl">Predicted Failure Type: </span><strong>{predictedFailureType}</strong>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 text-center text-lg font-medium text-red-500 border border-red-500 rounded-lg shadow-lg">
            <span className="text-xl">Error: </span><strong>{error}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictionForm;
