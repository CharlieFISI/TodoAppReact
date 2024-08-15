const today = new Date().toLocaleDateString('es-ES', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const TodoContent = ({ children }) => {
  return (
    <div className="flex size-full flex-col bg-gray-100 px-40 py-14">
      <p className="font-inter text-3xl font-semibold">Mis tareas</p>
      <p className="font-inter text-lg text-gray-500">Hoy es {today}</p>
      {children}
    </div>
  );
};

export default TodoContent;
