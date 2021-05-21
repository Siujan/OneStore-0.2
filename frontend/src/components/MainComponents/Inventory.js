import React, {useState, useEffect} from "react"
import "../../css/inventory.css"
import ProductsDataService from '../../services/products'
import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";
import { useHistory } from "react-router"
import MainInventory from "./InventoryComponents/MainInventory"
import AddProduct from "./InventoryComponents/AddProduct"
import UpdateProduct from "./InventoryComponents/UpdateProduct"

const Inventory = (props) =>{
    
    const history = useHistory();

    const [stokDownValue, setStokDownValue] = useState("");
    const [stokUpValue, setStokUpValue] = useState("");
    const [sellUpValue, setSellUpValue] = useState("");
    const [sellDownValue, setSellDownValue] = useState("");
    const [searchInput,setSearchInput] = useState("");
    const [selectedSearch,setSelectedSearch] = useState("0");
    const [sortPrice,setSortPrice] = useState(0);
    const [sortStok,setSortStok] = useState(0);
    const { path, url } = useRouteMatch();
    const [ownedProducts,setOwnedProducts] = useState([]);
    const [page,setPage] = useState("1")
    const [perPage,setPerPage] = useState("12");

    useEffect(()=>{
        refreshProductsList();
    },[])

    const refreshProductsList = () =>{
        ProductsDataService.getAllOwnedProducts().then((res)=>{
            setOwnedProducts(res.data);
        });
    }

    const search = () =>{
        // by 0 is product name and by 1 is variation name
        const query = {
            input: searchInput,
            by: selectedSearch,
            stokUp: stokUpValue,
            stokDown: stokDownValue,
            page:page,
            perPage:perPage,
            sortPrice:sortPrice,
            sortStok:sortStok
        }

        ProductsDataService.find(query).then(res=>{
            setOwnedProducts(res.data)
        }).catch(e =>{
            console.log(e);
        })

    }

    return(
        <div id="main-inventory-container">
            <Switch>
                <Route exact path={[path]} >
                    <MainInventory stokDownValue={stokDownValue} stokUpValue={stokUpValue} sellUpValue={sellUpValue} 
                                    sellDownValue={sellDownValue} searchInput={searchInput} selectedSearch={selectedSearch}
                                    setStokDownValue={setStokDownValue} setStokUpValue={setStokUpValue} setSellUpValue={setSellUpValue}
                                    setSellDownValue={setSellDownValue} setSearchInput={setSearchInput} setSelectedSearch={setSelectedSearch}
                                    page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} sortPrice={sortPrice} setSortPrice={setSortPrice}
                                    sortStok={sortStok} setSortStok={setSortStok} refreshProductsList={refreshProductsList} 
                                    search={search} setOwnedProducts={setOwnedProducts} ownedProducts={ownedProducts} accId={props.accId}/>
                </Route>
                <Route path={[`${path}/addProduct`]} >
                    <AddProduct refreshProductsList={refreshProductsList}/>
                </Route>
                <Route path={[`${path}/updateProduct`]} >
                    <UpdateProduct refreshProductsList={refreshProductsList}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Inventory;