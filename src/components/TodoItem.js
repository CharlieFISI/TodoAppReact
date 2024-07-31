import { Checkbox, Label } from 'flowbite-react';
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
        className={`my-1 flex w-[30vw] items-center justify-items-start break-words rounded-md bg-white px-5 py-2 shadow-sm ${completedClass}`}
      >
        <Checkbox
          className="mr-2 focus:ring-transparent"
          defaultChecked={props.status === 'completed'}
          onChange={handleCheckboxChange}
        />
        <Label className="max-w-[calc(100%-40px)] break-words">
          {props.description}
        </Label>
        <button className="size-5 cursor-pointer border-none bg-transparent text-lg font-bold text-red-600 hover:text-red-700">
          X
        </button>
        <button className="ml-2 cursor-pointer border-none bg-transparent text-lg font-bold text-gray-600 hover:text-gray-700">
          ...
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
