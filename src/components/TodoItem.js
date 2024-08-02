import { Button, Checkbox, Label, Dropdown } from 'flowbite-react';
import { FaEllipsisH, FaBars, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { updateTodoStatus } from '../data';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';

const TodoItem = (props) => {
  const completedClass =
    props.status === 'completed' ? 'bg-gray-200 bg-opacity-40' : 'bg-gray-100';

  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked;
    const newStatus = isChecked ? 'completed' : 'pending';

    const result = await updateTodoStatus(props.id, newStatus);

    if (result === 'error') {
      console.error('Error updating status');
    } else {
      props.onStatusChange(props.id, newStatus);
    }
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
      className={`my-1 flex w-full cursor-default items-center justify-between break-words rounded-md bg-white py-1 pl-px pr-2.5 shadow-sm ${completedClass}`}
    >
      <div className="flex items-center">
        <Button
          {...listeners}
          as="span"
          className="cursor-pointer border-none bg-transparent text-lg font-bold text-gray-400"
        >
          <FaBars />
        </Button>
        <Checkbox
          className={'mr-2 cursor-pointer focus:ring-transparent'}
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
      <Dropdown
        label={<FaEllipsisH className="text-gray-600" />}
        dismissOnClick={false}
        placement="right-start"
        inline
        arrowIcon={false}
        className={'ml-2'}
      >
        <Dropdown.Item icon={FaEdit} onClick={() => alert('Editando')}>
          Editar
        </Dropdown.Item>
        <Dropdown.Item icon={FaTrashAlt} onClick={() => alert('Eliminando')}>
          Eliminar
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default TodoItem;
