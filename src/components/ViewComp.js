import React from "react";
import { useLocation,useNavigate } from "react-router-dom";

function ViewComp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="container mt-3">
        <h2>{state.title} </h2>
        <div className="card">
          <div className="card-header">id: {state.id}</div>
          <div className="card-body"> {state.body} </div>
          <div className="card-footer"> <button className="btn-secondary" onClick={()=>navigate("/dashboard")}> Back to Dashboard </button></div>
        </div>
      </div>
    </div>
  );
}

export default ViewComp;
