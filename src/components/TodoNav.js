import { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import {
  FaBook,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaInfoCircle,
  FaList,
  FaSearch,
  FaTimes
} from 'react-icons/fa';

const TodoNav = () => {
  const [sidebarWidth, setSidebarWidth] = useState('w-64'); // Ancho inicial

  const toggleSidebar = () => {
    setSidebarWidth(sidebarWidth === 'w-64' ? 'w-0' : 'w-64');
  };
  return (
    <div className="flex h-screen bg-[#f9fafb]">
      <div
        className={`transition-[width] duration-300 ${sidebarWidth} overflow-hidden`}
      >
        <Sidebar className="flex flex-col justify-between">
          <Sidebar.Logo href="#" img="favicon.ico" imgAlt="TodoApp">
            TodoApp
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <div className="relative mb-4 w-full">
                <input
                  className="w-full rounded-md border border-gray-300 p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="Buscar tareas"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <Sidebar.Item href="#" icon={FaList}>
                Todos
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={FaCheck}>
                Completados
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={FaTimes}>
                Pendientes
              </Sidebar.Item>
              <Sidebar.Collapse icon={FaFilter} label="Importancia">
                <Sidebar.Item href="#">Alta</Sidebar.Item>
                <Sidebar.Item href="#">Media</Sidebar.Item>
                <Sidebar.Item href="#">Baja</Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={FaBook}>
                Documentación
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={FaInfoCircle}>
                Ayuda
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <button
        onClick={toggleSidebar}
        className="flex h-full flex-col justify-center bg-gray-300 outline-none"
      >
        <div className="my-auto self-end rounded-full bg-transparent p-0.5">
          {sidebarWidth === 'w-64' ? <FaChevronLeft /> : <FaChevronRight />}
        </div>
      </button>
    </div>
  );
};

export default TodoNav;
