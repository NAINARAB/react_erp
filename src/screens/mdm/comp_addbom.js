import React from "react";
import '../common.css';
import { useNavigate } from "react-router-dom";

function AddBom() {

    const navigate = useNavigate();
    return (
        <>
            <div className="micard">
                <h5 className="micardhdr">Add Bills of Material</h5>
                <div className="micardbdy row">
                    <div className="col-lg-4">
                        <label className="micardlble" onChange={(e) => { }}>Part Name</label><br />
                        <input className="micardinpt" required />
                    </div>
                    <div className="col-lg-4">
                        <label className="micardlble" onChange={(e) => { }}>SFG/RM Code</label><br />
                        <input className="micardinpt" required />
                    </div>
                    <div className="col-lg-4">
                        <label className="micardlble" onChange={(e) => { }}>SFG/RM Name</label><br />
                        <input className="micardinpt" required />
                    </div>
                    <div className="col-lg-4">
                        <label className="micardlble" onChange={(e) => { }}>Measurement Unit</label><br />
                        <input className="micardinpt" required />
                    </div>
                    <div className="col-lg-4">
                        <label className="micardlble" onChange={(e) => { }}>Quantity Required</label><br />
                        <input type='number' className="micardinpt" required />
                    </div>
                    <div className="col-lg-4">
                        <label className="micardlble" onChange={(e) => { }}>Production Phase</label><br />
                        <input className="micardinpt" required />
                    </div>
                </div>
            </div>
            <br />
            <button className="comadbtn">Add</button>
            <button className="cancelbtn" onClick={() => { window.location.reload() }} >Cancel</button>
        </>
    );
}


export default AddBom;
