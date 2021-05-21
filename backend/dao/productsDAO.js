import mongodb from 'mongodb'
const ObjectID = mongodb.ObjectID;

let products;

export default class ProductsDAO {

    static async injectDB(conn) {
        if (products) {
            return
        }
        try {
            products = await conn.db(process.env.DB).collection("products")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in productsDAO: ${e}`,
            )
        }
    }

    static async getOwnedProduct(owner, filters = null) {
        let query = {
            $and: []
        };

        if (filters) {
            if (filters.input) {
                switch (filters.by) {
                    case "0":
                        query.$and.push({
                            $text: {
                                $search: filters["input"]
                            }
                        })
                        break;
                    case "1":
                        query.$and.push({
                            variantsList: {
                                $elemMatch: {
                                    name: filters["input"]
                                }
                            }
                        })
                        break;
                    default:
                        console.error("undefined by")
                        break;
                }
            }


            if (filters.stokDown && !filters.stokUp)
                query.$and.push({
                    $or: [{
                        stock: {
                            $gte: parseInt(filters["stokDown"])
                        }
                    }, {
                        variantsList: {
                            $elemMatch: {
                                stok: {
                                    $gte: parseInt(filters["stokDown"])
                                }
                            }
                        }
                    }]
                })

            if (filters.stokUp && !filters.stokDown)
                query.$and.push({
                    $or: [{
                        stock: {
                            $lte: parseInt(filters["stokUp"])
                        }
                    }, {
                        variantsList: {
                            $elemMatch: {
                                stok: {
                                    $lte: parseInt(filters["stokUp"])
                                }
                            }
                        }
                    }]
                })

            if (filters.stokUp && filters.stokDown)
                query.$and.push({
                    $or: [{
                        stock: {
                            $range: [filters["stokDown"], filters["stokUp"]]
                        }
                    }, {
                        variantsList: {
                            $elemMatch: {
                                stok: {
                                    $range: [filters["stokDown"], filters["stokUp"]]
                                }
                            }
                        }
                    }]
                })

            query.$and.push({
                owner: {
                    $eq: ObjectID(owner)
                }
            })
        }


        let sort = {}    
                
        if(filters.sortPrice && filters.sortPrice != 0)
            sort.price = (filters.sortPrice == 1) ? 1 : -1
        
        if(filters.sortStok && filters.sortStok != 0)
            sort.stock = (filters.sortStok == 1) ? 1 : -1 

        let cursor;

        try {
            cursor = await products.find(query).sort(sort);
        } catch (e) {
            console.error(e.message);
            return [];
        }

        const displayCursor = cursor.limit(parseInt(filters.perPage)).skip(parseInt(filters.perPage) * (parseInt(filters.page) - 1));

        try {
            const productList = await displayCursor.toArray();
            return productList
        } catch (e) {
            console.error(`Unable to conver cursor to array or problem counting documents, ${e}`)
            return [];
        }

    }

    static async updateProduct(name, stock, price, imgDir, product_id){
        try{
            if(imgDir)
                return await products.updateOne( 
                    {_id:ObjectID(product_id)}, 
                    {$set: { name:name,stock:parseInt(stock),price:parseInt(price),img:imgDir } }
                )
            
            if(!imgDir)
                return await products.updateOne( 
                    {_id:ObjectID(product_id)}, 
                    {$set: { name:name,stock:parseInt(stock),price:parseInt(price)} }
                )

        }catch(e){
            console.error(e.message);
        }
    }

    static async updateProductWithVariant(name,variantName,variantList,prodId){
        try{
            return await products.updateOne(
                { _id:ObjectID(prodId) },
                { $set: { name:name,stock:parseInt(variantName),variantsList:variantList } }
            )
        }catch(e){
            console.error(e.message);
        }
    }

    static async insertProduct(name, stock, price, imgDir, created_date, owner) {
        try {
            const prodDoc = {
                name: name,
                stock: parseInt(stock),
                price: parseInt(price),
                img: imgDir,
                created_on: created_date,
                owner: owner
            }
            return await products.insertOne(prodDoc);
        } catch (e) {
            console.error(e.message);
        }
    }

    static async insertProductWithVariant(name, variantName, variantsList, created_on, owner) {
        try {
            const prodDoc = {
                name: name,
                variantName: variantName,
                variantsList: variantsList,
                created_on: created_on,
                owner: owner
            }
            return await products.insertOne(prodDoc)
        } catch (e) {
            console.error(e.message);
        }
    }

    static async deleteProduct(id, userId) {
        try {
            return await products.deleteOne({
                _id: ObjectID(id),
                owner: ObjectID(userId)
            })
        } catch (e) {
            console.error(e.message);
        }
    }

}