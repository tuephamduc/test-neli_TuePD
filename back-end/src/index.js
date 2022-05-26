const { ApolloServer, gql } = require("apollo-server");
const { getDB, pool } = require("../mysql");
const { sqlQuery, todos, todo, addTask, editTask, deleteTask } = require("./query/query")
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Todo {
    id: Int
    description: String
    isFinished: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type delResult {
    status: Boolean
    id: Int
  }

  type Query {
    todos: [Todo]
    todo(id:Int):Todo
  }

  type Mutation{
    addTask(description:String):Todo
    deleteTask(id:Int):delResult
    editTask(id:Int, description:String,isFinished:Boolean):Todo
  }
`;


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    todos: async () => {
      const query = todos();
      const data = await sqlQuery(query);
      return data;
    },
    todo: async (_, { id },) => {
      const db = await getDB();
      const query = todo(id);
      const data = await sqlQuery(query);
      return data[0];
    }
  },

  Mutation: {
    addTask: async (_, { description }) => {
      const query = addTask(description, false);
      const data = await sqlQuery(query);
      const insertTask = await sqlQuery(todo(data.insertId))
      return insertTask[0]
    },
    deleteTask: async (_, { id }) => {
      const query = deleteTask(id);
      const data = await sqlQuery(query);
      if (data) {
        return {
          status: true,
          id: id
        }
      } return {
        status: false
      }
    },
    editTask: async (_, { id, description, isFinished }) => {
      const query = editTask(id, description, isFinished)
      const data = await sqlQuery(query);
      const result = await sqlQuery(todo(id))
      return result[0]
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
