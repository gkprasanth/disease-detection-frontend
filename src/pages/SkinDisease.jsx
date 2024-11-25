import { useState } from 'react';
import FileUpload from '../components/FileUpload';

function SkinDisease() {
  const [result, setResult] = useState(null);
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    setIsLoading(true); // Start loading state
    setError(null); // Reset any previous errors

    try {
      const response = await fetch('https://asynclabs.org/predict_skin_disease', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);

      // Fetch additional disease info based on the predicted disease name
      const diseaseResponse = await fetch(`http://localhost:5000/skin_info?disease_name=${data.status}`);
      if (diseaseResponse.ok) {
        const diseaseData = await diseaseResponse.json();
        setDiseaseInfo(diseaseData);
      } else {
        throw new Error('Failed to fetch disease information.');
      }

    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload the file. Please try again.');
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-purple-400 to-pink-500 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Skin Disease Detection</h1>

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
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Detection Results</h2>
          <div className="mt-4">
            <p className="text-lg text-gray-800">
              <strong>Disease Name:</strong> <span className="text-teal-600">{result.status}</span>
            </p>
            <p className="text-lg text-gray-800">
              <strong>Confidence:</strong> <span className="text-blue-600">{(result.detailed_probabilities[0].Probability * 100).toFixed(2)}%</span>
            </p>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-700">Detailed Probabilities</h3>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            {result.detailed_probabilities.map((probability, index) => (
              <li key={index}>
                <span className="font-semibold">{probability.Disease}:</span> {(probability.Probability * 100).toFixed(2)}%
              </li>
            ))}
          </ul>

          {/* Display additional disease information */}
          {diseaseInfo && (
            <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Disease Information</h3>
              <p className="text-lg text-gray-800">
                <strong>About {diseaseInfo.disease_name}:</strong> {diseaseInfo.disease_info}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Recommended Cure:</strong> {diseaseInfo.cure_info}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SkinDisease;
