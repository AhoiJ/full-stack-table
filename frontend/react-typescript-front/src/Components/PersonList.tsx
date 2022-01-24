import React from "react";
import { IPerson } from "./../Interfaces";

interface Props {
  person: IPerson;
  deletePerson(personID: number): void;
}

const PersonList = ({ person, deletePerson }: Props) => {
  return (
    <div className="person">
      <div className="content">
        <span>{person.first_name}</span>
        <span>{person.last_name}</span>
        <span>{person.age}</span>
      </div>
      <button
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
