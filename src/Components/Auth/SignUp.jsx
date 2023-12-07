import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  let navigate = useNavigate();

  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    const { name, email, password } = credential;
    e.preventDefault();
    const host = "http://localhost:4000";
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save The AuthToken
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Account Created Successfully", "success"); 
      navigate("/");
    } else {
      props.showAlert("Invailed Details", "danger"); 
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
          <div className="row gx-lg-5 align-items-center mb-5 -mt-4">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                iNoteBook <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  Organize, and Secure Your Notes in the Cloud
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                Explore iNoteBook, your trusted online platform for saving and
                securing notes with utmost privacy. Elevate your note-taking
                experience with advanced security features, seamless
                synchronization, and intuitive organization. iNoteBook ensures
                your thoughts remain confidential, accessible anytime, anywhere.
                Experience the future of digital notekeeping with iNoteBook –
                where innovation meets security.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-4 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="my-4">
                      <label className="block text-gray-700">
                        Your Name Here
                      </label>
                      <input
                        value={credential.name}
                        onChange={onChange}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Your Name"
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autoFocus
                        required
                      />
                    </div>
                    <div className="my-4">
                      <label className="block text-gray-700">
                        Your Email Address Here
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
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="my-4">
                      <label className="block text-gray-700">
                        Your Password Here
                      </label>
                      <input
                        value={credential.password}
                        onChange={onChange}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autoFocus
                        autoComplete="off"
                        required
                      />
                    </div>
                    {/* <div className="my-4">
                      <label className="block text-gray-700">
                        Confirm Password Here
                      </label>
                      <input
                        value={credential.password}
                        onChange={onChange}
                        type="cpassword"
                        name="cpassword"
                        id="cpassword"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autoFocus
                        autoComplete="off"
                        required
                      />
                    </div> */}

                    <button
                      type="submit"
                      className="btn bg-blue-600 text-white hover:bg-blue-700 btn-block mb-2"
                    >
                      Sign up
                    </button>
                    <hr className="my-6 border-gray-400 w-full" />

                    <p className="mt-4">
                      Already Have an Account ?{" "}
                      <NavLink
                        to="/login"
                        className="text-blue-500 hover:text-blue-700 font-semibold"
                      >
                        Login
                      </NavLink>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
