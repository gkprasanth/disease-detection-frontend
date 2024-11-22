import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">

        <Link  to={'/'} >
        <h1 className="cursor-pointer text-2xl font-bold">Disease Detection</h1>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/plant-disease" className="hover:underline">Plant Disease</Link>
          <Link to="/skin-disease" className="hover:underline">Skin Disease</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
