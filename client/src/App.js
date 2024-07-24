import { gql, useQuery } from "@apollo/client";

const query = gql`
  query GetAllTodos {
    getTodos {
      completed
      title
      user {
        name
        email
      }
    }
  }
`;

function App() {
  const { data, loading } = useQuery(query);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  console.log("Data: ", data);
  return (
    <div className="App">
      {
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {data.getTodos.map((todo) => (
              <tr>
                <td> {todo.title}</td>
                <td>{todo.user.name}</td>
                <td>{todo?.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

export default App;
