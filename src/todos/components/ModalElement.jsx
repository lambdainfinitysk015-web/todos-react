import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { closeModal } from "../../store-features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import validationSchema from "../js/validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addSubTodo } from "../../store-features/todos/todoSlice";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [open] = React.useState(true);
  const dispatch = useDispatch();

  const { mainTodoInfo } = useSelector((state) => state.todoReducer);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubTodoSubmit = (data) => {
    // console.log(data);
    dispatch(addSubTodo({ subTodo: data, mainTodo: mainTodoInfo }));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
      </Modal>
    </div>
  );
}
