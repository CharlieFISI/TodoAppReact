import supabase from './connection';

const getData = async () => {
  const result = await supabase
    .from('todo-bd')
    .select('*')
    .order('id', { ascending: true });
  if (result.error) {
    console.error('Error fetching data:', result.error);
    return 'error';
  } else {
    console.log('Data:', result.data);
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

const getTodoStatus = async (id) => {
  const result = await supabase.from('todo-bd').select('status').eq('id', id);

  if (result.error) {
    console.error('Error fetching status:', result.error);
    return 'error';
  }
  return result.data[0].status;
};

export { getData, updateTodoStatus, getTodoStatus };
