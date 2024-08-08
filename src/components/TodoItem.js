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
import { updateTodo, updateTodoStatus, deleteTodo } from '../data';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TodoItem = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  const completedClass =
    props.status === 'completed' ? 'bg-gray-200 bg-opacity-40' : 'bg-gray-100';

  const getPriority = (priority) => {
    switch (priority) {
      case 'high':
        return <FaAngleUp className="size-6 text-red-600" />;
      case 'medium':
        return <FaMinus className="size-5 text-yellow-500" />;
      case 'low':
        return <FaAngleDown className="size-6 text-green-600" />;
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

    const result = await updateTodo(props.id, description, priority);

    if (result === 'error') {
      alert('Error actualizando la tarea');
    }
    props.onEdit(props.id, description, priority);
    onCloseModal();
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

  const handleDeleteToDo = async () => {
    const result = await deleteTodo(props.id);

    if (result === 'error') {
      alert('Error eliminando la tarea');
    }
    props.onDelete(props.id);
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
        className={`my-1 flex w-full cursor-default snap-center snap-normal justify-between break-words rounded-md bg-white py-1 pl-px pr-2.5 shadow-sm ${completedClass}`}
      >
        <div className="flex items-center justify-items-start">
          <Button
            {...attributes}
            {...listeners}
            as="span"
            className="cursor-move border-none bg-transparent text-lg font-bold text-gray-400 hover:accent-black focus:ring-transparent"
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
        <div className="flex items-center justify-items-end space-x-3">
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
              <div className="mb-2 block">
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
              <div className="mb-2 block">
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
