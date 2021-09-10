import React, { Component } from "react";
import { Button, Collapse } from "react-bootstrap";
import ModalComponenet, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "./common/modal";
import DatePicker from "react-datepicker2";
import RegisterForm from "./RegisterForm";
import momentJalaali from 'moment-jalaali';
import Select from "react-dropdown-select";
import { getGenres } from "../services/genreService";
import Chart from "react-google-charts";

// const options = [
//   { value: 'UG', label: 'UG1' },
//   { value: 'UZ', label: 'UZ1' },
//   { value: 'IR', label: 'ایران' },
//   { value: 'AU', label: 'AU1' },
//   { value: 'UA', label: 'UA1' },
//   { value: 'EZ', label: 'Eurozone' },
//   { value: 'LONG', label: 'https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/Rtl.js' }
// ];

class Rentals extends Component {
  state = {
    modalShow: false,
    value:momentJalaali(),
      isGregorian: false,
      isAsc:false,
      open:false,
      selectedCountry:null,
      options:{},
      textForClipborad:"test clipboard"
  };

  async componentDidMount(){
    const  {data} =await getGenres();
    const options = data.map(row=> {
     return { value : row._id, label : row.name }
   })
   
     this.setState({options});
  }

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
 
  togglei = () => {
    this.setState({ isAsc: !this.state.isAsc });
  };
  render() {
   const {open,selectedCountry,options}=this.state;
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
<div onClick={this.togglei}>
  <i className={this.state.isAsc?"fa fa-sort-asc fa-3x m-2":"fa fa-sort-asc m-2 fa-3x show"} />
</div>

{this.getCustomFormat(this.state.value, this.state.isGregorian)}

<Button
        onClick={() =>this.setState({open:!open})}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="m-4" 
      >
        click
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>


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
      <div>
        {(selectedCountry!==null && selectedCountry!=="undefined") && selectedCountry[0].label}
        <Select multi options={options} direction="rtl" placeholder="  انتخاب ..." onChange={(value) => this.setState({selectedCountry:value})} />
        </div>
               
     
        <div>
          <Button style={{display:'block'}} onClick={() =>  navigator.clipboard.writeText(this.state.textForClipborad)}>By clicking This Button the text was written in below text area will be copied in clipboard</Button> 
          
        <textarea value={this.state.textForClipborad} onChange={(e)=>this.setState({textForClipborad:e.target.value})}/>
      
    </div>


      </div>
    );
  }
}

export default Rentals;
