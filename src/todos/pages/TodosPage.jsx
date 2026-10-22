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
      <div className="container mt-3 mt-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card">
              <div className="card-body">
                <h4 className="text-center">Todos</h4>

                {/* Add Todo Form */}
                <div className="row g-2 mt-3">
                  <div className="col-9 col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add todo"
                      {...register("todo")}
                    />

                    {errors.todo && (
                      <p className="text-danger mx-1 mt-2">
                        {errors.todo.message}
                      </p>
                    )}
                  </div>

                  <div className="col-3 col-md-2">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      onClick={handleSubmit(handleAddTodo)}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Todo List */}
                <div className="row mt-2">
                  {todos.length === 0 && (
                    <div className="col-12">
                      <h6 className="text-center mt-3">No todos yet!!!</h6>
                    </div>
                  )}

                  {todos.map((row) => (
                    <div key={row._id} className="col-12 mt-2">
                      <div className="card">
                        <div className="card-body py-3 px-3">
                          <div className="row align-items-center g-2">
                            <div
                              className="col-8 col-md-10 text-break"
                              style={{
                                textDecoration: row.completed
                                  ? "line-through"
                                  : "none",
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodosPage;
