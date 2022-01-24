import React, { useEffect, useState } from "react";
import { IPerson } from "./../Interfaces";

const API_HOST = "http://localhost:4000";

const PEOPLE_API_URL = `${API_HOST}/people`;

function EdiTable() {
  const [data, setData] = useState([]);

  const fetchPeople = () => {
    fetch(`${PEOPLE_API_URL}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  };
  useEffect(() => {
    fetchPeople();
  }, []);

  const [inEditMode, setInEditMode] = useState({
    status: false,

    rowKey: null,
  });

  const [firstName, setFirstName] = useState<string | undefined>();

  const onEdit = ({
    id,
    currentFirstName,
  }: {
    id: any;
    currentFirstName: any;
  }) => {
    setInEditMode({
      status: true,

      rowKey: id,
    });

    setFirstName(currentFirstName);
  };

  const updatePeople = ({
    id,
    newFirstName,
    newLastName,
    newAge,
  }: {
    id: any;
    newFirstName: any;
    newLastName: any;
    newAge: any;
  }) => {
    fetch(`${PEOPLE_API_URL}/${id}`, {
      method: "PUT",

      body: JSON.stringify({
        fname: newFirstName,
        lname: newLastName,
        age: newAge,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())

      .then((json) => {
        // reset inEditMode and unit price state values

        onCancel();

        // fetch the updated data

        fetchPeople();
      });
  };

  const onSave = ({
    id,
    newFirstName,
    newLastName,
    newAge,
  }: {
    id: any;
    newFirstName: any;
    newLastName: any;
    newAge: any;
  }) => {
    updatePeople({ id, newFirstName, newLastName, newAge });
  };

  const onCancel = () => {
    // reset the inEditMode state value

    setInEditMode({
      status: false,

      rowKey: null,
    });

    // reset the unit price state value

    setFirstName("");
  };

  return (
    <div className="container">
      <h1>Simple People</h1>

      <table>
        <thead>
          <tr>
            <th>First name</th>

            <th>Last Name</th>

            <th>Age</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: IPerson) => (
            <tr key={item.id}>
              <td>
                 
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <input
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                ) : (
                  item.first_name
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <React.Fragment>
                    <button
                      className={"btn-success"}
                      onClick={() =>
                        onSave({
                          id: item.id,
                          newFirstName: firstName,
                          newLastName: item.last_name,
                          newAge: item.age,
                        })
                      }
                    >
                      Save
                    </button>

                    <button
                      className={"btn-secondary"}
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    className={"btn-primary"}
                    onClick={() =>
                      onEdit({ id: item.id, currentFirstName: item.first_name })
                    }
                  >
                    Edit
                  </button>
                )}
              </td>
              <td> {item.last_name}</td>
              <td> {item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EdiTable;
