import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { updateLeave } from "../redux/slices/leaveSlice";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  auth: {
    marginLeft: "auto",
  },
});

export default function LeaveUpdating(props) {
  const { open, onClose, data } = props;

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const old_start_date = props.data.substring(1, 11);
  const old_end_date = props.data.substring(12, 22);
  var new_start_date = props.data.substring(1, 11);
  var new_end_date = props.data.substring(12, 22);

  const classes = useStyles();
  const update = async () => {
    await dispatch(
      updateLeave(
        user.username,
        old_start_date,
        old_end_date,
        new_start_date,
        new_end_date
      )
    );
    onClose();
  };

  const today = new Date();
  const year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();

  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }

  const today_date = `${year}-${month}-${date}`;
  const two_years_later_date = `${year + 2}-${month + 1}-${date}`;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Leave Updating</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please indicate the old start and end date that you wish to update,
          and the new start and end date:
        </DialogContentText>
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="Start Date"
            type="date"
            defaultValue={data.substring(1, 11)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: today_date,
              max: two_years_later_date,
            }}
            onChange={(e) => {
              new_start_date = e.target.value;
            }}
          />
        </form>
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="New End Date"
            type="date"
            defaultValue={data.substring(12, 22)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: today_date,
              max: two_years_later_date,
            }}
            onChange={(e) => {
              new_end_date = e.target.value;
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            update();
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
