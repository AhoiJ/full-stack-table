import React from "react";
import { IPerson } from "./../Interfaces";

interface Props {
  peopleList: [];
  deletePerson(personID: number): void;
  modifyPerson(personID: number): void;
}
/*
const Table = ({ peopleList, deletePerson, modifyPerson }: Props) => {
  return (
    <div className="table">
      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Age</th>
        </tr>
        {peopleList.map((val: IPerson, key) => {
          return (
            <tr key={key}>
              <td>{val.first_name}</td>
              <td>{val.last_name}</td>
              <td>{val.age}</td>
              <button
                className="buttonModify"
                onClick={() => {
                  modifyPerson(val.id);
                }}
              >
                Modify
              </button>
              <button
                className="buttonDelete"
                onClick={() => {
                  deletePerson(val.id);
                }}
              >
                Del
              </button>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
*/
