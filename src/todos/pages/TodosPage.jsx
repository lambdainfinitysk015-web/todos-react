import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../js/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  fetchTodos,
  deleteTodo,
  completedTodo,
} from "../../store-features/todos/todoSlice";
import { useEffect } from "react";

function TodosPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();

  const { todos } = useSelector((state) => state.todoReducer);
  console.log(todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (data) => {
    console.log(data);
    dispatch(addTodo(data));
    reset({ todo: "" });
  };

  const handleDeleteTodo = (data) => {
    dispatch(deleteTodo(data));
  };

  const handleCompleteTodo = (data) => {
    dispatch(completedTodo(data));
  };

  return (
    <>
      <div className="container mt-5 col-md-6 col-offset-3">
        <div className="card">
          <div className="card-body">
            <h4 className="text-center">Todos</h4>
            <div className="row">
              <div className="col-md-10 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add todo"
                  {...register("todo")}
                />
                {errors.todo && (
                  <p className="text-danger mx-1 mt-2">{errors.todo.message}</p>
                )}
              </div>

              <div className="col-md-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit(handleAddTodo)}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="row">
              {todos.length === 0 && (
                <h6 className="text-center mt-3">No todos yet!!!</h6>
              )}
              {todos.length > 0 &&
                todos.map((row, index) => {
                  return (
                    <div key={index} className="col-md-12 mt-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div
                              className="col-md-10"
                              style={{
                                textDecoration: row.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {row.todo}
                            </div>

                            <div className="col-md-1">
                              <i
                                className={`bi  ${!row.completed ? "bi-check-circle-fill" : "bi-x-circle"} me-2`}
                                style={{ color: "green", cursor: "pointer" }}
                                onClick={() => handleCompleteTodo(row)}
                              ></i>
                            </div>
                            <div className="col-md-1">
                              <i
                                className="bi bi-trash me-2"
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => handleDeleteTodo(row)}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodosPage;
