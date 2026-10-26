import { useDispatch } from "react-redux";
import {
  completedSubTodo,
  setDeleteInfo,
  openDialog,
  setCurrentDeleteOperation,
} from "../../store-features/todos/todoSlice";

function SubTodosList({ subTodos = [], mainTodoId }) {
  const dispatch = useDispatch();

  const handleCompleteSubTodo = (subTodoId) => {
    dispatch(completedSubTodo({ subTodoId, mainTodoId }));
  };

  const hanleDeleteSubTodo = (data) => {
    dispatch(openDialog());
    dispatch(setDeleteInfo({ ...data, mainTodoId: mainTodoId }));
    dispatch(setCurrentDeleteOperation("deleteSubTodo"));
  };

  return (
    <>
      {subTodos.map((row, index) => {
        return (
          <div key={index}>
            <ul className="list-group">
              <li className="list-group-item" style={{ paddingRight: "30px" }}>
                <div className="row">
                  <div
                    className="col-10 col-md-10 text-break"
                    style={{
                      textDecoration: row.completed ? "line-through" : "none",
                    }}
                  >
                    {row.todo}
                  </div>

                  <div className="col-1 col-md-1 text-center">
                    <i
                      className={`bi ${
                        !row.completed ? "bi-check-circle-fill" : "bi-x-circle"
                      }`}
                      style={{
                        color: row.completed ? "red" : "green",
                        cursor: "pointer",
                      }}
                      onClick={() => handleCompleteSubTodo(row._id)}
                    ></i>
                  </div>

                  <div className="col-1 col-md-1 text-center">
                    <i
                      className="bi bi-trash"
                      style={{
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => hanleDeleteSubTodo(row)}
                    ></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default SubTodosList;
