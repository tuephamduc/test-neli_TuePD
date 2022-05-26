import TodoList from "components/TodoList";
import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from "@apollo/client";
import { GET_TODOS } from "graphql/TaskQuery";
import { ADD_TASK, DEL_TASK, EDIT_TASK } from "graphql/TaskMutation";
import AddForm from "components/AddForm";
import EditForm from "components/EditForm";
import { toast } from "react-toastify";


function App() {
  const [todos, setTodos] = useState([]);
  const { data, loading: fetchLoading } = useQuery(GET_TODOS, {
    fetchPolicy: "no-cache"
  })


  const [modalProps, setModalProps] = useState({
    showModal: false,
    editItem: ""
  });

  useEffect(() => {
    if (data && data.todos
    ) { setTodos(data.todos) }
  }, [data]);

  console.log(todos);

  const [addTask, { loading: addLoading }] = useMutation(ADD_TASK, {
    onCompleted({ addTask }) {
      setTodos([...todos, addTask])
    },
    onError(error) {
      console.log(error.message);
      toast.error("An Error Occurred. Please Try Again Later!!")
    }
  })

  const [editTask] = useMutation(EDIT_TASK, {
    onCompleted({ editTask }) {
      const newTodos = todos.map(item => {
        debugger
        if (item.id === editTask.id) { return { ...item, ...editTask } }
        return item
      })

      setTodos(newTodos)
    },
    onError(error) {
      console.log(error.message);
      toast.error("An Error Occurred. Please Try Again Later!!")
    }
  })

  const [deleteTask] = useMutation(DEL_TASK, {
    onCompleted({ deleteTask }) {
      if (deleteTask.status) {
        const newTodos = todos.filter(item => item.id !== deleteTask.id)
        setTodos(newTodos)
      }
      if (!deleteTask.status) {
        toast.error("An Error Occurred. Please Try Again Later!!")
      }
    },
    onError(error) {
      console.log(error.message);
      toast.error("An Error Occurred. Please Try Again Later!!")
    }
  })

  const hideModal = () => {
    setModalProps(prevState => {
      return {
        ...prevState,
        showModal: false
      }
    })
  }

  const handleClickItem = (id) => {
    const editTask = todos.find(item => item.id === id)
    setModalProps(prevState => {
      return {
        showModal: true,
        editItem: editTask
      }
    })
  }

  return (
    <div className="App">
      <div className="app-container">
        <div className="title">Todo List</div>
        <AddForm handleAddTask={addTask} loading={addLoading} />
        <TodoList
          data={todos}
          loading={fetchLoading}
          handleDeleteTask={deleteTask}
          handleEditItem={editTask}
          handleClickItem={handleClickItem}
        />

        <EditForm isShowing={modalProps.showModal} hide={hideModal} handleEditTask={editTask} item={modalProps.editItem} />
      </div>
    </div>
  );
}

export default App;
