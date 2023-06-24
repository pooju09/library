// import React, {useState} from 'react';
// import {} from '../components/Styles';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { auth } from "./fire";
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
//     HeadDescription
//   } from '../components/Styles';

// const Signup = () => {

//     // const Signup = () => {
//     //     const handleSignup = (e) => {
//     //       e.preventDefault();
//     //       // Perform Signup logic here
//     //     };
//     const [registerEmail, setRegisterEmail] = useState("");
//     const [registerPassword, setRegisterPassword] = useState("");
    
//     const [user, setUser] = useState({});
  
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
  
//     const register = async () => {
//       try {
//         const user = await createUserWithEmailAndPassword(
//           auth,
//           registerEmail,
//           registerPassword
//         );
//         console.log(user);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     return (
//         <div>
          
//         <NavbarHead />
//         <PageContainer>
//             <ContentContainer>
//             <HeadTitle style={{ marginTop: '130px' }}>User Signup</HeadTitle>
//             {/* <form onSubmit={handleSignup}> */}
            
//         <form style={{ marginTop: '50px',marginLeft: '550px' }}>
//             <FormGroup>
//             <Label>Username</Label>
//             <Input
//               type="text"
//               placeholder="Enter your username"
//               id="name"
//               name="name"
//               onChange={(event) => {
//                 setRegisterEmail(event.target.value);
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
//                 setRegisterPassword(event.target.value);
//               }}
//             />
//           </FormGroup>

//           <Button style={{ marginLeft: '110px',marginTop: '50px' }} type="submit" onClick={register}>Signup</Button>
//           <HeadDescription style={{ marginLeft: '20px'}}>Already an User? <a href ="/login" >Login!</a> </HeadDescription>

//         </form>

//             </ContentContainer>
//             {/* <FooterBottom /> */}
//         </PageContainer>
//         </div>
//     );
// };

// export default Signup;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import InputControl from "../InputControl/InputControl";
import { auth } from "./firebase";

import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
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
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;