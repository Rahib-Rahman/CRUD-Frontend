import React, {useEffect, useReducer, useState} from 'react';
import {Delete, Read} from "../../APIServices/CRUDServices";
import FullScreenLoader from "../Common/FullScreenLoader";
import {ErrorToast, SuccessToast} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router";

const ListTable = () => {

    let [reducerValue,forceUpdate] = useReducer(x=>x+1,0);
    let [DataList,SetDataList]=useState([]);
    let navigate = useNavigate();

    useEffect(()=>{

        Read().then((Result)=>{
            SetDataList(Result)
        })
    },[reducerValue])


    const DeleteItem=(id)=>{
        Delete(id).then((result)=>{
            if(result===true){
                SuccessToast("Delete Success");
                forceUpdate();
            }
            else{
                ErrorToast("Request Fail Try Again");
            }
        })
    }

    const UpdateItem=(id)=>{
        navigate("/update/"+id)
    }

    if(DataList.length>0){
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Code</th>
                        <th>Image</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        DataList.map((item,i)=>{
                            return(
                                <tr>
                                    <td>{item.ProductName}</td>
                                    <td>{item.ProductCode}</td>
                                    <td><img className="list-img" src={item.Img} alt=""/></td>
                                    <td>{item.UnitPrice}</td>
                                    <td>{item.Qty}</td>
                                    <td>{item.TotalPrice}</td>
                                    <td>
                                        <button onClick={DeleteItem.bind(this,item._id)} className="btn btn-danger mx-2">Delete</button>
                                        <button onClick={UpdateItem.bind(this,item._id)} className="btn btn-primary mx-2">Update</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
    else {
        return (
            <div>
                <FullScreenLoader/>
            </div>
        )
    }

};

export default ListTable;