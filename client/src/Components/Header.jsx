import { Button, Navbar, TextInput,NavbarCollapse,NavbarLink, NavbarToggle } from "flowbite-react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { Link,useLocation} from "react-router-dom";
const Header = () => {
    const path=useLocation().pathname;
  return (
    <div>
      <Navbar className="border-b-2">
        <Link
          to={"/"}
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            blogger
          </span>
          Hunt
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search...."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button className="w-12 h-10 lg:hidden" color='gray'>
            <AiOutlineSearch/>
        </Button>
        <div className="flex gap-2 md:order-2">
            <Button className="w-12 h-10 hidden sm:inline" color='gray' pill>  
                <FaMoon/>
            </Button>
            <Link to='/signin'>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800">
        Sign-In
      </Button>
            </Link>
            <NavbarToggle/>
        </div>
          <NavbarCollapse>
                <NavbarLink active={path==='/'} as={'div'}>
                    <Link to='/'>
                    Home
                    </Link>
                </NavbarLink>
                  <NavbarLink  active={path==='/about'} as={'div'}>
                    <Link to='/about'>
                    About
                    </Link>
                </NavbarLink>
                  <NavbarLink  active={path==='/project'} as={'div'}>
                    <Link to='/project'>
                    Project
                    </Link>
                </NavbarLink>
            </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Header;