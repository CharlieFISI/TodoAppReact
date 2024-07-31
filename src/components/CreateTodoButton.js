import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';

const CreateTodoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (event) => {
    if (event.target.className === 'modal') {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button
        color="dark"
        pill
        onClick={handleOpenModal}
        className="fixed bottom-10 right-10 box-border inline-flex size-16 items-center justify-center overflow-hidden rounded-full border-0 p-0 shadow-xl hover:translate-y-0.5 hover:shadow-lg hover:transition-colors hover:duration-200 hover:ease-in-out active:translate-y-1 active:shadow-md"
      >
        <FaPlus className="size-8 text-slate-100" />
      </Button>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          className="fixed left-0 top-0 flex size-full items-center justify-center bg-black/50"
          onClick={handleCloseModal}
        >
          <div className="w-1/2 max-w-lg rounded-md bg-white p-5 shadow-sm">
            <Modal.Header>Agrega un Todo</Modal.Header>
            <Modal.Body>
              <p>Introduce los datos del Todo</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setIsModalOpen(false)}>Agregar</Button>
              <Button color="gray" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateTodoButton;
