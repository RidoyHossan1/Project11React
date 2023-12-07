import React, {useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";



export default function Navbar(props){
  let navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };
  
  const handleLogout =() => {
    localStorage.removeItem('token');
    props.showAlert("Logged Out", "danger");
    navigate("/login");
  }
    return (
      <header className="shadow sticky z-50 top-0 text-xl">
        <nav className="navbar navbar-expand-lg bg-white border-gray-200 px-4 lg:px-6 py-2.5 relative">
          <div className="flex flex-wrap justify-between items-center mx-auto w-full ">

          <Link to="#" className="lg:flex mx-4 hidden" id="logo-txt">
              <img src="./logo.png" className="mr-3 h-12 my-auto" alt="Logo" />
              <p className="m-auto">iNoteBook</p>
            </Link>


                          <div className="flex justify-between w-full lg:hidden">
                                      <Link to="#" className="flex items-center">
                                        <img src="./logo.png" className="mr-3 h-12 my-auto" alt="Logo" />
                                      </Link>
                                          <button 
                                          onClick={toggleMenu}
                                          className="navbar-toggler" 
                                          type="button"
                                          >
                                          
                                            <span className="navbar-toggler-icon"></span>
                                          </button>
                          </div>

            <div
              className="hidden justify-between -mt-8 items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li className="flex space-x-5"> 
                     <NavLink to="/" className={({ isActive }) => `${ isActive ? "text-orange-700" : "text-gray-700" } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } > Home </NavLink> </li>
                <li> <NavLink to="/about" className={({ isActive }) => `${ isActive ? "text-orange-700" : "text-gray-700" } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } >About</NavLink></li>







                {!localStorage.getItem('token')?(<>
                  <li> <NavLink to="/login" className={({ isActive }) => `${ isActive ? "text-orange-700" : "text-gray-700" } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } >Login</NavLink></li>
                <li> <NavLink to="/signup" className={({ isActive }) => `${ isActive ? "text-orange-700" : "text-gray-700" } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } >Sign Up</NavLink></li>
                </>
                )
                :
                 (<>
                  <li> <NavLink to="/userdetails" className={({ isActive }) => `${ isActive ? "text-orange-700" : "text-gray-700" } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } >User Details</NavLink></li>

                 <li> <NavLink onClick={handleLogout} className={` block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } >Log Out</NavLink></li>
                 </>)
                }





              </ul>
            </div>


            <div
              className={`lg:hidden flex-row items-center w-full flex ${isMenuOpen ? "block" : "hidden"} bg-[#edf2f4] `}
              id="mobile-menu-mini"
            >
              <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0 w-full text-white mx-5">
                <li className="flex space-x-5"> 
                     <NavLink to="/" className={({ isActive }) => `${ isActive ? "text-orange-700" : "text-gray-700" } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } > Home </NavLink> </li>
                <li> <NavLink to="/about" className={({ isActive }) => `${ isActive ? "text-orange-700" : "text-gray-700" } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } >About</NavLink></li>





                {!localStorage.getItem('token')?(<>
                  <li> <NavLink to="/login" className={({ isActive }) => `${ isActive ? "text-orange-700" : "text-gray-700" } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } >Login</NavLink></li>
                <li> <NavLink to="/signup" className={({ isActive }) => `${ isActive ? "text-orange-700" : "text-gray-700" } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } >Sign Up</NavLink></li>
                </>)
                :
                 (
                 <li> <NavLink onClick={handleLogout} className={({ isActive }) => `${ isActive ? "text-orange-700" : "text-gray-700" } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } >Log Out</NavLink></li>
                 )
                }
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
}