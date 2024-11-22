function DiseaseInfo({ disease, info }) {
    return (
      <div className="bg-gray-100 p-4 rounded shadow">
        <h2 className="text-lg font-bold">{disease}</h2>
        <p>{info}</p>
      </div>
    );
  }
  
  export default DiseaseInfo;
  