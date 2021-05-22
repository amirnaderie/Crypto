import React, { useContext } from "react";
import _ from "lodash";
import {MoviesContext} from "../context/MoviesContext"

const TableBody =({columns})=> {
  const {movies } = useContext(MoviesContext);
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

 const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
    return (
      <tbody>
        {movies.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={createKey(item, column)}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );

}

export default TableBody;
