import React from "react";
import '../common.css';

function AddBom() {
    return (
        <>
            <div>
                <label className="micardlble">Part Name</label><br />
                <input className="micardinpt" onChange={(e) => { }} required />
                <label className="micardlble">SFG/RM Code</label><br />
                <input className="micardinpt" onChange={(e) => { }} required />
                <label className="micardlble">SFG/RM Name</label><br />
                <input className="micardinpt" onChange={(e) => { }} required />
                <label className="micardlble">Measurement Unit</label><br />
                <input className="micardinpt" onChange={(e) => { }} required />
                <label className="micardlble">Quantity Required</label><br />
                <input type='number' className="micardinpt" onChange={(e) => { }} required />
                <label className="micardlble">Production Phase</label><br />
                <input className="micardinpt" onChange={(e) => { }} required />
            </div>
        </>
    );
}


export default AddBom;
