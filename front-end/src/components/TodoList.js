import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ data, loading, handleDeleteTask, handleClickItem, handleEditItem }) => {

  return (
    <React.Fragment>



      {data.length === 0 ?
        <div className='notfound'>
          Not found a task

        </div> : data ?
          <ul className='task-list'>
            {data.map(item => {
              return <TodoItem
                key={item.id}
                item={item}
                handleDeleteTask={handleDeleteTask}
                handleClickItem={handleClickItem}
                handleEditItem={handleEditItem}
              />
            })
            }
          </ul>
          : ""}

    </React.Fragment>
  )
}

export default TodoList