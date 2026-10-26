import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../js/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import TodosList from "./TodosList";
import {
  addTodo,
  fetchTodos,
  startLinearProgressLoader,
} from "../../store-features/todos/todoSlice";
import { useEffect } from "react";
import DialogElement from "../components/DialogElement";
import ModalElement from "../components/ModalElement";

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

  const { dialog, linearProgressLoader, modal } = useSelector(
    (state) => state.todoReducer,
  );

  useEffect(() => {
    dispatch(startLinearProgressLoader());
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (data) => {
    console.log(data);
    dispatch(addTodo(data));
    reset({ todo: "" });
  };

  return (
    <>
      {modal && <ModalElement />}
      {dialog && <DialogElement />}
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
                      disabled={linearProgressLoader ? true : false}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <TodosList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodosPage;
