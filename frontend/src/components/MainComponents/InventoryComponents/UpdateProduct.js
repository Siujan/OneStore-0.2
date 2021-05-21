import React, {useState, useEffect} from "react"
import { useHistory} from "react-router"
import {useLocation} from 'react-router-dom'
import WithoutVariant from "./AddProductComponent/WithoutVariant"
import WithVariant from "./AddProductComponent/WithVariant"
import ProductsDataService from "../../../services/products"
import PopUp1 from "../popUp1"

const UpdateProduct = (props) =>{
    const location = useLocation();
    const [popUpStyle,setPopUpStyle] = useState({});
    const [submitDisabled,setSubmitDisabled] = useState(false);
    const [withVariant,setWithVariant] = useState(false);
    const [variantList,setVariantList] = useState([{ text:"", style:{transform:"translateY(0%)"}, price:0, stok:0 ,img:"",imgType:""}]);
    const [variantName,setVariantName] = useState("");
    const [productName,setProductName] = useState("");
    const [owner,setOwner] = useState("");
    const [price,setPrice] = useState("");
    const [stok,setStok] = useState("");
    const [product_id,setProduct_id] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const history = useHistory();
    
    useEffect(()=>{
        if(location.state){
            setProductName(location.state.name);
            setPrice(location.state.price);
            setStok(location.state.stock);
            setVariantName(location.state.variantName)
            setSelectedImage(location.state.owner + "/" + location.state.img)
            setProduct_id(location.state._id);
            setOwner(location.state.owner);
            if(location.state.variantsList){
                setWithVariant(true);
                let newArr = [];
                location.state.variantsList.forEach(x=>{
                    newArr.push({ text:x.name, style:{transform:"translateY(0%)"}, price:x.price, stok:x.stok ,img:x.img,imgType:x.img.substring(x.img.length-4,)})
                })
                setVariantList(newArr);
            }

        } 
    },[])

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

    const submit = () =>{
        setSubmitDisabled(true);

        // string mean no change
        // object mean there is change
        
        let imgFile;
        if(!withVariant){
            if(selectedImage && typeof selectedImage === "object")
                imgFile = selectedImage.name.substring(selectedImage.name.length-3,)

            if(typeof selectedImage === "string")
                imgFile = null;
        }

        // if img type in variant list is string no need to update
        // if image is object need to update
        ProductsDataService.updateProducts(productName,price,stok,variantName,variantList,withVariant,imgFile,product_id).then((res)=>{
            const id = res.data.insertedProduct;
            const imgName = res.data.imgDir;   
            const imgNameArr = res.data.imgDirArr;

            if(selectedImage && typeof selectedImage === "object"){
                return ProductsDataService.uploadProductImage(selectedImage,id,imgName).then(res=>{
                    props.refreshProductsList();
                    setSubmitDisabled(false);
                    goBack();
                }) 
            }

            console.log(imgNameArr)
            if(withVariant){
                for(let i = 0;i<variantList.length;i++){
                    if(typeof variantList[i].img === "object"){
                        console.log(imgNameArr[i])
                        console.log(id)
                        console.log(variantList[i].img)
                        ProductsDataService.uploadProductImage(variantList[i].img,id,imgNameArr[i]);
                    }
                        
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
                <WithVariant variantName={variantName} setVariantName={setVariantName} handleVariantChange={handleVariantChange} variantList={variantList} owner={owner} setVariantList={setVariantList}/>
            }

            <div className="row_add_product">
                <button className="backButton" onClick={handleClick(0)}>Kembali</button>
                <button className="insertButton" onClick={handleClick(1)} disabled={submitDisabled}>update</button>
            </div>

            <PopUp1 popUpStyle={popUpStyle} popUpAction={popUpAction}/>
        </div>
    );

}

export default UpdateProduct;