import { Button, Checkbox, Label, Dropdown } from 'flowbite-react';
import { FaEllipsisH, FaBars, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { updateTodoStatus } from '../data';

const TodoItem = (props) => {
  const completedClass =
    props.status === 'completed' ? 'bg-gray-200 bg-opacity-40' : 'bg-gray-100';

  const handleCheckboxChange = async (event) => {
    const isChecked = event.target.checked;
    const newStatus = isChecked ? 'completed' : 'pending';

    const result = await updateTodoStatus(props.id, newStatus);

    if (result === 'error') {
      console.error('Error updating status');
    } else {
      props.onStatusChange(props.id, newStatus);
    }
  };

  return (
    <li>
      <div
        className={`my-1 flex w-full items-center justify-between break-words rounded-md bg-white py-1 pl-px pr-2.5 shadow-sm ${completedClass}`}
      >
        <div className="flex items-center">
          <Button
            as="span"
            className="cursor-pointer border-none bg-transparent text-lg font-bold text-gray-400"
          >
            <FaBars />
          </Button>
          <Checkbox
            className={'mr-2 focus:ring-transparent'}
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
    </li>
  );
};

export default TodoItem;
