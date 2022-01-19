import React from "react";

import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import { Dispatch } from "../../@types";
import { handleResetLoading } from "../../Actions";

type Props = {
  dispatch: Dispatch;
  handleResetLoading: (dispatch: Dispatch) => any;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  startDate: Date;
};

function DatePicker({ dispatch, setStartDate, startDate }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Search by Date"
        maxDate={new Date()}
        minDate={new Date("2021-11-02")}
        value={startDate}
        onChange={(newValue) => {
          //@ts-expect-error will always pass a starting value
          setStartDate(newValue);
          handleResetLoading(dispatch);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default DatePicker;
