import React from "react";
import { Alert } from "@mui/material";
import { useState } from "react";

const Alr = (props) => {
    const {alrstatus} = props;
    const {alrmes} = props;
    const {disp} = props;
    const [disp1, setdisp] = useState(true);

    return (
        <>
        { disp1 == true ?
            <div style={{ position: "absolute", top: "10%", left: "50%", transform:"translate(-50%, -50%)" }}>
                <Alert severity={alrstatus == true ? "success" : "error"}
                    onClose={() => {setdisp(false)}}>{alrmes}</Alert>
            </div>
            :
            null
        }
        </>
    );
}

export default Alr;