import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserState = (props) => {
    const [user, setUser]  = useState({
        employee_name: '',
        designation: '',
        department: '',
        gender : '',
        dob: '',
        doj:'',
        password: ''
    });

    const host = 'http://localhost:8085/lms/api/';

    const setuser  = (employee_name, designation, department, gender, dob, doj, password) => {
        setUser({employee_name, designation, department, gender, dob, doj, password})
    };

    const getUser = async(id) => {

        await fetch(`${host}/employees/{id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setUser(data);
            })
            .catch((e) => console.error(e));
        };

        return (
            <UserContext.Provider
              value={{
                user,
                getUser,
                setuser,
              }}
            >
              {props.children}
            </UserContext.Provider>
          );
}
