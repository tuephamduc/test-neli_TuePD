import React, { useMemo, useEffect } from 'react'
import Modal from './Modal'
import { useForm } from 'react-hook-form'
import TextField from './TextField'

const EditForm = ({ isShowing, hide, item, handleEditTask }) => {


  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit",
    defaultValues: (useMemo(() => {
      return item
    }, [item]
    ))
  })

  useEffect(() => {
    reset(item)
  }, [item]);

  const onEditTask = (data) => {
    handleEditTask({
      variables: {
        id: item.id,
        description: data.description,
        isFinished: data.isFinished
      }
    })
    hide()
  }

  return (
    <Modal isShowing={isShowing} hide={hide}>
      <form onSubmit={handleSubmit(onEditTask)} >
        <div className="edit-form">
          <TextField
            name="description"
            register={register}
            // dfValue={item?.description}
            required={true}
            className="add-input"
            placeholder="Task description"

          />
          <input type="checkbox"
            {...register("isFinished")}
            className="task-status"
          >

          </input>
        </div>
        <div>
          <button type="submit" className='btn-submit right'>Edit Task</button>
        </div>
      </form>
    </Modal >
  )
}

export default EditForm