import { Link } from "react-router";
import {PlusIcon} from "lucide-react"
const NavBar = () => {
  return (
    <header className="bg-base-300 py-2 border-b-2 border-b-green-500">
      <div className="mx-auto max-w-2xl flex justify-between items-center">
      <div className="font-mono font-bold text-primary text-3xl tracking-tight">
        <h1>Welcome to the Note Maker</h1>
      </div>
      <nav className="flex items-center gap-4">
        {/*<Link to="/" className="my-2 p-2 flex items-center gap-1 rounded-btn bg-green-500 text-black hover:bg-green-700 transition-colors duration-100"><span>Home</span></Link>*/}
        <Link to="/create" className="my-2 p-2 flex items-center gap-1 rounded-btn bg-green-500 text-black hover:bg-green-700 transition-colors duration-100"><PlusIcon className="size-5"/><span>New note</span></Link>
        {/*<Link to="/note/:id" className="my-2 p-2 flex items-center gap-1 rounded-btn bg-green-500 text-black hover:bg-green-700 transition-colors duration-100"><span>Note</span></Link>*/}
      </nav>
      </div>
    </header>
  );
};

export default NavBar;
