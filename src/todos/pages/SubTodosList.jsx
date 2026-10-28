import { useDispatch } from "react-redux";
import {
  completedSubTodo,
  setDeleteInfo,
  openDialog,
  setCurrentDeleteOperation,
  setMainTodoInfo,
  openModal,
  setModalFormType,
} from "../../store-features/todos/todoSlice";

function SubTodosList({ subTodos = [], mainTodoId }) {
  const dispatch = useDispatch();

  const handleCompleteSubTodo = (subTodoId) => {
    dispatch(completedSubTodo({ subTodoId, mainTodoId }));
  };

  const handleDeleteSubTodo = (data) => {
    dispatch(openDialog());
    dispatch(setDeleteInfo({ ...data, mainTodoId: mainTodoId }));
    dispatch(setCurrentDeleteOperation("deleteSubTodo"));
  };

  const handleEditSubTodo = (data) => {
    dispatch(setModalFormType("editSubTodo"));
    dispatch(openModal());
    dispatch(setMainTodoInfo({ ...data, mainTodoId: mainTodoId }));
  };

  return (
    <>
      {subTodos.map((row, index) => {
        return (
          <div key={index}>
            <ul className="list-group">
              <li
                className="list-group-item"
                style={{
                  paddingRight: "30px",
                  boxShadow: "0px 1px 7px 1px grey",
                }}
              >
                <div className="row">
                  <div
                    className="col-9 col-md-9 text-break"
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
                      onClick={() => handleDeleteSubTodo(row)}
                    ></i>
                  </div>

                  <div className="col-1 col-md-1 text-center">
                    <i
                      className="bi bi-pencil"
                      style={{
                        color: "black",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEditSubTodo(row)}
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
