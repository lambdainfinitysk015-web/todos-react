import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store-features/todos/todoSlice";

function Home() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.todoReducer);

  useEffect(() => {
    dispatch(fetchUsers(count));
  }, [dispatch, count]);

  return (
    <>
      <div className="container mt-5">
        <span className="mx-3">
          <b>Fetch On Count - {count}</b>
        </span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
      </div>

      <div className="container mt-3">
        <div className="mx-3">
          <h4>Users</h4>
        </div>

        <ul>
          {users.map((user, index) => {
            return (
              <li key={index}>
                <b>
                  {user.id} : {user.name}
                </b>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Home;
