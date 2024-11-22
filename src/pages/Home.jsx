import { Link } from "react-router-dom";

function Home() {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-4xl font-extrabold text-center text-gray-800">
            Welcome to Disease Detection
          </h1>
          <p className="text-lg text-center text-gray-600 mt-4 mb-6">
            Choose a disease detection option from the menu below and upload an image for detection.
          </p>
          <div className="flex justify-center space-x-4">
           
           <Link to={'/plant-disease'} >
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200">
              Plant Disease
            </button>
           </Link>

           <Link to={'/skin-disease'} >
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition duration-200">
              Skin Disease
            </button>
           </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;