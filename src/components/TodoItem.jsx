import { useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Label,
  Dropdown,
  TextInput,
  Select,
  Modal
} from 'flowbite-react';
import {
  FaEllipsisH,
  FaBars,
  FaEdit,
  FaTrashAlt,
  FaMinus,
  FaAngleDown,
  FaAngleUp
} from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTodo } from '../hooks/useTodo';

const TodoItem = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  const completedClass =
    props.status === 'completed' ? 'bg-gray-200 bg-opacity-40' : 'bg-gray-100';
  const { editTodo, statusChangeTodo, deleteTodo } = useTodo();

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

  function onCloseModal() {
    setOpenModal(false);
    setErrorMessage('');
  }

  const handleTodoChange = async () => {
    const description = inputRef.current.value;
    const priority = selectRef.current.value;

    if (!description) {
      setErrorMessage('*Falta descripción');
      return;
    }

    editTodo(props.id, description, priority);
    onCloseModal();
  };

  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked;
    const newStatus = isChecked ? 'completed' : 'pending';
    statusChangeTodo(props.id, newStatus);
  };

  const handleDeleteToDo = async () => {
    deleteTodo(props.id);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`my-1 flex cursor-default snap-center snap-normal justify-between rounded-md bg-white py-1 pl-px pr-2.5 shadow-sm ${completedClass}`}
      >
        <div className="flex items-center overflow-hidden grow-0 justify-items-start">
          <Button
            {...attributes}
            {...listeners}
            as="span"
            className="text-lg font-bold text-gray-400 bg-transparent border-none cursor-move hover:accent-black focus:ring-transparent"
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
            className={`relative -top-px overflow-hidden whitespace-pre-line break-anywhere ${props.status === 'completed' ? 'line-through opacity-30' : ''}`}
          >
            {props.description}
          </Label>
        </div>
        <div className="flex items-center space-x-3 shrink-0 justify-items-end">
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
            <Dropdown.Item icon={FaEdit} onClick={() => setOpenModal(true)}>
              Editar
            </Dropdown.Item>
            <Dropdown.Item icon={FaTrashAlt} onClick={handleDeleteToDo}>
              Eliminar
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <Modal
        show={openModal}
        size="md"
        initialFocus={inputRef}
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Editar tarea
            </h3>
            <div>
              <div className="block mb-2">
                <Label htmlFor="description" value="Descripción de la tarea" />
              </div>
              <TextInput
                id="description"
                defaultValue={props.description}
                ref={inputRef}
                placeholder="Inserte la descripción de la tarea"
                required
              />
            </div>
            <div>
              <div className="block mb-2">
                <Label
                  htmlFor="priority"
                  value="Seleccione la prioridad de la tarea"
                />
              </div>
              <Select
                id="priority"
                defaultValue={props.priority}
                ref={selectRef}
                required
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </Select>
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleTodoChange}>Guardar</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoItem;
