// import React ,{useState}from 'react';
// import { useNavigate } from "react-router-dom";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { auth } from "./fire";
// import { HeadDescription } from '../components/Styles';
// import NavbarHead  from '../components/NavbarHead';
// import FooterBottom  from '../components/FooterBottom';
// import {
//     HeadTitle,
//     PageContainer,
//     ContentContainer,
//     FormGroup,
//     Input,
//     Label,
//     Button,
    
//   } from '../components/Styles';
// import Home from './home';

// const Login = () => {

//     // const Login = () => {
//     //     const handleLogin = (e) => {
//     //       e.preventDefault();
//     //       // Perform login logic here
//     //     };
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [user, setUser] = useState({});

//   onAuthStateChanged(auth, (currentUser) => {
//     setUser(currentUser);
//   });
//   const login = async () => {
//     try {
//       const user = await signInWithEmailAndPassword(
//         auth,
//         loginEmail,
//         loginPassword
//       );
//       console.log(user);
//     } catch (error) {
//       console.log(error.message);
//     }
    
//   };

//   const logout = async () => {
//     await signOut(auth);
//   };
//   const navigate = useNavigate();
//   const navigateTo = () => {
//     navigate('/')
//   }
//     return (
//         <div>
//         <NavbarHead />
//         <PageContainer>
//             <ContentContainer>
//             <HeadTitle style={{ marginTop: '130px' }}>User Login</HeadTitle>
//             {/* <form onSubmit={handleLogin}> */}
            
//         <form style={{ marginTop: '50px',marginLeft: '550px' }}>
//             <FormGroup>
//             <Label>Email</Label>
//             <Input
//               type="text"
//               placeholder="Enter your email"
//               id="name"
//               name="name"
//               onChange={(event) => {
//                 setLoginEmail(event.target.value);
//               }}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label>Password</Label>
//             <Input
//               type="password"
//               placeholder="Enter your password"
//               id="pw"
//               name="pw"
//               onChange={(event) => {
//                 setLoginPassword(event.target.value);
//               }}
//             />
//           </FormGroup>
//           <Button style={{ marginLeft: '110px',marginTop: '50px' }} type="submit" onClick={login} >Login</Button>
//           <HeadDescription style={{ marginLeft: '30px'}}>New User? <a href ="/signup" >Signup!</a> </HeadDescription>
//         </form>
//             </ContentContainer>
//             {/* <FooterBottom /> */}
//         </PageContainer>
//         </div>
//     );
// };

// export default Login;
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";


import InputControl from "../InputControl/InputControl";
import { auth } from "./firebase";

import styles from "./Login.module.css";

function Login() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;