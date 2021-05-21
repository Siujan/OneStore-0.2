import ProductsDAO from "../dao/productsDAO.js";

export default class UsersController {

    static async apiGetOwnedProduct(req,res){
        if(!req.user) return res.redirect("http://localhost:3000/");

        // by 0 mean search by name, by 1 mean search by variant name
        // perPage (0,12),(1,24),(2,48)
        let filters ={
            by: req.query.by,
            input: req.query.input,
            stokUp: req.query.stokUp,
            stokDown: req.query.stokDown,
            page: req.query.page || 1,
            perPage: req.query.perPage || 12,
            sortPrice: req.query.sortPrice,
            sortStok: req.query.sortStok
        }

        try{
            const owner = req.user._id;
            const prodRes = await ProductsDAO.getOwnedProduct(owner,filters);
            res.json(prodRes);
        }catch(e){
            res.status(500).json({error: e.message});            
        }
    }

    static async apiInsertProduct(req,res,next){
        if(!req.user) return res.sendStatus("user have not yet authenticate");
        
        try{
            const name = req.body.name;
            const stock = req.body.stock;
            const price = req.body.price;
            let imgDir;
            const variantList = req.body.variantList;
            const variantName = req.body.variantName;
            const withVariant = req.body.withVariant;
            const created_on = new Date();
            const owner = req.user._id;
            let prodResponse;
            let newArr = [];
            if(withVariant){
                newArr = [];    
                imgDir = Date.now();
                variantList.forEach((x,i)=>{
                    newArr.push({name:x.text,price:x.price,stok:parseInt(x.stok), img:imgDir + i + "."+x.imgType})
                })
                prodResponse = await ProductsDAO.insertProductWithVariant(name,variantName,newArr,created_on,owner);
            }else{
                imgDir = Date.now() + "." + req.body.imgFile;
                prodResponse = await ProductsDAO.insertProduct(name,stock,price,imgDir,created_on,owner);
            }
            
            res.locals.owner = owner;
            res.locals.imgDir = imgDir;
            res.locals.imgDirArr = newArr.map(x=>x.img)
            next(null, prodResponse.ops[0])
        }catch(e){
            console.log("Something wrong with inserting product into the database")
            res.status(500).json({error: e.message});
        }
    }
    
    static async apiUpdateProduct(req,res,next){
        if(!req.user) return res.sendStatus("user have not yet authenticate");

        try{
            const prodId = req.body.product_id;
            const name = req.body.name;
            const stock = req.body.stock;
            const price = req.body.price;
            let imgDir;
            const variantList = req.body.variantList;
            const variantName = req.body.variantName;
            const withVariant = req.body.withVariant;
            const owner = req.user._id;
            let prodResponse;
            let newArr = [];
            if(!withVariant){
                if(req.body.imgFile){
                    imgDir = Date.now() + "." + req.body.imgFile;
                    prodResponse = await ProductsDAO.updateProduct(name,stock,price,imgDir,prodId);
                }else{
                    prodResponse = await ProductsDAO.updateProduct(name,stock,price,imgDir,prodId);
                }
            }else{
                imgDir = Date.now();
                variantList.forEach((x,i)=>{
                    if(typeof x.img === "object"){
                        newArr.push({name:x.text,price:x.price,stok:parseInt(x.stok), img:imgDir + i + "."+x.imgType})
                    }
                        
                    if(typeof x.img === "string"){
                        newArr.push({name:x.text,price:x.price,stok:parseInt(x.stok), img:x.img })
                    }
                        
                })
                prodResponse = await ProductsDAO.updateProductWithVariant(name,variantName,newArr,prodId);
            }

            res.locals.imgDir = imgDir;
            res.locals.owner = owner;
            res.locals.imgDirArr = newArr.map(x=>x.img);
            next(null, true);            
        }catch(e){
            res.status(500).json({error:e.message});
        }
    }

    static async apiDeleteProduct(req,res,next){
        try{
            const product_id = req.query.id;
            const user_id = req.user._id;
            const prodRes = await ProductsDAO.deleteProduct(product_id,user_id);
            console.log(prodRes)
            res.json({success:true})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }

}