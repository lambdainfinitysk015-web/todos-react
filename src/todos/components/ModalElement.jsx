import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { closeModal } from "../../store-features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import validationSchema from "../js/validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addSubTodo,
  updateTodo,
  resetModalFormType,
  updateSubTodo,
} from "../../store-features/todos/todoSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const { mainTodoInfo, modalFormType } = useSelector(
    (state) => state.todoReducer,
  );

  const [formType, setFormType] = React.useState(modalFormType);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      todo: formType == "editSubTodo" ? mainTodoInfo.todo : "",
    },
  });

  const [open] = React.useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(resetModalFormType());
  };

  const handleSubTodoSubmit = (data) => {
    dispatch(addSubTodo({ subTodo: data, mainTodo: mainTodoInfo }));
  };

  const handleUpdateTodoSubmit = (data) => {
    dispatch(updateTodo({ todo: { ...data, todoId: mainTodoInfo._id } }));
  };

  const handleUpdateSubTodoSubmit = (data) => {
    dispatch(
      updateSubTodo({
        todo: {
          ...data,
          mainTodoId: mainTodoInfo.mainTodoId,
          subTodoId: mainTodoInfo._id,
        },
      }),
    );
  };

  const handleFormType = (type) => {
    reset();
    setFormType(type);
    if (type == "edit") {
      setValue("todo", mainTodoInfo.todo);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* {formType == "add" && (
          <Box sx={style}>
            <h5>Add sub todo to : {mainTodoInfo.todo}</h5>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Add todo"
              {...register("todo")}
            />

            {errors.todo && (
              <p className="text-danger mx-1 mt-2">{errors.todo.message}</p>
            )}

            <div className="d-grid mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit(handleSubTodoSubmit)}
              >
                Add
              </button>
            </div>
          </Box>
        )} */}

        <Box sx={style}>
          {formType == "options" && (
            <div className="container">
              <h4>Do you want to </h4>
              <div className="row">
                <div className="col-6 col-md-6">
                  <div className="d-grid mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => handleFormType("add")}
                    >
                      Add +
                    </button>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="d-grid mt-3">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={() => handleFormType("edit")}
                    >
                      Edit
                      <i
                        className="bi bi-pencil"
                        style={{ fontSize: "13px", marginLeft: "5px" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {formType == "add" && (
            <div className="container">
              <div style={{ marginBottom: "15px" }}>
                <i
                  className="bi bi-arrow-left"
                  style={{
                    cursor: "pointer",
                    fontSize: "22px",
                    fontFamily: "cursive",
                  }}
                  onClick={() => setFormType("options")}
                ></i>{" "}
                <span style={{ marginLeft: "10px", fontSize: "15px" }}>
                  Back to options
                </span>
              </div>

              <h5>Add sub todo to : {mainTodoInfo.todo}</h5>
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Add todo"
                {...register("todo")}
              />
              {errors.todo && (
                <p className="text-danger mx-1 mt-2">{errors.todo.message}</p>
              )}
              <div className="d-grid mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit(handleSubTodoSubmit)}
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {formType == "edit" && (
            <div className="container">
              <div style={{ marginBottom: "15px" }}>
                <i
                  className="bi bi-arrow-left"
                  style={{
                    cursor: "pointer",
                    fontSize: "22px",
                    fontFamily: "cursive",
                  }}
                  onClick={() => setFormType("options")}
                ></i>{" "}
                <span style={{ marginLeft: "10px", fontSize: "15px" }}>
                  Back to options
                </span>
              </div>
              <h5>Edit Todo</h5>
              <input
                type="text"
                className="form-control mt-3"
                {...register("todo")}
              />

              {errors.todo && (
                <p className="text-danger mx-1 mt-2">{errors.todo.message}</p>
              )}

              <div className="d-grid mt-3">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleSubmit(handleUpdateTodoSubmit)}
                >
                  Update
                </button>
              </div>
            </div>
          )}

          {formType == "editSubTodo" && (
            <div className="container">
              <h5>Edit Sub Todo</h5>
              <input
                type="text"
                className="form-control mt-3"
                {...register("todo")}
              />

              {errors.todo && (
                <p className="text-danger mx-1 mt-2">{errors.todo.message}</p>
              )}

              <div className="d-grid mt-3">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleSubmit(handleUpdateSubTodoSubmit)}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
