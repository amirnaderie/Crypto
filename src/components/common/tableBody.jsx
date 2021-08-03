import React, { useContext,Fragment } from "react";
import _ from "lodash";
import { MoviesContext, UserContext } from "../context/Context";


const TableBody = ({ columns }) => {
  const { movies } = useContext(MoviesContext);
  const { dimensions } = useContext(UserContext);
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  return (
    <tbody >
      {movies.map((item, index) => (
        <tr
          key={item._id}
          className={
            dimensions.width < 760 ? "border-bottom border-danger" : ""
          }
        >
          {columns.map((column, idx) => {
            if (dimensions.width < 760)
              return (
                <Fragment key={idx}>
                  <td className="col-6 d-inline-block bg-secondary text-white text-center border-bottom ">
                    {column.label||"_"}
                  </td>
                  <td
                    className="col-6 d-inline-block border-bottom text-center"
                    key={createKey(item, column)}
                  >
                    {renderCell(item, column)}
                  </td>
                </Fragment>
              );
            else
              return (
                <td className="text-center" key={createKey(item, column)}>
                  {renderCell(item, column)}
                </td>
              );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
