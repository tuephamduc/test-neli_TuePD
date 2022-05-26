const { getDB, pool } = require("../../mysql");

const todos = () => {
  return `SELECT * FROM todo`
}
const todo = (id) => {
  return `SELECT * FROM todo WHERE id = ${id}`
}
const addTask = (description, isFinished) => {
  return `INSERT INTO todo (description,isFinished) 
  VALUES ("${description}",${isFinished})
  `
}
const deleteTask = (id) => {
  return `DELETE FROM todo WHERE id=${id}`
}

const editTask = (id, description, isFinished) => {
  return `UPDATE todo
  SET 
    description = "${description}",
    isFinished = ${isFinished}
  WHERE id= ${id}
  `
}

const sqlQuery = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })
}

module.exports = {
  sqlQuery, todos, todo, addTask, deleteTask, editTask
}