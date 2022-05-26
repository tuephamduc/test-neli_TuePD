import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';

const AddForm = ({ handleAddTask, loading }) => {
  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit"
  })


  const onAddTask = (data) => {
    handleAddTask({
      variables: data
    })
    reset({ description: "" })

  }
  return (
    <div >
      <form onSubmit={handleSubmit(onAddTask)} className="add-task" >

        <TextField
          name="description"
          register={register}
          required={true}
          className="add-input"
          placeholder="Add new task"
        />
        <div>
          <button type='submit' className='btn-submit'>
            {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
            Add Task</button>
        </div>
      </form>
    </div>
  )
}

export default AddForm