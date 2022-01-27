import React, { useEffect, useState } from "react";
import { IPerson } from "./../Interfaces";
import "./../App.css";

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
  const [lastName, setLastName] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();

  const onEdit = ({
    id,
    currentFirstName,
    currentLastName,
    currentAge,
  }: {
    id: any;
    currentFirstName: any;
    currentLastName: any;
    currentAge: any;
  }) => {
    setInEditMode({
      status: true,

      rowKey: id,
    });

    setFirstName(currentFirstName);
    setLastName(currentLastName);
    setAge(currentAge);
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
        // reset inEditMode and people state values
        onCancel();

        // fetch the updated data
        fetchPeople();
      });
  };

  const deletePerson = ({ id }: { id: any }) => {
    fetch(`${PEOPLE_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
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

    // reset the people state value

    setFirstName("");
    setLastName("");
    setAge("");
  };

  return (
    <div className="container">
      <h1>Simple People Table</h1>

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
                  <input
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                ) : (
                  item.last_name
                )}
              </td>
              <td>
                 
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <input
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                  />
                ) : (
                  item.age
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
                          newLastName: lastName,
                          newAge: age,
                        })
                      }
                    >
                      Save
                    </button>

                    <button
                      className={"btn-secondary"}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button
                      className={"btn-primary"}
                      onClick={() =>
                        onEdit({
                          id: item.id,
                          currentFirstName: item.first_name,
                          currentLastName: item.last_name,
                          currentAge: item.age,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className={"btn-delete"}
                      onClick={() =>
                        deletePerson({
                          id: item.id,
                        })
                      }
                    >
                      Delete
                    </button>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EdiTable;
