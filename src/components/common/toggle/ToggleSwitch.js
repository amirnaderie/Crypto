import React from "react";
import PropTypes from "prop-types";
import "./Toggle.css";
import styled from "styled-components";

/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function. The props name, small, disabled
and optionLabels are optional.
Usage: <ToggleSwitch id="id" checked={value} onChange={checked => setValue(checked)}} />
*/

const CheckBoxWrapper = styled.div`
  position: relative;
  height: 40px;
`;
const CheckBoxLabel = styled.label`
position: relative;
display: inline-block;
width: 100px;
height: 40px;
border-radius: 20px;
margin: 0;
color: #19ba4f;
cursor: pointer;
box-shadow: inset -8px -8px 15px rgba(255,255,255,.6),
            inset 10px 10px 10px rgba(93, 92, 92, 0.25);
  &::after {
    position: absolute;
    content:'${props => props.optionLabels[1]}';
    font-size: 13px;
    text-align: center;
    line-height: 25px;
    top: 8px;
    left: 8px;
    width: ${props => props.labelwidth};
    height: 25px;
    border-radius: 20px;
    background-color: ${props => props.Offbg};
    box-shadow: -3px -3px 5px rgba(255,255,255,.5),
                3px 3px 5px rgba(0,0,0, .25);
    transition: .3s ease-in-out;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 10px;
  height: 10px;
  position: absolute;
  &:checked + ${CheckBoxLabel} {
    position: relative;
    display: inline-block;
    width: ${props => props.width};
    height: 40px;
    border-radius: 20px;
    margin: 0;
    color: #19ba4f;
    cursor: pointer;
    box-shadow: inset -8px -8px 15px rgba(255,255,255,.6),
                inset 10px 10px 10px rgba(93, 92, 92, 0.25);
    &::after {
      left: calc(${props => props.width} - ${props => props.labelwidth} - 7px) ;
      content:'${props => props.optionLabels[0]}';
      color: #fff;
      background-color: ${props => props.Onbg};
      box-shadow: -3px -3px 5px rgba(255,255,255,.5),
                  3px 3px 5px #00b33c;
    }
  }
`;



const ToggleSwitch = ({
  name,
  checked,
  onChange,
  optionLabels,
  width,
  labelwidth,
  Onbg,
  Offbg
 }) => {
  
  return (

           <div>
           
       <CheckBoxWrapper>
        <CheckBox id="checkbox" type="checkbox" optionLabels={optionLabels} checked={checked} width={width} labelwidth={labelwidth} 
        Onbg={Onbg}  onChange={(e) => onChange(e.target.checked)} />
        <CheckBoxLabel htmlFor="checkbox" optionLabels={optionLabels} width={width} labelwidth={labelwidth} Offbg={Offbg} />
      </CheckBoxWrapper>
      </div>
    
  );
};


export default ToggleSwitch;
