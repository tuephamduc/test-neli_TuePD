import { gql } from "@apollo/client"

export const ADD_TASK = gql`
mutation addTask($description:String){
  addTask(description:$description){
    id
    description
    isFinished
  }
}
`

export const DEL_TASK = gql`
mutation deleteTask($id:Int){
  deleteTask(id:$id){
    status
    id
  }
}
`

export const EDIT_TASK = gql`
mutation editTask($id:Int,$description:String,$isFinished:Boolean){
  editTask(id:$id,description:$description,isFinished:$isFinished){
    id
    description
    isFinished
  }
}
`