import React, {useState, useEffect} from "react"
import { useHistory } from "react-router"
import WithoutVariant from "./AddProductComponent/WithoutVariant"
import WithVariant from "./AddProductComponent/WithVariant"
import ProductsDataService from "../../../services/products"
import PopUp1 from "../popUp1"

const AddProduct = (props) =>{
    const history = useHistory();
    const [popUpStyle,setPopUpStyle] = useState({});
    const [submitDisabled,setSubmitDisabled] = useState(false);
    const [withVariant,setWithVariant] = useState(false);
    const [variantList,setVariantList] = useState([{ text:"", style:{transform:"translateY(0%)"}, price:0, stok:0 ,img:"",imgType:""}]);
    const [variantName,setVariantName] = useState("");
    const [productName,setProductName] = useState("");
    const [price,setPrice] = useState("");
    const [stok,setStok] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

    const popUpAction = (act) => (e) => {
        switch(act){
            case 0:
                setPopUpStyle({opacity:0,pointerEvents:"none"})
                setSubmitDisabled(false);
                break;
            case 1:
                submit();
                break;
            default:
                break;
        }
    }

    const handleVariantChange = () =>{
        setWithVariant(!withVariant)
        setPrice("");
        setStok("");
        setSelectedImage("");
        setVariantName("");
        setVariantList([{ text:"", style:{transform:"translateY(0%)"}, price:0, stok:0 , img:"",imgType:""}]);
    }

    const handleChange = (e) =>{
        setProductName(e.target.value);
    }

    const goBack = () =>{
        history.push("/main/inventory")
    }

    const handleClick = (act) => (e) => {
        switch(act){
            case 0:
                goBack();
                break;
            case 1:
                setSubmitDisabled(true);
                setPopUpStyle({opacity:1,pointerEvents:"all"})
                break;
            default:
                break;
        }
    }

    const submit = () =>{        

        let imgFile;
        if(selectedImage)
            imgFile = selectedImage.name.substring(selectedImage.name.length-3,)

        ProductsDataService.insertProducts(productName,price,stok,variantName,variantList,withVariant,imgFile).then((res)=>{
            const id = res.data.insertedProduct;
            const imgName = res.data.imgDir;   
            const imgNameArr = res.data.imgDirArr;

            if(selectedImage)
                return ProductsDataService.uploadProductImage(selectedImage,id,imgName).then(res=>{
                    props.refreshProductsList();
                    setSubmitDisabled(false);
                    goBack();
                }) 


            if(withVariant){
                for(let i = 0;i<variantList.length;i++){
                    ProductsDataService.uploadProductImage(variantList[i].img,id,imgNameArr[i]);
                }
            }
            
            props.refreshProductsList();
            setSubmitDisabled(false);
            goBack();
        });
        
    }   

    return(
        <div className="addProductPage">
           <h3 className="title">Informasi Produk</h3>
           <div className="input-group">
                <label>Nama Produk</label>
                <input type="text" name="productName" value={productName} onChange={handleChange} placeholder="input"/>
           </div>

            {
            !withVariant ? 
                <WithoutVariant selectedImage={selectedImage} setSelectedImage={setSelectedImage} setPrice={setPrice} setStok={setStok} price={price} stok={stok} handleVariantChange={handleVariantChange} />
            : 
                <WithVariant variantName={variantName} setVariantName={setVariantName} handleVariantChange={handleVariantChange} variantList={variantList} setVariantList={setVariantList}/>
            }

            <div className="row_add_product">
                <button className="backButton" onClick={handleClick(0)}>Kembali</button>
                <button className="insertButton" onClick={handleClick(1)} disabled={submitDisabled}>Simpan</button>
            </div>
            
            <PopUp1 popUpStyle={popUpStyle} popUpAction={popUpAction}/>
        </div>
    )   
}

export default AddProduct;