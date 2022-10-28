import Image from "next/image";
import Logo from "../public/logo.svg";

const Header = () => {
  return (
    <div className="relative container mx-auto flex justify-between items-center px-4 py-5">
      <a href="#" className="text-xl font-serif flex items-center">
        <Image src={Logo} alt="logo" className="w-64" />
      </a>
      <ul className="flex justify-center items-center space-x-8">
        <li>
          <a href="#" className="text-lg hover:underline">
            Gardens
          </a>
        </li>
        <li>
          <a href="#" className="text-lg hover:underline">
            Garden owners
          </a>
        </li>
        <li>
          <a href="#" className="text-lg hover:underline">
            Garden planners
          </a>
        </li>
      </ul>
      <div className="flex justify-center items-center space-x-2">
        <div className="rounded-full w-12 h-12 lg:w-14 lg:h-14 border border-[rgba(0,0,0,0.25)] overflow-hidden cursor-pointer">
          <img src="<?php echo GPPT_URL . '/assets/images/avatar.png'; ?>" />
        </div>
      </div>
    </div>
  );
};

export default Header;
