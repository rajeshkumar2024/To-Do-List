import React from 'react';
import { View,StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SingleTodo({todo,setTodos,todos}) {
    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState(todo.text)
    
    useEffect(() => {
        
        AsyncStorage.setItem('todos',JSON.stringify(todos));
    }, [todos]);

    const textEdit = ()=>{
        if(!edit)
        setEdit(!edit);
        else{
            setEdit(!edit)
            setTodos(
                todos.map((t)=>
                t.id === todo.id
                ?{
                    id: t.id,
                    text: editText,
                }
                : t
                )
            );
            AsyncStorage.setItem("todos",JSON.stringify(todos));
        }  
    };
    
    const handleDelete =(id)=>{
        setTodos(todos.filter((t) => t.id !== id));
    };

    return (
        <View style={styles.todo}>
            {!edit ? <Text style={styles.todoText}>{todo.text}</Text> : <TextInput style={styles.todoinput} value={edit.text} 
            onChangeText={(text)=>setEditText(text)}/>}
            <TouchableOpacity>
                <MaterialIcons
                style={styles.todoaction}
                name='edit'
                size={22}
                color='black'
                onPress={textEdit} 
                onSubmitEditing = {textEdit}
                /> 
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialIcons
                style={styles.todoaction}
                name='delete' 
                size={22}
                color='black'
                onPress={()=>handleDelete(todo.id)}
                />
            </TouchableOpacity>

        </View>

        
    )
}

const styles=StyleSheet.create({
    todo:{
        flexDirection: 'row',
        marginHorizontal: 20,
        elevation:2.5,
        shadowColor: 'black',
        paddingHorizontal: 20,
        paddingVertical:10,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius:10,
        backgroundColor : '#37474f',
    },
    todoaction:{
        marginLeft:7,
        color : 'white',
    },
    todoText:{
        flex: 1, 
        fontSize: 20,
        paddingVertical:0.5,
        paddingHorizontal:0.5,
        color : 'white'
    },
    todoinput: {
        flex: 1, 
        fontSize: 16,
        borderRadius:10,
        elevation: 1.5,
        borderColor: 'black',
        paddingVertical:5,
        paddingHorizontal:5,
        backgroundColor : '#eceff1',
    }
})
