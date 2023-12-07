import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();

  const [credential, setCredential] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const host = "http://localhost:4000";
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save The AuthToken
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged In Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invailed Credential", "danger"); 
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
      <style>
        {`
          .background-radial-gradient {
            background-color: hsl(218, 41%, 15%);
            background-image: radial-gradient(650px circle at 0% 0%,
                hsl(218, 41%, 35%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%),
              radial-gradient(1250px circle at 100% 100%,
                hsl(218, 41%, 45%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%);
          }

          #radius-shape-1 {
            height: 220px;
            width: 220px;
            top: -60px;
            left: -130px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }

          #radius-shape-2 {
            border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
            bottom: -60px;
            right: -110px;
            width: 300px;
            height: 300px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }

          .bg-glass {
            background-color: hsla(0, 0%, 100%, 0.9) !important;
            backdrop-filter: saturate(200%) blur(25px);
          }
        `}
      </style>
      <section className="background-radial-gradient overflow-hidden lg:h-[calc(92.85vh)]">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 ">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 my-5 mb-lg-0 position-relative mx-auto ">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form
                    className="mt-6"
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label className="block text-gray-700">
                        Email Address
                      </label>
                      <input
                        value={credential.email}
                        onChange={onChange}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email Address"
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autoFocus
                        required
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-gray-700">Password</label>
                      <input
                        value={credential.password}
                        onChange={onChange}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        minLength="5"
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        required
                      />
                    </div>

                    <div className="text-right mt-2">
                      <Link
                        to="#"
                        className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="w-full block bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                    >
                      Log In
                    </button>
                  </form>
                  <hr className="mt-6 mb-3 border-gray-400 w-full" />

                  <p className="">
                    Need an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
