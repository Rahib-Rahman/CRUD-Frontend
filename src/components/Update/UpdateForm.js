import React, {Fragment, useEffect, useRef} from 'react';
import FullScreenLoader from "../Common/FullScreenLoader";
import {ErrorToast, isEmpty, SuccessToast} from "../../helper/ValidationHelper";
import {ReadByID, Update} from "../../APIServices/CRUDServices";
import {useParams} from "react-router";
import {useNavigate} from "react-router";

const UpdateForm = () => {

    let {id} = useParams();
    let ProductName,ProductCode,Img,UnitPrice,Qty,TotalPrice,Loader=useRef();
    let navigate = useNavigate();

    const UpdateData = () => {
        let Product_Name=ProductName.value;
        let Product_Code=ProductCode.value;
        let Product_Img=Img.value;
        let Unit_Price=UnitPrice.value;
        let Product_Qty=Qty.value;
        let Total_Price=TotalPrice.value;

        if(isEmpty(Product_Name)){
            ErrorToast("Product Name Required");
        }
        else if(isEmpty(Product_Code)){
            ErrorToast("Product Code Required");
        }
        else if(isEmpty(Product_Img)){
            ErrorToast("Product Img Required");
        }
        else if(isEmpty(Unit_Price)){
            ErrorToast("Product Unit Price Required");
        }
        else if(isEmpty(Product_Qty)){
            ErrorToast("Product Qty Required");
        }
        else if(isEmpty(Total_Price)){
            ErrorToast("Product Total Price Required");
        }
        else {
            Loader.classList.remove("d-none")
            Update(id,Product_Name,Product_Code,Product_Img,Unit_Price,Product_Qty,Total_Price)
                .then((Result)=> {
                    Loader.classList.add("d-none")
                    if (Result === true) {
                        SuccessToast("Data Update Successfully");
                        navigate("/");
                    } else {
                        ErrorToast("Request Fail Try Again");
                    }
                })
        }
    }

    useEffect(()=>{

        ReadByID(id).then((Result)=>{
            ProductName.value=Result[0]['ProductName']
            ProductCode.value=Result[0]['ProductCode']
            Img.value=Result[0]['Img']
            UnitPrice.value=Result[0]['UnitPrice']
            Qty.value=Result[0]['Qty']
            TotalPrice.value=Result[0]['TotalPrice']
        })
    })

    return (
        <div>
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 p-2">
                            <label>Product Name</label>
                            <input ref={(input)=>ProductName=input} type="text" className="form-control"/>
                        </div>
                        <div className="col-md-4 p-2">
                            <label>Product Code</label>
                            <input ref={(input)=>ProductCode=input} type="text" className="form-control"/>
                        </div>
                        <div className="col-md-4 p-2">
                            <label>Image</label>
                            <input ref={(input)=>Img=input} type="text" className="form-control"/>
                        </div>
                        <div className="col-md-4 p-2">
                            <label>Unit Price</label>
                            <input ref={(input)=>UnitPrice=input} type="text" className="form-control"/>
                        </div>
                        <div className="col-md-4 p-2">
                            <label>Qty</label>
                            <input ref={(input)=>Qty=input} type="text" className="form-control"/>
                        </div>
                        <div className="col-md-4 p-2">
                            <label>Total Price</label>
                            <input ref={(input)=>TotalPrice=input} type="text" className="form-control"/>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-4 p-2">
                            <button onClick={UpdateData} className="btn btn-primary w-100">Update</button>
                        </div>
                    </div>
                </div>
                <div className="d-none" ref={(div)=>Loader=div}>
                    <FullScreenLoader/>
                </div>
            </Fragment>
        </div>
    );
};

export default UpdateForm;