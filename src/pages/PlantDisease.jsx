import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import DiseaseInfo from '../components/DiseaseInfo';

function PlantDisease() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    setIsLoading(true); // Start loading state
    setError(null); // Reset previous errors
    const apiUrl = "https://asynclabs.org/predict_plant_disease";
    console.log("API URL:", apiUrl);
    
    try {
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload the file. Please try again.');
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-green-400 to-blue-500 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Plant Disease Detection</h1>
      
      <div className="flex justify-center mb-8">
        <FileUpload onUpload={handleUpload} />
      </div>

      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin border-t-4 border-white w-12 h-12 border-solid rounded-full border-t-transparent"></div>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-center mt-4">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Detection Results</h2>
          <div className="mt-4">
            <p className="text-lg text-gray-800">
              <strong>Disease Name:</strong> <span className="text-green-600">{result.name}</span>
            </p>
            <p className="text-lg text-gray-800">
              <strong>Confidence:</strong> <span className="text-blue-600">{result.confidence}</span>
            </p>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-700">Detailed Probabilities</h3>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            {Object.entries(result.detailed_probabilities).map(([disease, probability]) => (
              <li key={disease}>
                <span className="font-semibold">{disease}:</span> {((probability) * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlantDisease;
