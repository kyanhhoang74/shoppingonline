import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Components from './Component';
const Login = () => {
  const [signIn, toggle] = React.useState(true);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(inputs);

    axios
      .post(
        "http://localhost:5000/api/customer/login",
        { ...inputs },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);

        if (!res.data.created) {
          
            toast.error(res.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
         
        }
        if (res.data.created) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          const crypto = window.crypto || window.msCrypto; // Ensure compatibility

          function generateToken() {
            if (!crypto || !crypto.randomUUID) {
              console.error("crypto.randomUUID is not supported by your browser.");
              return null; // Handle fallback mechanism or error notification
            }
          
            return crypto.randomUUID();
          }
          
          const token = generateToken();
          
          if (!token) {
            // Handle fallback mechanism or error notification
            return;
          }
          
          // Set the expiration time to 15 hours from now (in milliseconds)
          const expirationTime = Date.now() + (15 * 60 * 60 * 1000); // 15 hours in milliseconds
          
          // Store the token and expiration time in local storage
          localStorage.setItem('token', token);
          localStorage.setItem('tokenExpiration', expirationTime);
          localStorage.setItem('_id', res.data.id);
          
          // Set a timeout to remove the token after the expiration time
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            // Optionally, handle token expiration (e.g., prompt for re-authentication)
          }, expirationTime - Date.now());
        
          navigate("/");
          window.location.reload();

        }
      })
      .catch((err) => {
        console.log(`Request error: ${err}`);
      });
    //we will use axios to connect to the backend
  };

  const [register, setRegister] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const onChangeHandlerRegister = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandlerRegister = (e) => {
    e.preventDefault();

    console.log(register);

    axios
      .post(
        "http://localhost:5000/api/customer/register",
        { ...register },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);

        if (!res.data.created) {
          if (res.data.error_type === 0) {
            toast.error(res.data.error[0].msg, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (res.data.error_type === 1) {
            toast.error(res.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }

        if (res.data.created) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          const token = crypto.randomUUID();

          // Set the expiration time to 1 hour from now (in milliseconds)
          const expirationTime = Date.now() + 3600000;
        
          // Store the token and expiration time in local storage
          localStorage.setItem('token', token);
          localStorage.setItem('tokenExpiration', expirationTime);
          localStorage.setItem('_id', res.data.id);
        
          // Set a timeout to remove the token after the expiration time
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            localStorage.removeItem('_id');
          }, 3600000);
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(`Request error: ${err}`);
      });
    //we will use axios to connect to the backend
  };

  return (
    <Components.Container>
      <ToastContainer position='top-center' reverseOrder={false}></ToastContainer>
    <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={submitHandlerRegister}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={register.name}
                    onChange={onChangeHandlerRegister} />
            <Components.Input  type="text"
                    name="username"
                    placeholder="Username"
                    value={register.username}
                    onChange={onChangeHandlerRegister} />
            <Components.Input        type="email"
                    name="email"
                    placeholder="Email"
                    value={register.email}
                    onChange={onChangeHandlerRegister} />
            <Components.Input  type="password"
                    name="password"
                    placeholder="Password"
                    value={register.password}
                    onChange={onChangeHandlerRegister} />
            <Components.Input type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={register.confirm_password}
                    onChange={onChangeHandlerRegister} />
            <Components.Button>Sign Up</Components.Button>
        </Components.Form>
    </Components.SignUpContainer>

    <Components.SignInContainer signinIn={signIn}>
         <Components.Form onSubmit={submitHandler}>
             <Components.Title>Sign in</Components.Title>
             <Components.Input  type="text"
            placeholder="username"
            id="username"
            name="username"
            value={inputs.username}
            onChange={onChangeHandler} />
             <Components.Input  type="password"
            placeholder="password"
            id="password"
            onChange={onChangeHandler}
            value={inputs.password}
            name="password" />
             <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
             <Components.Button>Sigin In</Components.Button>
         </Components.Form>
    </Components.SignInContainer>

    <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>

        <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
                To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
            </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                  Enter Your personal details and start journey with us
              </Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(false)}>
                      Sigin Up
                  </Components.GhostButton> 
            </Components.RightOverlayPanel>

        </Components.Overlay>
    </Components.OverlayContainer>

</Components.Container>
  );
};

export default Login;
