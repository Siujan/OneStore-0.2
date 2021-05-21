import http from '../http-common'

class ProductsDataService {

    uploadProductImage(img,id,imgName){
        const formData = new FormData();
        const payload = {imgName:imgName,id:id}
        formData.append('myImage',img, JSON.stringify(payload));
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        };
        return http.post("/uploadPhoto",formData,config)
    }

    insertProducts(name,price,stock,variantName,variantList,withVariant,imgFile){
        return http.post('/products',{
            name:name,
            price:price,
            stock:stock,
            variantName:variantName,
            variantList:variantList,
            withVariant:withVariant,
            imgFile:imgFile
        },{withCredentials:true})
    }

    updateProducts(name,price,stock,variantName,variantList,withVariant,imgFile,product_id){
        return http.put('/products',{
            name:name,
            price:price,
            stock:stock,
            variantName:variantName,
            variantList:variantList,
            withVariant:withVariant,
            imgFile:imgFile,
            product_id:product_id
        },{withCredentials:true})       
    }

    getAllOwnedProducts(){
        return http.get('/products', {withCredentials:true})
    }

    find(query){
        return http.get(`/products?by=${query.by}&input=${query.input}&stokUp=${query.stokUp}&stokDown=${query.stokDown}&page=${query.page}&perPage=${query.perPage}&sortPrice=${query.sortPrice}&sortStok=${query.sortStok}`, {withCredentials:true});
    }

    delete(id){
        return http.delete(`/products?id=${id}`, {withCredentials:true})
    }

}

export default new ProductsDataService();
