import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">CollabHub</Link>
        <div className="space-x-4">
          <Link to="/explore" className="hover:underline">Explore</Link>
          <Link to="/collaborate" className="hover:underline">Collaborate</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
