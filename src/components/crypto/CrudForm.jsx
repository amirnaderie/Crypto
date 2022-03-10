import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Input from "../common/input/input";
import { saveCrypto } from "../../services/cryptoService";

const initialFormState = {
  asset_id: "",
  price: "",
};
//const pattern = /^[0]{1}[9]{1}[1-9]{9}$/;

const schema = {
  asset_id: Joi.string().min(2).max(10).required().label("Asset"),
  price: Joi.number().min(0).required().label("Price"),
};

const CrudForm = ({onhide,parentcallback}) => {
  const [form, setForm] = useState({ ...initialFormState });
  const [iswaiting, setWaiting] = useState(false);
  const [errors, setErrors] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);
  const [retError, setRetError] = useState(true);
  
  useEffect(() => {
    async function fetchAPI() {}
    fetchAPI();
  }, []);

  const setInput = (e) => {
    const { name, value } = e.target;
    const newValue = { [name]: value };
    setForm((form) => ({ ...form, ...newValue }));
    
  };

  // const finalValidate=()=>{
  //   let error=validate()
    
  //   const errorList = {};
  //   for (let item of error.details)
  //     errorList[item.path[0]] = { message: item.message, type: item.type };

  //   return errorList;
  // }

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(form, schema, options);
    return error;
  };

  const handleKeyUp=(e)=>{
    setDisableBtn(validate()?true:false);
  }
  const doSubmit = async (e) => {
    try {
      e.preventDefault();

     // const formerrors = await finalValidate();
     // setErrors(formerrors);

     // if (Object.keys(formerrors).length > 0) return;

      setWaiting(true);
      await saveCrypto({ ...form });
      
      setWaiting(false);
      parentcallback();
      onhide();
    } catch (ex) {
      setRetError(ex.response.data)
      setWaiting(false);
    }
  };

  return (
    <div className=" mx-2 ">
      {/* <h1 className="text-dark">Crypto</h1> */}
      <form className="direction sub-main-w3 " onSubmit={doSubmit}>
        <div className="row my-2">
          <div className="col-lg-6">
            <Input
              type="text"
              name="asset_id"
              label="Asset"
              value={form.asset_id}
              labelcolor="text-info"
              onChange={setInput}
              error={errors.asset_id}
              onKeyUp={handleKeyUp}
              maxLength="10"
              isautofocus={true}
            />
          </div>
          <div className=" col-lg-6">
            <Input
              tabIndex="1"
              name="price"
              type="number"
              labelcolor="text-info"
              onChange={setInput}
              label="Price"
              value={form.price}
              error={errors.price}
              onKeyUp={handleKeyUp}
              maxLength="20"
              effect={false}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group mt-3">
            <button className="btn btn-primary" tabIndex="2" disabled={disableBtn} >
              Save
              <i
                className={
                  "fa fa-spinner fa-spin mx-1 " +
                  (iswaiting ? "visible" : "invisible")
                }
              ></i>
            </button>
            <span className="mx-2 text-danger">
              {retError}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrudForm;
