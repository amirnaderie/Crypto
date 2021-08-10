import React, { useContext,useState } from "react";
import _ from "lodash";
import { UserContext } from "../context/Context";
import { Fragment } from "react";
// columns: array
// sortColumn: object
// onSort: function

const TableHeader = ({ columns, onSort }) => {
  const { dimensions } = useContext(UserContext);
  const [selectvalue,setSelectvalue]=useState(0);
  const [order,setOrder]=useState('asc');

  const raiseSort = (column) => {
    if (column.sortorder === "") column.sortorder = "asc";
    else column.sortorder = column.sortorder === "asc" ? "desc" : "asc";
    onSort(column);
  };

  const setSelect = ({ currentTarget: input }) => {
    let column = columns.find((column) => column.path === input.value);
    column.sortorder=order;
    setSelectvalue(input.value);
    onSort(column);
  };

  const renderSortIcon = (column) => {
    if (column.sortorder === undefined) return null;
    if (column.sortorder === "")
      return <i class="fa fa-sort" aria-hidden="true"></i>;
    return column.sortorder === "asc" ? (
      <i className="fa fa-sort-asc" />
    ) : (
      <i className="fa fa-sort-desc" />
    );
  };
  const changeorder = () => {
    let column = columns.find((column) => column.path === selectvalue);
   const Order=(order==='asc'?'desc':'asc');
    setOrder(Order);
    column.sortorder=Order;
    onSort(column);
  };
  const showorder = () => {
    
    return order === "asc" ? (
      <i class="fa fa-sort-amount-asc" />
    ) : (
      <i class="fa fa-sort-amount-desc" />
    );
  };

  return (
    <thead>
      {dimensions.width > 900 && (
        <tr>
          {columns.map((column) => (
            <th
              className="clickable text-center"
              key={column.path || column.key}
              onClick={() => raiseSort(column)}
            >
              {renderSortIcon(column)} {column.label}
            </th>
          ))}
        </tr>
      )}
      {dimensions.width <= 900 && (
        <tr>
          <th>
            <select className="rounded col-12 smallFont" value={selectvalue} onChange={setSelect}>
              <option value="0" disabled >
                Sort By
              </option>
              {columns.map((column, idx) => {
                if (column.sortorder !== undefined)
                  return (
                     <option key={column.path} value={column.path} >
                       {column.label} 
                      </option>
                 );
              })}
            </select>
          </th>
          <th className="text-center">
          <button className="border-0 bg-transparent" disabled={!selectvalue} onClick={changeorder}>
            {showorder()}
          </button>
          </th>
        </tr>
      )}
    </thead>
  );
};

export default TableHeader;
