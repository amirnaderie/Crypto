import React, { useContext } from "react";
import {UserContext} from "../context/Context"
// columns: array
// sortColumn: object
// onSort: function

const TableHeader =({columns,sortColumn,onSort})=> {
  const {dimensions } = useContext(UserContext);
   const raiseSort = path => {
    const sortcolumn = { ...sortColumn };
    if (sortcolumn.path === path)
      sortcolumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortcolumn.path = path;
      sortcolumn.order = "asc";
    }
    onSort(sortcolumn);
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
