import React from "react";
import DatePicker from "react-datepicker2";
import momentJalaali from "moment-jalaali";

export const getCustomFormat = (inputValue, isGregorian) => {
  if (!inputValue) return "";
  const inputFormat = isGregorian ? "YYYY/M/D" : "jYYYY/jMM/jDD";
  let retval = isGregorian
    ? inputValue.locale("es").format(inputFormat)
    : inputValue.locale("fa").format(inputFormat);
  return retval.replace("/","").replace("/","") ;
};

const MdatePicker = ({ inpval,name, label, onChange }) => {
  return (
    <div className="form-group" >
     <label htmlFor={name} className="pull-right">{label}</label>
    <DatePicker
      isGregorian={false}
      onChange={onChange}
      inputJalaaliFormat="jYYYY/jMM/jDD"
      timePicker={false}
      className="form-control"
      value={
        inpval !== ""
          ? momentJalaali(
              inpval.substr(0, 4) +
                "/" +
                inpval.substr(4, 2) +
                "/" +
                inpval.substr(6, 2),
              "jYYYY/jMM/jDD"
            )
          : momentJalaali()
      }
      name={name}
    />
    </div>
  );
};

export default MdatePicker;
