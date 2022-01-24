import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import SingleTodo from './components/SingleTodo';
import AsyncStorage  from '@react-native-async-storage/async-storage';


export default function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  const handleTodo = () => {

    if (!todo) return;

    setTodos([{ id: Date.now(), text: todo },...todos]);
    setTodo('');
    Keyboard.dismiss();
    showToast();
  };

  const showToast = () =>{
      ToastAndroid.show("Task Added Successfully",ToastAndroid.SHORT);
  };

  const fetchTodos = async  () => {
    try {
      const data = await AsyncStorage.getItem("todos");
  
      if (data !== null) {
        setTodos(JSON.parse(data));
      }
    }
    catch (err){
      alert("Error Fetching Data");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);  


  return (
    <View style={styles.body}>

      <View style={styles.container}>
        <Text style={styles.heading}>Task List</Text>
        <View style={styles.inputContainer}>
          
          <TextInput onChangeText={(text) => setTodo(text)}
            value={todo}
            placeholder='Add task'
            style={styles.input} onSubmitEditing={handleTodo}/>
          <TouchableOpacity onPress={handleTodo} >
            <Text style={styles.button} >Add</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={{ marginTop: 20, marginBottom : 160, }}>
          <FlatList
            data={todos}
            renderItem={({ item }) => <SingleTodo
              todo={item}
              todos={todos}
              setTodos={setTodos}
            />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({

  body : {
    flex : 1,
    backgroundColor : '#b0bec5',  
  },
  container: {
    alignItems: 'center', 
  },
  heading: {
    marginVertical: 30,
    fontSize: 30, 
    fontWeight: "700",
    color:'#263238',
    textDecorationLine : 'underline',
    marginTop : 40,
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    shadowColor: 'black',
    backgroundColor: '#ede7f6',
    elevation: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal : 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#E8DAEF',
    borderRadius: 10,
    elevation: 5,
  }
});
