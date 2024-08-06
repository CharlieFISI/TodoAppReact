import supabase from './connection';

const getData = async () => {
  const result = await supabase
    .from('todo-bd')
    .select('*')
    .order('id', { ascending: true });
  if (result.error) {
    console.error('Error fetching data:', result.error);
    return 'error';
  }
  return result;
};

const updateTodoStatus = async (id, newStatus) => {
  const { error } = await supabase
    .from('todo-bd')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) {
    console.error('Error updating status:', error);
    return 'error';
  }
  return 'success';
};

const createTodo = async (description, priority) => {
  const { data, error } = await supabase
    .from('todo-bd')
    .insert([{ description, priority, status: 'pending' }]);

  if (error) {
    console.error('Error creating todo:', error);
    return 'error';
  }
  return data;
};

export { getData, updateTodoStatus, createTodo };
