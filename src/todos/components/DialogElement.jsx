import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import {
  closeDialog,
  deleteTodo,
  deleteSubTodo,
} from "../../store-features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open] = React.useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todoReducer);
  console.log("IN Dialog : ", state);
  const { deleteInfo, currentDeleteOperation } = useSelector(
    (state) => state.todoReducer,
  );

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const handleConfirm = () => {
    dispatch(closeDialog());
    if (currentDeleteOperation == "deleteSubTodo") {
      // console.log("deleteSubTodo : ", deleteInfo);
      dispatch(
        deleteSubTodo({
          subTodoId: deleteInfo["_id"],
          mainTodoId: deleteInfo["mainTodoId"],
        }),
      );
    } else {
      dispatch(deleteTodo(deleteInfo));
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <b>Confirm delete todo - {deleteInfo.todo} </b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
