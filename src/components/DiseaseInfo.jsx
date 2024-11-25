function DiseaseInfo({ disease, info }) {
  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{disease}</h2>
      <div className="text-lg text-gray-800">
        <p>{info}</p>
      </div>
    </div>
  );
}

export default DiseaseInfo;
