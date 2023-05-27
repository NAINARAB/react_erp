import React from "react";
import './loading.css';
let Loader = () => {
    return (
        <>
            <div className="cntr">
                <section class="wrapper fulscrn">
                    <div class="spinner">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Loader;