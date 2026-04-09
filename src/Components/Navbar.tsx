import logo from "../assets/main_logo.png";
import { FaPlus } from "react-icons/fa6";

type Props = {
  onOpenModal: () => void;
};

function Navbar({ onOpenModal }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 md:px-8 lg:px-10 xl:px-14 xl:py-3">
      <img
        src={logo}
        alt="Logo"
        className="w-32 h-auto sm:w-40 md:w-48 lg:w-56 xl:w-[250px]"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenModal}
          className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-medium transition"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
