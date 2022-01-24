import React from "react";
import { IPerson } from "./../Interfaces";

interface Props {
  peopleList: [];
  deletePerson(personID: number): void;
  modifyPerson(personID: number): void;
}
/*
const PersonList = ({ peopleList, deletePerson, modifyPerson }: Props) => {
  return (
    <div className="person">
      <div className="content">
        <span>{person.first_name}</span>
        <span>{person.last_name}</span>
        <span>{person.age}</span>
      </div>
      <button
        className="buttonModify"
        onClick={() => {
          modifyPerson(person.id);
        }}
      >
        Modify
      </button>
      <button
        className="buttonDelete"
        onClick={() => {
          deletePerson(person.id);
        }}
      >
        Del
      </button>
    </div>
  );
};

export default PersonList;

*/
