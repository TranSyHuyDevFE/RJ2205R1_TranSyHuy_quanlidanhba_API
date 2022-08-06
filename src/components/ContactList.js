import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import "../components/avatar.css";
const ContactList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(true);
  let url =
    "https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts";
  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: `${url}`,
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);
  const handleClickDelete = (id) => {
    setLoadingDelete(false);
    axios({
      method: "delete",
      url: `${url}/${id}`,
    })
      .then((res) => {
        if (res.status === 200) {
          const newContactList = users.filter((user) => user.id !== id);
          setUsers(newContactList);
        }
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoadingDelete(true);
      });
  };
  const RenderList = () => {
    return users.map((user) => {
      return (
        <tr key={user.id}>
          <th scope="row" className="d-flex justify-content-between">
            <img className="avatar" src={user.image} alt="" />
            {user.name}
          </th>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>
            <Link to={`/edit/${user.id}`} className="btn btn-success m-1">
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleClickDelete(user.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="container">
      <Link className="btn btn-primary float-end m-2" to="/add-new">
        Add New
      </Link>

      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead className="table-primary">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{RenderList()}</tbody>
            {loadingDelete ? null : <Loading />}
          </table>
        </>
      )}
    </div>
  );
};

export default ContactList;
