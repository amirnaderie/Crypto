import React from "react";
//import "./RequestForm.css";
const RequestForm = () => {
  return (
    <div className="row justify-content-center align-items-center">
      <table role="table">
        <thead role="rowgroup">
          <tr role="row">
            <th role="columnheader">First Name</th>
            <th role="columnheader">Last Name</th>
            <th role="columnheader">Job Title</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          <tr role="row">
            <td role="cell">James</td>
            <td role="cell">Matman</td>
            <td role="cell">Chief Sandwich Eater</td>
          </tr>
          <tr role="row">
            <td role="cell">The</td>
            <td role="cell">Tick</td>
            <td role="cell">Crimefighter Sorta</td>
          </tr>
          <tr role="row">
            <td role="cell">Jokey</td>
            <td role="cell">Smurf</td>
            <td role="cell">Giving Exploding Presents</td>
          </tr>
          <tr role="row">
            <td role="cell">Cindy</td>
            <td role="cell">Beyler</td>
            <td role="cell">Sales Representative</td>
          </tr>
          <tr role="row">
            <td role="cell">Captain</td>
            <td role="cell">Cool</td>
            <td role="cell">Tree Crusher</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RequestForm;
