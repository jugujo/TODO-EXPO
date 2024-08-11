import { StyleSheet, TouchableOpacity, View, TextInput, Text } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { useState } from 'react';
import TaskItem from '@/components/TaskItem';

import { TaskType } from '@/constants/types'

export default function HomeScreen() {

  const [taskText, setTaskText] = useState<string>("");
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTaskId, setEditedTaskId] = useState<string>('');

  const handleSaveTask = () => {

    if(isEditing){
      setTasks(tasks.map((task) => (task.id === editedTaskId ? {...task, text:taskText} : task)))
      setIsEditing(false)
    }else{
      const newTask = {id: Date.now().toString(), text: taskText};
      setTasks([...tasks, newTask]);
    }
    setTaskText('');


  }

  const handleEditTask = (item: TaskType) => {
    setTaskText(item.text?item.text:'');
    setIsEditing(true);
    setEditedTaskId(item.id?item.id:'');
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    
  }

  const renderTask = ({item}: any) => {
    return (
      <TaskItem item={item} handleEdit={handleEditTask} handleDelete={handleDeleteTask} />
    )
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Todoアプリ</Text>
      <TextInput placeholder='タスク入力' style={styles.input} onChangeText={setTaskText} value={taskText}/>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
        <Text>{isEditing? '編集' : '追加'}</Text>
      </TouchableOpacity>

      <FlatList data={tasks} renderItem={renderTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth:2,
    borderColor: '#ccceee',
    padding: 10,
    marginBottom: 10,
    borderRadius:6,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius:5,
    marginBottom:20
  },
});
