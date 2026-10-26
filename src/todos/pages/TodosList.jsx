import { useDispatch, useSelector } from "react-redux";
import {
  completedTodo,
  openDialog,
  setDeleteInfo,
} from "../../store-features/todos/todoSlice";

import LinearProgressElement from "../components/LinearProgressElement";

function TodosList() {
  const dispatch = useDispatch();
  const { todos, linearProgressLoader } = useSelector(
    (state) => state.todoReducer,
  );
  console.log(todos);

  const handleCompleteTodo = (data) => {
    dispatch(completedTodo(data));
  };

  const handleDeleteTodo = (data) => {
    dispatch(openDialog());
    dispatch(setDeleteInfo(data));
  };
  return (
    <>
      <div className="row mt-2 mb-5">
        {linearProgressLoader && (
          <div className="row">
            <div className="col-md-12">
              <h6 className="text-center">Loading Todos...</h6>
              <LinearProgressElement />
            </div>
          </div>
        )}

        {todos.length === 0 && linearProgressLoader === false && (
          <div className="col-12">
            <h6 className="text-center mt-3">No todos yet!!!</h6>
          </div>
        )}

        {/* Todo List */}
        {!linearProgressLoader &&
          todos.map((row) => (
            <div key={row._id} className="col-12 mt-2">
              <div className="card">
                <div className="card-body py-3 px-3">
                  <div className="row align-items-center g-2">
                    <div
                      className="col-8 col-md-10 text-break"
                      style={{
                        textDecoration: row.completed ? "line-through" : "none",
                      }}
                    >
                      {row.todo}
                    </div>

                    <div className="col-2 col-md-1 text-center">
                      <i
                        className={`bi ${
                          !row.completed
                            ? "bi-check-circle-fill"
                            : "bi-x-circle"
                        }`}
                        style={{
                          color: row.completed ? "red" : "green",
                          cursor: "pointer",
                        }}
                        onClick={() => handleCompleteTodo(row)}
                      ></i>
                    </div>

                    <div className="col-2 col-md-1 text-center">
                      <i
                        className="bi bi-trash"
                        style={{
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteTodo(row)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default TodosList;
