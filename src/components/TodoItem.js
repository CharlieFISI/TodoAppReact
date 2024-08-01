import { Button, Checkbox, Label, Dropdown } from 'flowbite-react';
import { FaEllipsisH, FaBars, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { updateTodoStatus } from '../data';

const TodoItem = (props) => {
  const completedClass =
    props.status === 'completed' ? 'bg-gray-200 opacity-30' : 'bg-gray-100';

  const handleCheckboxChange = async () => {
    const newStatus = props.status === 'completed' ? 'pending' : 'completed';

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
            className="cursor-pointer border-none bg-transparent text-lg font-bold text-gray-600 hover:text-gray-700"
          >
            <FaBars />
          </Button>
          <Checkbox
            className="mr-2 focus:ring-transparent"
            defaultChecked={props.status === 'completed'}
            onChange={handleCheckboxChange}
          />
          <Label className="relative -top-px max-w-[calc(100%-40px)] break-words">
            {props.description}
          </Label>
        </div>
        <Dropdown
          label={<FaEllipsisH />}
          dismissOnClick={false}
          placement="right-start"
          inline
          arrowIcon={false}
          className="ml-2"
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
