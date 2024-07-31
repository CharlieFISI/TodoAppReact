const TodoBackground = ({ children }) => {
  return (
    <div className="flex h-screen w-screen flex-row flex-wrap items-center">
      {children}
    </div>
  );
};

export default TodoBackground;
