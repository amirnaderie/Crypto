import React, { useContext,useState } from "react";
import {UserContext} from "../context/Context"
// columns: array
// sortColumn: object
// onSort: function

const TableHeader =({columns,sortColumn,onSort})=> {
  const {dimensions } = useContext(UserContext);
   const raiseSort = path => {
    const sortColumn = { ...sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };

  const renderSortIcon = column => {
       if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

 
    return (
      <thead>
      {dimensions.width>760 && (
        <tr>
          {columns.map(column => (
            <th
              className="clickable text-center"
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          ))}
        </tr>
      )
          }
          </thead>
          
    );
  }

export default TableHeader;
