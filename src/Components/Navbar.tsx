import logo from "../assets/main_logo.png";
import { FaPlus } from "react-icons/fa6";

type Props = {
  onOpenModal: () => void;
};

function Navbar({ onOpenModal }: Props) {
  return (
    <div className="flex items-center justify-between px-14 py-3">
      <img src={logo} alt="Logo" className="w-[250px] h-auto" />

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
