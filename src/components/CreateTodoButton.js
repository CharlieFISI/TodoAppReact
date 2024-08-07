import { useRef, useState } from 'react';
import { Button, Modal, Label, TextInput, Select } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
import { createTodo } from '../data';

const CreateTodoButton = ({ setTodos = () => {} }) => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  function onCloseModal() {
    setOpenModal(false);
    setErrorMessage('');
  }

  const handleCreateTodo = async () => {
    const description = inputRef.current.value;
    const priority = selectRef.current.value;

    if (!description || !priority) {
      setErrorMessage('*Falta descripción');
      return;
    }

    const result = await createTodo(description, priority);

    if (result === 'error') {
      alert('Error creando la tarea');
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      { description, priority, status: 'pending' }
    ]);

    inputRef.current.value = '';
    selectRef.current.value = 'low';
    setOpenModal(false);
    setErrorMessage('');
  };

  return (
    <>
      <Button
        color="dark"
        pill
        onClick={() => setOpenModal(true)}
        className="fixed bottom-10 right-10 box-border inline-flex size-16 items-center justify-center overflow-hidden rounded-full border-0 p-0 shadow-xl hover:translate-y-0.5 hover:shadow-lg hover:transition-colors hover:duration-200 hover:ease-in-out active:translate-y-1 active:shadow-md"
      >
        <FaPlus className="size-8 text-slate-100" />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        initialFocus={inputRef}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Añade una tarea
            </h3>
            <div>
              <div className="block mb-2">
                <Label htmlFor="description" value="Descripción de la tarea" />
              </div>
              <TextInput
                id="description"
                ref={inputRef}
                placeholder="Inserte la descripción de la tarea"
                helperText="Ejemplo: Comprar leche"
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
              <Select id="priority" ref={selectRef} required>
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
          <Button onClick={handleCreateTodo}>Aceptar</Button>
          <Button
            color="gray"
            onClick={() => {
              setOpenModal(false);
              setErrorMessage('');
            }}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTodoButton;
