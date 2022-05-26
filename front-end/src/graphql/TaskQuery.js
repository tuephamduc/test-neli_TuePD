import { gql } from "@apollo/client"

export const GET_TODOS = gql`
query todos{
  todos {
    id
    description
    isFinished
  }
}
`

export const GET_TODO = gql`
query todo($id:Int){
  todo(id:$id){
    id
    description
    isFinished
  }
}

`