import React, { createContext, useEffect, useState } from 'react';
import { MdHowToVote, MdOutlinePayment, MdSpaceDashboard } from 'react-icons/md';
import { FaUsers, FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link, Outlet } from 'react-router-dom';
import Main_links from './MainLinks';
import LogoutButton from '@/pages/auth/Electorial/ElectoralLogout';

const mainlinks = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <MdSpaceDashboard className="text-xl" />,
  },
  {
    title: 'Register Candidate',
    path: 'register-candidate',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <FaUsers className="text-xl" />,
  },
  {
    title: 'Vote Count',
    path: 'vote-count',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <MdHowToVote className="text-xl" />,
  },
  {
    title: 'All Candidate',
    path: 'all-candidate',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <FaUsers className="text-xl" />,
  },
];

export const SidebarLinkContext = createContext();

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`h-screen relative overflow-y-auto pb-5 z-20 bg-gradient-to-b from-blue-800 to-yellow-700 text-gray-400 fixed lg:static ${
        isOpen ? 'w-64' : 'w-0'
      } transition-all duration-300`}>
      <div className="px-5 py-6 flex items-center justify-between">
        <h1 className="lg:text-4xl text-3xl font-bold text-white">
          <Link to={'/'}>
            Vote<span className="text-yellow-300">App</span>
          </Link>
        </h1>
        <button onClick={toggleSidebar} className="text-white text-2xl lg:hidden focus:outline-none" aria-label="Close Sidebar">
          <IoClose />
        </button>
      </div>

      <nav className="flex flex-col gap-4 mx-2 mt-6">
        {mainlinks.length > 0 &&
          mainlinks.map((link, index) => (
            <SidebarLinkContext.Provider value={link} key={index}>
              <Main_links link={link} />
            </SidebarLinkContext.Provider>
          ))}
      </nav>
      <div className="absolute bottom-2 left-2 w-[240px] mx-auto">
        <LogoutButton/>
      </div>
    </div>
  );
};

const Header = ({ toggleSidebar }) => {
  // const routeTitle = location.pathname.split('/') || 'Dashboard';

  let routeTitle = 'Dashboard';

  // Function to update routeTitle when pathname changes
  
  function updateRouteTitle() {
      const path = window.location.pathname;
      // Adding a leading slash if the path is empty (i.e., the root)
      routeTitle = path === '/' ? 'Dashboard' : path.split('/').filter(Boolean).join(' / ') || 'Dashboard';
  }

  // Initialize on page load
  updateRouteTitle();

  return (
    <header className="text-white z-10 top-0 sticky bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h2 className="text-gray-500 capitalize font-medium">{routeTitle}</h2>
        <div className="flex items-center space-x-2">
          <button onClick={toggleSidebar} className="text-2xl p-2 text-slate-900 lg:hidden focus:outline-none" aria-label="Open Sidebar">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col relative max-h-[100vh]">
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="overflow-x-hidden h-[100vh] flex-1 overflow-y-auto bg-slate-200 text-black">
        <Header toggleSidebar={toggleSidebar} />
          <Outlet />
          <div className="text-white flex justify-center items-center absolute bottom-8 right-5 h-[40px] w-[40px] bg-green-500 animate-bounce rounded-full">
            <FaWhatsapp />
          </div>
        </div>
      </div>
    </div>
  );
}
