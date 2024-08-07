import { Button, Checkbox, Label, Dropdown } from 'flowbite-react';
import {
  FaEllipsisH,
  FaBars,
  FaEdit,
  FaTrashAlt,
  FaMinus,
  FaAngleDown,
  FaAngleUp
} from 'react-icons/fa';
import { updateTodoStatus } from '../data';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';

const TodoItem = (props) => {
  const completedClass =
    props.status === 'completed' ? 'bg-gray-200 bg-opacity-40' : 'bg-gray-100';

  const getPriority = (priority) => {
    switch (priority) {
      case 'high':
        return <FaAngleUp className="text-red-600 size-6" />;
      case 'medium':
        return <FaMinus className="text-yellow-500 size-5" />;
      case 'low':
        return <FaAngleDown className="text-green-600 size-6" />;
      default:
        return 'Desconocida';
    }
  };

  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked;
    const newStatus = isChecked ? 'completed' : 'pending';

    const result = await updateTodoStatus(props.id, newStatus);

    if (result === 'error') {
      alert('Error actualizando la tarea');
    }
    props.onStatusChange(props.id, newStatus);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      modifiers: [restrictToParentElement]
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      className={`my-1 flex w-full cursor-default snap-center snap-normal justify-between break-words rounded-md bg-white py-1 pl-px pr-2.5 shadow-sm ${completedClass}`}
    >
      <div className="flex items-center justify-items-start">
        <Button
          {...listeners}
          as="span"
          className="text-lg font-bold text-gray-400 bg-transparent border-none cursor-pointer hover:accent-black"
        >
          <FaBars />
        </Button>
        <Checkbox
          className="mr-2 cursor-pointer focus:ring-transparent"
          defaultChecked={props.status === 'completed'}
          onChange={handleCheckboxChange}
          color="dark"
        />
        <Label
          className={`relative -top-px max-w-[calc(100%-40px)] break-words ${props.status === 'completed' ? 'line-through opacity-30' : ''}`}
        >
          {props.description}
        </Label>
      </div>
      <div className="flex items-center space-x-3 justify-items-end">
        <Label className="grid size-6 place-content-center">
          {getPriority(props.priority)}
        </Label>
        <Dropdown
          label={<FaEllipsisH className="text-gray-600" />}
          dismissOnClick={false}
          placement="right-start"
          inline
          arrowIcon={false}
        >
          <Dropdown.Item icon={FaEdit} onClick={() => alert('Editando')}>
            Editar
          </Dropdown.Item>
          <Dropdown.Item icon={FaTrashAlt} onClick={() => alert('Eliminando')}>
            Eliminar
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default TodoItem;
