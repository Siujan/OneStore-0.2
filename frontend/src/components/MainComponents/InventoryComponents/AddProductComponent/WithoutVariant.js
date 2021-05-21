import React, {useState, useEffect} from "react"

const WithoutVariant = (props) =>{

    const handleChange = action => (e)=>{
        switch(action){
            case 1:
                props.setPrice(e.target.value);
                break;
            case 2:
                props.setStok(e.target.value);
                break;
            default:
                break;
        }
    }

    const photoUpload = (e) =>{
        props.setSelectedImage(e.target.files[0])
    }

    return(
            <div>
                <div className="input-group">
                    <label>Harga</label>
                    <div className="priceContainer">
                        <span className="priceTag">Rp</span>
                        <input type="number" name="price" className="priceInput" value={props.price} onChange={handleChange(1)} placeholder="input"/>
                    </div>
                </div>    
                <div className="input-group">
                    <label>Stok</label>
                    <input type="number" name="stok" min="0" value={props.stok} onChange={handleChange(2)} placeholder="input"/>
                </div>
                <div className="input-group">
                    <label>Variasi</label>
                    <button type="button" className="addVariasi" onClick={props.handleVariantChange}>+ Aktifkan Variasi</button>
                </div>  
                <div className="input-group">
                    <label>Foto</label>
                    <label id="upload-photo-label" htmlFor="upload-photo">
                        {!props.selectedImage ? "+" : (typeof props.selectedImage === 'string') ? <img src={"http://localhost:5000/product/" + props.selectedImage}/> : <img src={URL.createObjectURL(props.selectedImage)} />}
                    </label>
                    <input type="file" id="upload-photo" onChange={photoUpload} className="inputPhoto"/>
                </div>
            </div> 
    )
}

export default WithoutVariant;