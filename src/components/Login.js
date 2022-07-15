import React,{useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
function Login() {
    const [email,setEmail] = useState('');
    const [pass,setPass]   = useState('');

    const navigate = useNavigate()

    // handle submit functionality
    function handleSubmit(){
        let obj ={}
        if(email !== '' && pass !== ''){
           obj.email = email;
           obj.pass = pass ;
           sessionStorage.setItem("user",JSON.stringify(obj));
           navigate('/dashboard')
        }else{
            alert("pass or email is empty")
        }

       
    }
  return (
    <div>
      <Container>
        <Row className="my-5">
          <Col className="">
            <form className="w-50 mx-auto border border-secondary p-3 rounded">
              <div class="mb-3 mt-3">
                <label for="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="pwd" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="pswd"
                  value={pass}
                  onChange={(e)=>setPass(e.target.value)}
                />
              </div>

              <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
