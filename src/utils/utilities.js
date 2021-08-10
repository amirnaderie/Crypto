export function dateFormat(inputValue) {
  let ret=""; 
  if (inputValue.length>9)
   {const hasTcharacter=inputValue.indexOf('T');
    ret=(hasTcharacter!==-1?inputValue.replace('T',' '):inputValue )
    
    const hasdashcharacter=ret.indexOf('-');
    ret=(hasdashcharacter!==-1?ret.replaceAll('-','/'):ret )

    const hasmilisecond=ret.indexOf('.');
    ret=(hasmilisecond!==-1?ret.slice(0, hasmilisecond):ret )
} 
else 
    ret= inputValue.substr(0, 4) + "/" + inputValue.substr(4, 2) + "/" + inputValue.substr(6, 2);
   
   return ret;    
  }

  export function change_Array_Element_Value(array,conditioned_elemntname,condition_value,elemntname,foo)  {
  const changedarray=array.map(p =>
    {
        if (conditioned_elemntname!==undefined)
         return (p[conditioned_elemntname]===condition_value?{ ...p,[elemntname]: foo(p[elemntname])}:p)
      else
         return ({ ...p,[elemntname]:foo(p[elemntname])})
    }
        );
    return  changedarray;  
    }
    // export function change_Array_Element_Value(array,conditioned_elemntname,condition_value,elemntname,newvalue)  {
    //     const changedarray=array.map(p =>
    //       {
    //           if (conditioned_elemntname!==undefined)
    //            return (p[conditioned_elemntname]===condition_value?{ ...p,[elemntname]: newvalue}:p)
    //         else
    //            return ({ ...p,[elemntname]: newvalue})
    //       }
    //           );
    //       return  changedarray;  
    //       }  