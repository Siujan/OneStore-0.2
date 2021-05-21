import express from "express"
import UsersCtrl from './users.controller.js'
import ProductsCtrl from './products.controller.js'
import passport from 'passport'
import multer from 'multer'
import path from 'path'
import { existsSync,mkdirSync } from "fs"



const router = express.Router();

//#region Users Route
router.route("/users")
        .post(UsersCtrl.apiInsertUser, 
                passport.authenticate('local', {failureRedirect:"http://localhost:3000/"}),
                    (req,res,next)=>{                         
                        res.json({success:true})
                    } )

router.route("/users").put(UsersCtrl.apiUpdateUser)
router.route("/users/availability/username/:username").get(UsersCtrl.apiGetUsernameAvailability);
router.route("/users/availability/email/:email").get(UsersCtrl.apiGetEmailAvailability);
//#endregion

//#region Products Route

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        const jsonInput = JSON.parse(decodeURIComponent(file.originalname));
        const path = "./image/product/" + jsonInput.id;
        if(!existsSync(path))
            mkdirSync(path, { recursive: true })
        cb(null, path )
    },
    filename: (req, file, cb) =>{
        const jsonInput = JSON.parse(decodeURIComponent(file.originalname));
        cb(null, jsonInput.imgName );
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 2000000}
}).single("myImage")

router.route("/uploadPhoto")
            .post((req,res)=>{
                upload(req,res, (err) =>{
                    res.json({success:true})
                })
            })

router.route("/products")
            .post(ProductsCtrl.apiInsertProduct,
                (req,res)=>{
                    res.json({success:true,insertedProduct:res.locals.owner,imgDir:res.locals.imgDir,imgDirArr:res.locals.imgDirArr})
                })

router.route("/products")
            .get(ProductsCtrl.apiGetOwnedProduct);

router.route("/products")
            .delete(ProductsCtrl.apiDeleteProduct);

router.route("/products")
            .put(ProductsCtrl.apiUpdateProduct,
                (req,res)=>{
                    res.json({success:true,insertedProduct:res.locals.owner,imgDir:res.locals.imgDir,imgDirArr:res.locals.imgDirArr})
                });

//#endregion

//#region Authentication Route
router.route("/auth/")
        .get((req,res)=>{
            res.json(req.user);
        })

router.route("/auth/login")
        .post((req,res,next)=>{
            passport.authenticate('local', function(err,user,info){
                if(err) return console.error(err);
                
                if(!user) return res.json({accountNotFound: true})
                
                req.logIn(user, (err) =>{
                    if(err) return console.error(err)
                    
                    return res.json({accountNotFound: false})
                })

            })(req,res,next)
        })

router.route("/auth/google")
        .get(passport.authenticate('google', {scope: ['profile', 'email'] }));

router.route("/auth/google/callback")
        .get(
            passport.authenticate('google',
            {failureRedirect: 'http://localhost:3000/'}),
            (req,res) =>{
                res.redirect('http://localhost:3000/main/inventory');
            });

router.route("/auth/logout")
        .get((req,res)=>{
            console.log("logging out");
            console.log(req);
            req.logout();
            res.json({success:true});
        })

//#endregion

export default router
