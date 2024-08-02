const TodoBackground = ({ children }) => {
  return (
    <div className="flex size-full flex-row flex-wrap items-center overflow-hidden">
      {children}
    </div>
  );
};

export default TodoBackground;
