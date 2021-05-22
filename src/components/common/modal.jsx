import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export const ModalHeader = (props) => {
  return (
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {props.children}
      </Modal.Title>
    </Modal.Header>
  );
};

export const ModalBody = (props) => {
  return <Modal.Body>{props.children}</Modal.Body>;
};

export const ModalFooter = (props) => {
  return (
    <Modal.Footer>
      {props.children}
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  );
};

class ModalComponenet extends Component {
  // state = {
  //   modalShow: '',
  //   display: 'none'
  // };

  // openModal=()=> {
  //   this.setState({
  //     modalShow: 'show',
  //     display: 'block'
  //   });
  // }

  // closeModal=()=> {
  //   this.setState({
  //     modalShow: '',
  //     display: 'none'
  //   });
  // }

  // componentDidMount=()=> {
  //   this.props.isOpen ? this.openModal() : this.closeModal();
  // }

  // componentDidUpdate=(prevProps)=> {
  //   if (prevProps.isOpen !== this.props.isOpen) {
  //     this.props.isOpen ? this.openModal() : this.closeModal();
  //   }
  // }

  render() {
    const { props } = this;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default ModalComponenet;
