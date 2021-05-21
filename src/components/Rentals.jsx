import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ModalComponenet, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "./common/modal";
import DatePicker from "react-datepicker2";
import RegisterForm from "./RegisterForm";
import momentJalaali from 'moment-jalaali';


class Rentals extends Component {
  state = {
    modalShow: false,
    value:momentJalaali(),
      isGregorian: false,

  };

  getCustomFormat(inputValue, isGregorian) {
    if (!inputValue)
      return '';
    const inputFormat = isGregorian ? 'YYYY/MMM/DD' : 'jYYYY/jMM/jDD';
    return isGregorian ? inputValue.locale('es').format(inputFormat) :
      inputValue.locale('fa').format(inputFormat);
  }


  toggle = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };
 
  render() {
    const handleChange=(datetxt)=>{
   
    }
    return (
      <div>
        <h1>Rental Components</h1>
        <Button variant="primary" onClick={this.toggle}>
          Launch vertically centered modal
        </Button>
        <DatePicker
        value={this.state.value}
        isGregorian={this.state.isGregorian}
        onChange={value => { this.setState({ value }) }}
        timePicker={false}
      />

{this.getCustomFormat(this.state.value, this.state.isGregorian)}
      
        <ModalComponenet show={this.state.modalShow} onHide={this.toggle}>
          <ModalHeader>Modal heading</ModalHeader>
          <ModalBody>
            <p>This is modal body</p>
            <RegisterForm></RegisterForm>
          </ModalBody>
          <ModalFooter onHide={this.toggle}>
            <Button variant="primary" onClick={this.toggle}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalComponenet>
      </div>
    );
  }
}

export default Rentals;
