import React, {useState, useEffect} from "react"

const QueryBox = (props) =>{
    const [stokUpMax,setStokUpMax] = useState("0")
    const [sellUpMax,setSellUpMax] = useState("0")

    const handleChange = (e) =>{
        switch(e.target.id){
            case "queryType":
                props.setSelectedSearch(e.target.value);
                break;
            case "searchInput":
                props.setSearchInput(e.target.value);
                break;
            case "stokUp":
                props.setStokUpValue(e.target.value);
                break;
            case "stokDown":
                props.setStokDownValue(e.target.value);
                setStokUpMax(e.target.value);
                break;
            case "sellUp":
                props.setSellUpValue(e.target.value);
                break;
            case "sellDown":
                props.setSellDownValue(e.target.value);
                setSellUpMax(e.target.value)
                break;
            default:
                break;
        }
        
    }

    const reset = () => {
        console.log(props)
        props.setStokDownValue("");
        props.setStokUpValue("");
        props.setSellUpValue("");
        props.setSellDownValue("");
        props.setSearchInput("");
        props.setSelectedSearch("0");
        setStokUpMax("0");
        setSellUpMax("0");
        props.refreshProductsList();
    }

    return(
        <div className="queryBoxContainer mb-5">
            <div className="inventory-row" style={{marginBottom:"1rem"}}>
                <select name="searchBox" className="queryType" id="queryType" value={props.selectedSearch} onChange={handleChange}>
                    <option value="0">Nama Produk</option>
                    <option value="1">Variasi</option>
                </select>
                <input type="text" id="searchInput" name="searchInput" value={props.searchInput} onChange={handleChange} className="searchInput" placeholder="Input"/>
            </div>
            <div className="inventory-row" style={{marginBottom:"1rem"}}>
                <div className="rangeInputContainer" style={{paddingRight:"1rem"}}>
                    <label>Stok</label>
                    <input type="number" id="stokDown" name="stokDown" value={props.stokDownValue} min="0" onChange={handleChange} className="rangeInput" placeholder="input" />
                    <hr></hr>
                    <input type="number" id="stokUp" name="stokUp" value={props.stokUpValue} min={stokUpMax} onChange={handleChange} className="rangeInput" placeholder="input" />
                </div>
                <div className="rangeInputContainer" style={{paddingLeft:"1rem"}}>
                    <label>Penjualan</label>
                    <input type="number" id="sellDown" name="sellDown" value={props.sellDownValue} min="0" onChange={handleChange} className="rangeInput" placeholder="input" />
                    <hr></hr>
                    <input type="number" id="sellUp" name="sellUp" value={props.sellUpValue} min={sellUpMax} onChange={handleChange} className="rangeInput" placeholder="input" />
                </div>
            </div>
            <div className="inventory-row">
                <button className="searchButton" onClick={props.search}>Cari</button>
                <button className="resetButton" onClick={reset}>Atur Ulang</button>
            </div>
        </div>
    )
}

export default QueryBox;