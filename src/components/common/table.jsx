import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, onSort, data,func }) => {
  return (
    <table className="table bg-light">
      <TableHeader columns={columns} onSort={onSort} />
      <TableBody columns={columns} data={data} func={func} />
    </table>
  );
};

export default Table;
