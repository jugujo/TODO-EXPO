import React from 'react'

import { Image, StyleSheet,  TouchableOpacity, View,  Text } from 'react-native';

import { Icon } from 'react-native-elements';

import { TaskType } from '@/constants/types'

const TaskItem = ({
    item,
    handleEdit,
    handleDelete,

}: {
    item: TaskType
    handleEdit: (item: TaskType) => void
    handleDelete: (id: string ) => void

}
) => {

  return (
    <div>
      <View style={styles.task}>
        <Text style={styles.taskText}>{item.text}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Icon name='edit' color='blue'>編集</Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name='delete' color='red'>削除</Icon>
          </TouchableOpacity>
        </View>
      </View>
    </div>
  )
}

const styles = StyleSheet.create({
    task: {
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:20,
      padding:10,
      backgroundColor:'#eeeeee',
      borderRadius:5,
    },
    taskText: {
      maxWidth:'80%',
    },
    buttonContainer: {
      flexDirection: 'row',
    },
  });

export default TaskItem
