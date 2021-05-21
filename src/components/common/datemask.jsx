import React,{Component} from 'react';
import ReactInputMask from 'react-input-mask';


class DateMask extends Component{
    
    beforeMaskedValueChange = (newState, oldState, userInput) => {
        var { value } = newState;
        var selection = newState.selection;
        var cursorPosition = selection ? selection.start : null;
     
        if (
          (userInput>1 && (cursorPosition===1||cursorPosition===6))
           || (userInput>1&& cursorPosition===10 && value[cursorPosition-2]>2)
            )
         {
          value = value.split('');
          value[cursorPosition-1] = '_';
          value = value.join('');
          selection={start:selection.start-1,end:selection.end-1};
         }
         

     
        return {
          value,
          selection
        };
      }
      dateOnChange=e=>{
        e.currentTarget.value=e.currentTarget.value.replaceAll("_", "").replaceAll("/", "")
        this.props.onChange(e);
      }
      render() {
        const {name,label, onChange, error,...rest } = this.props;
     return (
       <div className="form-group">
         <label htmlFor={name} className="pull-right">
           {label}
         </label>
         <ReactInputMask
           {...rest}
           mask="9999/99/99"
           maskChar="_"
           name={name}
           className="form-control"
           beforeMaskedValueChange={this.beforeMaskedValueChange}
           style={{ direction: "ltr" }}
           onChange={this.dateOnChange}
         />
         {error && <div className="alert alert-danger">{error}</div>}
       </div>
     );
      }
};
 
export default DateMask;