import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registretion = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState({});
  const [Valid, setValid] = useState(true);
  const naviget = useNavigate();

  const handelSubmit = (event) => {
    event.preventDefault();
    let isvalid = true;
    let validationError = {};
    if (formData.fname === "" || formData.fname === null) {
      (isvalid = false), (validationError.fname = "First Name Required");
    }
    if (formData.lname === "" || formData.lname === null) {
      (isvalid = false), (validationError.lname = "Last Name Required");
    }
    if (formData.email === "" || formData.email === null) {
      (isvalid = false), (validationError.email = "Email Required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      (isvalid = false), (validationError.email = "Email is Not valid");
    }
    if (formData.password === "" || formData.password === null) {
      (isvalid = false), (validationError.password = "Password Required");
    } else if (formData.password.length < 8) {
      (isvalid = false), (validationError.email = "Password at Least 8 char");
    }
    if (formData.cpassword !== formData.password) {
      (isvalid = false),
        (validationError.cpassword = "Check the exact Password");
    }

    setError(validationError);
    setValid(isvalid);

    if (Object.keys(validationError).length === 0) {
      axios.post('http://localhost:8000/users', formData)
        .then(result => {
          console.log(result);
          alert("Register SuccessFully");
          naviget("/login");
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <div className="col-md-6 col-lg-4 offset-lg-4 offset-md-3 mt-5">
        <div className="bg-light p-5 border shadow">
          {Valid ? (
            <></>
          ) : (
            <span className="text-danger">
              {error.fname} {error.lname} {error.email} {error.password};
              {error.cpassword}
            </span>
          )}
          <form onSubmit={handelSubmit}>
            <div className="d-flex">
              <div className="mb-4">
                <p className="form-text">
                  First Name<span className="text-danger">*</span>
                </p>
                <input
                  type="text"
                  name="fname"
                  className="form-control"
                  placeholder="Enter First Name"

                  onChange={(event) =>
                    setFormData({ ...formData, fname: event.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <p className="form-text">
                  Last Name<span className="text-danger">*</span>
                </p>
                <input
                  type="text"
                  name="lname"
                  className="form-control"
                  placeholder="Enter Last Name"
                  required
                  onChange={(event) =>
                    setFormData({ ...formData, lname: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <p className="form-text ">
                Enter Valid Username/Email<span className="text-danger">*</span>
              </p>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Username/Email"

                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <p className="form-text">
                Password<span className="text-danger">*</span>
              </p>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"

                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <p className="form-text">
                Confirm Password<span className="text-danger">*</span>
              </p>
              <input
                type="password"
                name="cpassword"
                className="form-control"
                placeholder="Enter Password"

                onChange={(event) =>
                  setFormData({ ...formData, cpassword: event.target.value })
                }
              />
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary  my-3 shadow">
                SignUp Now{" "}
              </button>
            </div>
          </form>
        </div>
        <p to="/login" className="text-center mt-2">
          If you have Account, Please <Link to="/login">Login Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Registretion;
