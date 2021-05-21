import React, {useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faArrowsAlt} from "@fortawesome/free-solid-svg-icons"

const WithVariant = (props) =>{
    const MAX_VARIANT = 20;
    const [dragidx,setdragIdx] = useState(0);
    const [onDragWait, setOndragWait] = useState(false);

    const handleChange = idx => (e) =>{
        let newVariant = [...props.variantList];
        newVariant[idx].text = e.target.value;
        props.setVariantList(newVariant)
    }

    const uploadPhoto = idx => (e) =>{
        let newVariant = [...props.variantList]
        console.log(e.target.files[0])
        newVariant[idx].img = e.target.files[0];
        newVariant[idx].imgType = e.target.files[0].name.substring(e.target.files[0].name.length-3,);
        props.setVariantList(newVariant);
    }

    const handleChangeName = (e) =>{
        props.setVariantName(e.target.value)
    }

    const deleteVariant = idx => (e) =>{
        let newVariantList = [...props.variantList];
        newVariantList.splice(idx,1);
        props.setVariantList(newVariantList)
    }

    const addVariantList = () =>{
        if(props.variantList.length <= MAX_VARIANT){
            let newVariantList = [...props.variantList];
            newVariantList.push({text:"", style:{transform:"translateY(0%)"}, price:0, stok:0, img:"",imgType:"" });
            props.setVariantList(newVariantList);
        }
    }

    const handleChangeVariantList = (i,act) => (e) =>{
        let newVariantList = [...props.variantList];
        switch(act){
            case 0:
                newVariantList[i].price = e.target.value;
                break;
            case 1:
                newVariantList[i].stok = e.target.value;
                break;
            default:
                break;
        }

        props.setVariantList(newVariantList);
    }

    const dragStart = idx => (e) =>{
        setdragIdx(parseInt(idx))
    }

    const dragEnter = idx => (e) =>{
        if(e.target.getAttribute("dragbox") == null || dragidx === idx || onDragWait)
            return;
        
        let newVariantList = [...props.variantList];
        newVariantList[parseInt(dragidx)].style ={transform:"translateY(calc("+ ((idx-dragidx) * 100) +"% + " + (idx-dragidx) + "rem))",transition:"all .3s"}

        if(idx > dragidx){
            for(let i=dragidx+1;i<=idx;i++){
                newVariantList[i].style = {transform:"translateY(calc(-100% + -1rem))",transition:"all .3s"}                    
            }
            
        }else{
            for(let i=idx;i<=dragidx-1;i++){
                newVariantList[i].style = {transform:"translateY(calc(100% + 1rem))",transition:"all .3s"}
            }               
        }
        setOndragWait(true);
        props.setVariantList(newVariantList);

        setTimeout(() =>{
            let newVariantList = [...props.variantList];

            if(idx > dragidx){
                newVariantList.splice(idx+1,0,newVariantList[dragidx]);
                newVariantList.splice(dragidx,1);
            }else{
                newVariantList.splice(idx,0,newVariantList[dragidx])
                newVariantList.splice(dragidx+1,1);
            }
            
            newVariantList.map(x=>{
                x.style = {transform:"translateY(0%)"};
            })
            props.setVariantList(newVariantList);
            setOndragWait(false);
            setdragIdx(idx);           
        },300)


    }

    const dragOver = idx => (e) =>{
        e.preventDefault();
    }

    return(
        <div>
            <div className="variant-container">
                <label>Variasi 1</label>
                <div className="variant-box">
                    <span className="close" onClick={props.handleVariantChange}>x</span>
                    <div className="input-group">
                        <label>Nama</label>
                        <input type="text" value={props.variantName} onChange={handleChangeName} name="variantName" placeholder="Masukan nama variasi, contoh: warna,dll"/>
                    </div>
                    {props.variantList.map((x,i)=>{
                        return(
                            <div className="input-group" dragbox="1" style={x.style} key={i} draggable={true} onDragStart={dragStart(i)} onDragEnter={dragEnter(i)} onDragOver={dragOver(i)}>
                                { (i === 0) ? <label>Pilihan</label> : <label></label>}
                                <input type="text" name="variantChoice" value={x.text} onChange={handleChange(i)} placeholder="Masukan pilihan variasi, contoh: Merah,dll"/>
                                {(props.variantList.length > 1) ? 
                                    <div className="icon-wrapper">
                                        <FontAwesomeIcon icon={faTrashAlt} className="input-icon" onClick={deleteVariant(i)}/>
                                        <FontAwesomeIcon icon={faArrowsAlt} className="input-icon" id="draggableIcon"  draggable={true}/>                                       
                                    </div>
                                : ""}
                            </div>   
                        )                       
                    })}
                    <div className="input-group">
                        <label></label>
                        <button type="button" className="addVariasi" onClick={addVariantList}>+ Tambahkan Pilihan ({props.variantList.length + "/" + MAX_VARIANT})</button>
                    </div>  
                </div>
            </div> 

            <div className="table-container">
                <label>Daftar Variasi</label>
                <table>
                    <thead>
                        <tr>
                            <td className="thead">Nama</td>
                            <td className="thead">Harga</td>
                            <td className="thead">Stok</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.variantList.map((x,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{x.text}</td>
                                        <td>
                                            <input type="number" min="0" value={x.price} onChange={handleChangeVariantList(i,0)}/>
                                        </td>
                                        <td>
                                            <input type="number" min="0" value={x.stok} onChange={handleChangeVariantList(i,1)}/>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>  
            
            <div className="pictures-container">
                <label>Foto</label>
                <div className="pictures-list">
                    {props.variantList.map((x,i)=>{
                        return(
                            <div className="picture-container" key={i}>
                                <label className="upload-photo-label" htmlFor={"upload-photo" + i}>
                                {!x.img ? "+" : (typeof x.img === 'string') ? <img src={"http://localhost:5000/product/" + props.owner + "/" + x.img}/> : <img src={URL.createObjectURL(x.img)} />}
                                </label>
                                <input type="file" id={"upload-photo" + i} onChange={uploadPhoto(i)} className="upload-photo"/>
                                <span>{x.text}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>           
    )
}

export default WithVariant;