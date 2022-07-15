import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Data from "../mock-data.json";
import {Button,Col,Modal,Container,Row} from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
  const [allpost,setAllpost] = useState(Data);
  const [title,setTitle] = useState('');
  const [descri,setDescri] = useState('');
  const [toggle,setToggle] = useState(false);
  const [addModal,setAddModal] = useState(false)
  const [show, setShow] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const navigate = useNavigate();

  const uid = new Date().toISOString().replaceAll(/[-:TZ]/g, '.') + Math.random().toString().substring(2,7);
 // delete functionality
 function handleDelete(del){
   let newArr= allpost.filter((ele)=>{
    return ele.id !== del ;
   })
   setAllpost([...newArr]);
 }
 // add functionality
 function addHandle(e){
  e.preventDefault();
    console.log("add btn clicked")

    if(title !== '' && descri !== ''){
      let newArr= [...allpost,{id:uid,title:title,body:descri}];
      setAllpost([...newArr]);
      console.log(allpost)
      setTitle('')
      setDescri('');
      setShow(false)
    }else{
      alert("title or descri is missing");
    }
 }
 // edit functionality
 function handleEdit(id){
  setIdToEdit(id)
  setToggle(true);
   setShow(true)
    console.log(id)
    let objToEdit= allpost.find((ele)=>{
      return ele.id === id; 
    })
    console.log(objToEdit);
    setTitle(objToEdit.title)
    setDescri(objToEdit.body)

 }
 // save edit change functionality
 function handleSave(e){
  e.preventDefault()
 
  let arr3 = allpost.filter((ele)=>{
    return ele.id !== idToEdit;
  })
  console.log("filter arr",arr3 );
  setAllpost([...arr3,{id:idToEdit,title:title,body:descri}]);
  setTitle('');
  setDescri('');
  setToggle(false)
  setShow(false)
 }
 // logout functionality
 function logoutHandle(){
  sessionStorage.clear();
  navigate('/login')
 }
 
  return (
    <div>
      <Container fluid> 
      
       <Row className="bg-primary mb-2"> 
           <Col lg={7}>
           <h1> Dashboard </h1>
           </Col>
          <Col className="d-flex justify-content-end " lg={2} > 
          <FontAwesomeIcon icon="user" size="2x"  style={{ color: 'white' }} className="m-2" />
          
          </Col>
          <Col lg={2}> 
            <button className="btn btn-secondary m-2" onClick={()=>logoutHandle()}> LOGOUT</button>
          </Col>
      
          
       </Row>
      <Row> 
        <Col className="d-flex justify-content-end"> 
        <Button variant="primary" onClick={handleShow} className="me-4" >
        <FontAwesomeIcon icon="plus"  style={{ color: 'white' }}  /> CREATE
      </Button>
      </Col> 
      </Row>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>POST </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <input className="form-control"  type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <textarea className="form-control my-3" rows="5" id="comment" name="descri" value={descri} onChange={(e)=>setDescri(e.target.value)} ></textarea>
          </form>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {
            !toggle? <button onClick={(e)=>addHandle(e)} className="btn btn-primary"> ADD</button> :
            <button className="btn btn-primary" onClick={(e)=>handleSave(e)}> Save Changes </button>
          }

        </Modal.Footer>
      </Modal>

      <table className="table">
        <thead>
          <tr>
            <th width='30%'> Title</th>
            <th width='50%'> Description</th>
            <th width='10%'> </th>
            
          </tr>
        </thead>
        <tbody>
           {allpost?.map((ele, ind) => {
              return (
                <tr key={ind}>
                  <td> {ele.title} </td>
                  <td> {ele.body}</td>
                  <td>
               
                    <FontAwesomeIcon icon="eye"  style={{ color: '#5FA2E6'}} onClick={() => navigate("/view", { state: ele })} size="2x" className="ms-2"  />

                    <FontAwesomeIcon icon="pen-to-square"  style={{ color: '#5FA2E6' }} onClick={()=>handleEdit(ele.id) } size="2x" className="ms-2" />

                    <FontAwesomeIcon icon="trash"  style={{ color: '#5FA2E6' }} onClick={()=>handleDelete(ele.id)} size="2x" className="ms-2" />

                    

                  </td>
                </tr>
              );
            })
            } 

        </tbody>
      </table>
      </Container>
    </div>
  );
}

export default Dashboard;
