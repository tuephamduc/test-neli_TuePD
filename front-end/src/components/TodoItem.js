import React, { useState } from 'react'
import EditForm from "components/EditForm";

const TodoItem = ({ item, handleDeleteTask, handleClickItem, handleEditItem }) => {


  const onDeleteTask = (id) => {
    handleDeleteTask({
      variables: {
        id: item.id
      }
    })
  }

  const onToggleStatus = () => {
    handleEditItem({
      variables: {
        id: item.id,
        description: item.description,
        isFinished: !item.isFinished
      }
    })
  }
  return (
    <div className={`task-item ${item.isFinished ? `is-finished` : ""}`}>
      <input type="checkbox" className='task-status' checked={item.isFinished}
        onChange={onToggleStatus}
      />

      <label className='task-des'>
        {item.description}
      </label>
      <button onClick={() => handleClickItem(item.id)}
        className="btn btn-edit"
      ><i className="fa fa-edit" aria-hidden="true"></i></button>
      <button onClick={() => onDeleteTask(item.id)}
        className="btn btn-del"
      > <i className="fa fa-trash" aria-hidden="true"></i> </button>
    </div>
  )
}

export default TodoItem