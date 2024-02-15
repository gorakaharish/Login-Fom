import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [Valid, setValid] = useState(true);
  const navigate = useNavigate();

  const handelSubmit = (event) => {
    event.preventDefault();
    let isvalid = true;
    let validationError = {};

    if (formData.email === "" || formData.email === null) {
      isvalid = false,
        validationError.email = "Email Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isvalid = false,
        validationError.email = "Email is Not valid";
    }
    if (formData.password === "" || formData.password === null) {
      isvalid = false,
        validationError.password = "Password Required";
    } else if (formData.password.length < 8) {
      isvalid = false,
        validationError.email = "Password at Least 8 char";
    }

    axios.get('http://localhost:8000/users')
      .then(result => {
        result.data.map(user => {
          if (user.email === formData.email) {
            if (user.password === formData.password) {
              alert("Login successfully")
              navigate("/")
            } else {
              isvalid = false;
              validationError.password = "Wrong Password"
            }
          }
        })
        setError(validationError);
        setValid(isvalid);
      })
      .catch(err => console.log(err));
  }


  return (
    <div>
      <div className="col-md-6 col-lg-4 offset-lg-4 offset-md-3 mt-5">
        <div className="bg-light p-5 border shadow">
          {Valid ? (
            <></>
          ) : (
            <span className="text-danger">
              {error.email} {error.password};
            </span>
          )}
          <form onSubmit={handelSubmit}>
            <div className="d-flex">
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
            <div className="text-end">
              <button type="submit" className="btn btn-primary  my-3 shadow">
                Login Now
              </button>
            </div>
          </form>
        </div>
        <p to="/login" className="text-center mt-2">
          If you don't have Account, Please <Link to="/registretion">Registretion Now</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
