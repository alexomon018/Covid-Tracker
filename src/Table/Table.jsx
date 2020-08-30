import React from "react";
import "./Table.css";
import numeral from 'numeral';
function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }, index) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format(',')}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
