import Helmet from "components/Helmet/Helmet";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import "styles/login.scss";

import { auth, db, storage } from "firebase.config";

import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // progress
  const [percent, setPercent] = useState(0);

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const storageRef = ref(storage, `images-user/${Date.now() + "-" + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (error) => {
          // toast.error(error.message);
          toast.error(error);
        },
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //update user profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            //store user data in firebase database
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );

      setLoading(false);
      toast.success("Account created");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong");
    }
  };

  const navigate = useNavigate();

  return (
    <Helmet title="login">
      <section>
        <Container>
          <Row>
           {loading ? (
            <Col lg='12' className="text-center">
              <h6 className="fw-bold">Loading.....</h6>
            </Col>
           ) : (
             <Col lg="6" className="m-auto text-center">
             <h3 className="fw-bold mb-4">SignUp</h3>
             <Form className="auth__form" onSubmit={signup}>
               <FormGroup className="form__group">
                 <input
                   type="text"
                   placeholder="Enter your Username..."
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                 />
               </FormGroup>
               <FormGroup className="form__group">
                 <input
                   type="email"
                   placeholder="Enter your Email..."
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                 />
               </FormGroup>
               <FormGroup className="form__group">
                 <input
                   type="password"
                   placeholder="Enter your password..."
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                 />
               </FormGroup>
               <FormGroup className="form__group">
                 <input
                   type="file"
                   onChange={(e) => setFile(e.target.files[0])}
                 />
               </FormGroup>
               <button type="submit" className="buy__btn auth__btn">
                 Create an Account
               </button>
               <p>
                 Already have an account? <Link to="/login">Login</Link>
               </p>
             </Form>
             <p>{percent} "% done"</p>
           </Col>
           )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
