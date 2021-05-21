import QueryBox from "./QueryBox";
import React, {useState, useEffect, Fragment} from "react"
import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";
import { useHistory } from "react-router"
import ProductsDataService from '../../../services/products'
import PopUp1 from '../popUp1'

const MainInventory = (props) =>{
    const [popUpStyle,setPopUpStyle] = useState({});
    const [productId,setProductId] = useState("");
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const addProductToggle = () =>{
        history.push("/main/inventory/addProduct");
    }

    const popUpAction = (act) => (e) => {
        switch(act){
            case 0:
                setPopUpStyle({opacity:0,pointerEvents:"none"})
                break;
            case 1:
                ProductsDataService.delete(productId).then(res=>{
                    props.refreshProductsList();
                    setPopUpStyle({opacity:0,pointerEvents:"none"})
                })
                break;
            default:
                break;
        }
    }

    const handleClick = (act,id=null) => (e) =>{
        switch(act){
            case 0:
                props.setPage(parseInt(props.page)-1);
                break;
            case 1:
                props.setPage(parseInt(props.page)+1);
                break;
            case 2:
                history.push({
                    pathname:"/main/inventory/updateProduct",
                    state: id
                })
                break;
            case 3:
                setPopUpStyle({opacity:1,pointerEvents:"all"})
                setProductId(id);
                break;
            default:
                console.log("undefined action")
                break;

        }
    }

    const handleChange = (e) =>{
        props.setPerPage(e.target.value);
        props.setPage(1);
    }

    const sortClick = (act) => (e) =>{
        switch(act){
            case 0:
                if(props.sortPrice < 3){
                    props.setSortPrice(props.sortPrice + 1)
                    props.setSortStok(0);
                    props.search();
                }else{
                    props.setSortPrice(0);
                }              
                break;
            case 1:
                if(props.sortStok < 3){
                    props.setSortStok(props.sortStok + 1)
                    props.setSortPrice(0);
                    props.search();
                }else{
                    props.setSortStok(0);
                }    
                break;
            default:
                break;
        }
    }

    return(
            <div id="main-inventory">
                <QueryBox stokDownValue={props.stokDownValue} stokUpValue={props.stokUpValue} sellUpValue={props.sellUpValue} 
                            sellDownValue={props.sellDownValue} searchInput={props.searchInput} selectedSearch={props.selectedSearch}
                            setStokDownValue={props.setStokDownValue} setStokUpValue={props.setStokUpValue} setSellUpValue={props.setSellUpValue}
                            setSellDownValue={props.setSellDownValue} setSearchInput={props.setSearchInput} setSelectedSearch={props.setSelectedSearch}    
                            setOwnedProducts={props.setOwnedProducts} search={props.search} refreshProductsList={props.refreshProductsList} />

                <div className="productsListContainer mb-5">
                    <div className="inventory-row header">
                        <h4 className="productQtyText">{props.ownedProducts.length} Product</h4>
                        <button className="addProductButton" onClick={addProductToggle}><span>+</span> Tambah Produk Baru</button>
                    </div>
                    <table className="table table-borderless">
                        <thead className="thead">
                            <tr>
                                <th>Nama Produk</th>
                                <th>Variasi</th>
                                <th>
                                    <div className="thSort">
                                        Harga 
                                        <div className="sort" onClick={sortClick(0)}>
                                            <div className="triangleUp" style={(props.sortPrice === 2) ? {borderBottom:"6px solid #555"} : {borderBottom:"6px solid #888"} } ></div>
                                            <div className="triangleDown" style={(props.sortPrice === 1) ? {borderTop:"6px solid #555"} : {borderTop:"6px solid #888"} }></div>
                                        </div>                                   
                                    </div>
                                </th>
                                <th>
                                    <div className="thSort">
                                        Stok
                                        <div className="sort" onClick={sortClick(1)}>
                                            <div className="triangleUp" style={(props.sortStok === 2) ? {borderBottom:"6px solid #555"} : {borderBottom:"6px solid #888"} }></div>
                                            <div className="triangleDown" style={(props.sortStok === 1) ? {borderTop:"6px solid #555"} : {borderTop:"6px solid #888"} }></div>
                                        </div>                                   
                                    </div>
                                </th>
                                <th>Penjualan</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.ownedProducts.map(x=>{
                                if(x.variantsList){
                                    return(
                                        <Fragment key={x._id}>
                                            {x.variantsList.map((xi,i)=>{
                                                return(
                                                    <tr>
                                                        <td className="productTd">
                                                            <img src={"http://localhost:5000/product/" + props.accId + "/" + xi.img}></img>
                                                            {(i===0) ? x.name : ""}
                                                        </td>
                                                        <td>{xi.name}</td>
                                                        <td>Rp.{xi.price}</td>
                                                        <td>{xi.stok}</td>
                                                        <td>0</td>
                                                        <td>{(i===0) ? 
                                                        <div className="dropdown">
                                                            <a className="dropUbah">Ubah</a>
                                                            <div className="dropDownContent">
                                                                <a href="#" onClick={handleClick(2,x)} >Ubah</a>
                                                                <a href="#" onClick={handleClick(3,x._id)} >Hapus</a>
                                                            </div> 
                                                        </div>
                                                        : ""}</td>
                                                    </tr>                                                  
                                                )
                                            })}
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr style={{borderTop:"1px solid rgba(0,0,0,0.3)"}}>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>                                           
                                        </Fragment>
                                    )

                                }else{
                                    return(
                                        <Fragment key={x._id}>
                                            <tr>
                                                <td className="productTd">
                                                    <img src={"http://localhost:5000/product/" + props.accId + "/" + x.img}></img>
                                                    {x.name}
                                                </td>
                                                <td></td>
                                                <td>Rp.{x.price}</td>
                                                <td>{x.stock}</td>
                                                <td>0</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <a className="dropUbah">Ubah</a> 
                                                        <div className="dropDownContent">
                                                            <a onClick={handleClick(2,x)}>Ubah</a>
                                                            <a onClick={handleClick(3,x._id)}>Hapus</a>
                                                        </div> 
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr style={{borderTop:"1px solid rgba(0,0,0,0.3)"}}>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>                                            
                                        </Fragment>
                                    )
                                }
                            })}
                        </tbody>
                    </table> 
                    <div className="inventory-row pagination-container">           
                        <i className="arrow left" onClick={handleClick(0)} ></i>
                        <span>{props.page}</span>
                        <i className="arrow right" onClick={handleClick(1)} ></i>
                        <select name="pageVolume" value={props.perPage} onChange={handleChange} className="pageVolume" id="pageVolume">
                            <option value="12">12/halaman</option>
                            <option value="24">24/halaman</option>
                            <option value="48">48/halaman</option>
                        </select>
                    </div>       
                </div>

                <PopUp1 popUpStyle={popUpStyle} popUpAction={popUpAction}/>
            </div>
    )
}

export default MainInventory;