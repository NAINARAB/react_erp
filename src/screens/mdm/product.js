import React from "react";
import '../common.css'

function Product() {
    return (
        <div >
            <div className="comhed">
            <button className="comadbtn">Add</button>
                <h5>Products</h5>
                <h6>Master Data Management / Product</h6>
            </div>

            
            <div className="mainbdy">
                <table className="erptbl">
                    <tr>
                        <th>S.No</th>
                        <th>Product Name</th>
                        <th>Product Type</th>
                        <th>Min Stock</th>
                        <th>Min Price</th>
                        <th>Max Price</th>
                        <th>Currency</th>
                        <th>Multiple Parts</th>
                        <th>Parts</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Cooker</td>
                        <td>Finished</td>
                        <td>100</td>
                        <td>3000</td>
                        <td>1000</td>
                        <td>INR</td>
                        <td>TRUE</td>
                        <td>Lid</td>
                        <td>null</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}


export default Product;