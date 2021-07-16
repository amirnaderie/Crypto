import {useState, useEffect} from 'react'
import Joi from "joi-browser";
   
const Validation = (values, schema)=>{
   const [errors, setErrors] = useState({})

   const validate =  async ()=>{
     
      const options = { abortEarly: false };

    const { error } = Joi.validate(values, schema, options);
    if (!error) return null;

    const errs = {};
    for (let item of error.details) errs[item.path[0]] = item.message;
    setErrors(errs)
    return errs;
         
   }

   useEffect(()=>{validate()},[values])

   return {errors}
}

export default Validation
   
