import { useEffect, useState } from 'react';
import { Sidebar, TextInput } from 'flowbite-react';
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
import { useTodo } from '../hooks/useTodo';

const TodoNav = () => {
  const [sidebarWidth, setSidebarWidth] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const { searchTodos, filterTodosStatus, filterTodosPriority } = useTodo();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    searchTodos(search);
  }, [search, searchTodos]);

  return (
    <div className="flex h-full flex-row bg-[#f9fafb]">
      <div
        className={`transition-[width] duration-300 ${sidebarWidth ? 'w-64' : 'w-0'} overflow-hidden`}
      >
        <Sidebar className="flex flex-col justify-between">
          <Sidebar.Logo href="#" img="favicon.ico" imgAlt="TodoApp">
            TodoApp
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <TextInput
                icon={FaSearch}
                placeholder="Buscar Tareas"
                sizing="sm"
                color="gray"
                value={search}
                onChange={handleSearch}
              />
              <Sidebar.Item
                href="#"
                icon={FaList}
                className={
                  statusFilter === 'all' && priorityFilter === 'all'
                    ? 'bg-gray-200 font-semibold'
                    : ''
                }
                active={statusFilter === 'all' && priorityFilter === 'all'}
                onClick={() => {
                  filterTodosStatus('all');
                  filterTodosPriority('all');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                  setSearch('');
                }}
              >
                Todos
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaCheck}
                className={
                  statusFilter === 'completed'
                    ? 'bg-gray-200 font-semibold'
                    : ''
                }
                active={statusFilter === 'completed'}
                onClick={() => {
                  filterTodosStatus('completed');
                  filterTodosPriority('all');
                  setStatusFilter('completed');
                  setPriorityFilter('all');
                  setSearch('');
                }}
              >
                Completados
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaTimes}
                className={
                  statusFilter === 'pending' ? 'bg-gray-200 font-semibold' : ''
                }
                active={statusFilter === 'pending'}
                onClick={() => {
                  filterTodosStatus('pending');
                  filterTodosPriority('all');
                  setStatusFilter('pending');
                  setPriorityFilter('all');
                  setSearch('');
                }}
              >
                Pendientes
              </Sidebar.Item>
              <Sidebar.Collapse icon={FaFilter} label="Importancia">
                <Sidebar.Item
                  href="#"
                  className={
                    priorityFilter === 'high' ? 'bg-gray-200 font-semibold' : ''
                  }
                  onClick={() => {
                    filterTodosPriority('high');
                    setPriorityFilter('high');
                  }}
                >
                  Alta
                </Sidebar.Item>
                <Sidebar.Item
                  href="#"
                  className={
                    priorityFilter === 'medium'
                      ? 'bg-gray-200 font-semibold'
                      : ''
                  }
                  onClick={() => {
                    filterTodosPriority('medium');
                    setPriorityFilter('medium');
                  }}
                >
                  Media
                </Sidebar.Item>
                <Sidebar.Item
                  href="#"
                  className={
                    priorityFilter === 'low' ? 'bg-gray-200 font-semibold' : ''
                  }
                  onClick={() => {
                    filterTodosPriority('low');
                    setPriorityFilter('low');
                  }}
                >
                  Baja
                </Sidebar.Item>
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
        onClick={() => setSidebarWidth((value) => !value)}
        className="flex justify-center bg-gray-300 outline-none"
      >
        <div className="my-auto self-end rounded-full bg-transparent p-0.5">
          {sidebarWidth ? <FaChevronLeft /> : <FaChevronRight />}
        </div>
      </button>
    </div>
  );
};

export default TodoNav;
