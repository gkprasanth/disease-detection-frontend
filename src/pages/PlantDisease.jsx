import { useState } from "react";
import FileUpload from "../components/FileUpload";
import DiseaseInfo from "../components/DiseaseInfo";

function PlantDisease() {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [diseaseInfo, setDiseaseInfo] = useState(null);
    const [infoLoading, setInfoLoading] = useState(false);

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        setIsLoading(true);
        setError(null);
        const apiUrl = "https://asynclabs.org/predict_plant_disease";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
            setDiseaseInfo(null); // Reset previous disease info
        } catch (error) {
            console.error("Error uploading file:", error);
            setError("Failed to upload the file. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDiseaseInfo = async (diseaseName) => {
        setInfoLoading(true);
        const apiUrl = `https://asynclabs.org/plant_info?disease_name=${encodeURIComponent(
            diseaseName
        )}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setDiseaseInfo(data);
        } catch (error) {
            console.error("Error fetching disease info:", error);
            setError("Failed to fetch disease information. Please try again.");
        } finally {
            setInfoLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gradient-to-r from-green-400 to-blue-500 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-white mb-8">
                Plant Disease Detection
            </h1>
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
                    <h2 className="text-2xl font-semibold text-center text-gray-800">
                        Detection Results
                    </h2>
                    <div className="mt-4">
                        <p className="text-lg text-gray-800">
                            <strong>Disease Name:</strong>{" "}
                            <span className="text-green-600">
                                {result.name}
                            </span>
                        </p>
                        <p className="text-lg text-gray-800">
                            <strong>Confidence:</strong>{" "}
                            <span className="text-blue-600">
                                {parseFloat(result.confidence).toFixed(2)}%
                            </span>
                        </p>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-700">
                        Detailed Probabilities
                    </h3>
                    <ul className="list-disc pl-5 mt-2 text-gray-600">
                        {Object.entries(result.detailed_probabilities).map(
                            ([disease, probability]) => (
                                <li key={disease}>
                                    <span className="font-semibold">
                                        {disease}:
                                    </span>{" "}
                                    {(probability * 100).toFixed(2)}%
                                </li>
                            )
                        )}
                    </ul>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => fetchDiseaseInfo(result.name)}
                        disabled={infoLoading}
                    >
                        {infoLoading ? "Loading..." : "Get More Info"}
                    </button>
                </div>
            )}

            {diseaseInfo && (
                <div className="mt-6">
                    <DiseaseInfo
                        disease={result.name}
                        info={
                            <>
                                <p>
                                    <strong>Disease Info:</strong>
                                </p>
                                <p className="whitespace-pre-line">
                                    {diseaseInfo.disease_info}
                                </p>
                                <p>
                                    <strong>Cure Info:</strong>
                                </p>
                                <p className="whitespace-pre-line">
                                    {diseaseInfo.cure_info}
                                </p>
                            </>
                        }
                    />
                </div>
            )}
        </div>
    );
}

export default PlantDisease;
