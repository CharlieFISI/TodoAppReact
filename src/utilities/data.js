import supabase from './connection';

const getData = async () => {
  const { data, error } = await supabase
    .from('todo-bd')
    .select('*')
    .order('id', { ascending: true });
  if (error) {
    console.error('Error fetching data:', error);
    return 'error';
  }
  return data;
};

const createData = async (description, priority) => {
  const { data, error } = await supabase
    .from('todo-bd')
    .insert([{ description, priority, status: 'pending' }]);

  if (error) {
    console.error('Error creating todo:', error);
    return 'error';
  }
  return data;
};

const updateData = async (id, newDescription, newPriority) => {
  const { error } = await supabase
    .from('todo-bd')
    .update({ description: newDescription, priority: newPriority })
    .eq('id', id);

  if (error) {
    console.error('Error updating todo:', error);
    return 'error';
  }
  return 'success';
};

const updateDataStatus = async (id, newStatus) => {
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

const deleteData = async (id) => {
  const { error } = await supabase.from('todo-bd').delete().eq('id', id);

  if (error) {
    console.error('Error deleting todo:', error);
    return 'error';
  }
  return 'success';
};

export { getData, updateData, updateDataStatus, createData, deleteData };
