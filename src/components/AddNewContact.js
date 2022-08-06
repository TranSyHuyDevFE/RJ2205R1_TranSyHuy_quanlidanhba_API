import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
export default function AddNewContact() {
  const [user, setUser] = useState({});
  const [id, setId] = useState(0);
  const [error, setError] = useState("");
  const [mess, setMess] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  let contacts = useParams();

  useEffect(() => {
    if (Object.keys(contacts).length) {
      setLoading(false);
      axios
        .get(
          `https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts/${contacts["id"]}`
        )
        .then((res) => {
          setTimeout(() => {
            setLoading(true);
          }, 500);
          setId(res.data.id);
          setUser(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [contacts]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmission = (event) => {
    const fd = new FormData();
    // Tạo data để gửi lên server
    fd.append("file", selectedFile);
    axios
      .post("https://v2.convertapi.com/upload", fd)
      .then((res) => {
        setSelectedFile(event.target.files[0]);
        console.log(res.data.Url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = () => {
    if (
      user.name === undefined ||
      user.email === undefined ||
      user.phone === undefined
    ) {
      setError("Fail!");
      setLoading(true);
      return true;
    }
    let url =
      "https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts";
    let method = "post";
    setLoading(false);
    if (id) {
      method = "put";
      url = `${url}/${id}`;
    }
    axios({
      method,
      url: `${url}`,
      data: {
        user,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          setMess("Success!");
          setLoading(true);
        }
        if (res.status === 200) {
          setMess("Updated!");
          setLoading(true);
        }
      })
      .finally(() => {});
  };
  const RenderAlert = () => {
    if (mess) {
      return (
        <div className="alert alert-success" role="alert">
          {mess}
        </div>
      );
    }
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    }
  };
  return (
    <div className="container-fluid">
      <Link className="btn btn-success mb-2" to="/">
        Home
      </Link>
      {loading ? RenderAlert() : <Loading />}

      <div className="card">
        <div className="card-header">Header</div>
        <div className="card-body">
          <form>
            <div className="mb-4">
              <label className="form-label">Avatar</label>
              <img className="avatar" src={user.image} alt="" />
              <input type="file" />
              <button className="btn btn-primary" onClick={handleSubmission}>
                Upload
              </button>
            </div>
            <div className="mb-4">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </form>
        </div>
        <div className="card-footer">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            {id ? "Save" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
