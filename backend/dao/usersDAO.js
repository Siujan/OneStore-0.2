import passport from 'passport'
import mongodb from 'mongodb'
import LocalStrategy from 'passport-local'
import GoogleOauth from 'passport-google-oauth2'
import bcrypt from 'bcrypt'
const ObjectID = mongodb.ObjectID;
const GoogleStrategy = GoogleOauth.Strategy;
const baseURI = "http://localhost:5000/api/v1/onestore/"

let users

function setUpPassport(){

    passport.serializeUser((user, done) => { 
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {

        users.findOne({ _id: new ObjectID(id) }, (err, doc) => {
            if(err) return console.error(err)
            
            done(null, doc);
        });
    });   
    
    passport.use(new LocalStrategy(
        function(username, password, done) {
            users.findOne({$or: [{'email': username}, {'username': username}]}, function (err, user) {
                if (err) return done(err);

                if (!user) return done(null, false); 
                
                if(!user.password) return done(null,false);

                if (!bcrypt.compareSync(password, user.password))return done(null, false); 
            
                return done(null, user);
            });
        }
    ));    

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: baseURI + 'auth/google/callback'
      },
        function (accessToken, refreshToken, profile, cb) {
            users.findOneAndUpdate(
                { "provider.google": profile.id },
                {
                  $setOnInsert: {
                    username: profile.displayName,
                    email: profile.email,
                    created_on: new Date(),
                    "provider.google": profile.id
                  }
                },
                { upsert: true, new: true, returnNewDocument: true},
                (err, doc) => {
                    if(err) return console.error(err)

                    return cb(null, doc.value);
                }
              );
        }
      ));    
}

export default class UsersDAO{
    static async injectDB(conn) {
        if(users) {
            return
        }
        try{
            users = await conn.db(process.env.DB).collection("users")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in usersDAO: ${e}`,
            )
        }finally{
            setUpPassport();
        }
    }

    static async insertUser(username,password,email,created_date){
        try{
            const userDoc = {
                username: username,
                password: password,
                email: email,
                created_on: created_date
            }
            return await users.insertOne(userDoc);
        }catch(e){
            console.error(e.message);
        }

    }

    static async updateUser(id,username,fullname,email,phone,updated_date){
        try{
            const updateUser = await users.updateOne(
                                {_id:ObjectID(id)},
                                {$set: {username:username, fullname:fullname, email:email, phonenumber:phone, updated_date:updated_date}});
            return updateUser;
        }catch(e){
            console.error(e.message);
        }

    }

    static async deleteUser(id){
        try{
            users.createIndex({"expireAt":1},{ expireAfterSeconds: 300 })
            const deleteUser = await users.updateOne(
                {_id:ObjectID(id)},
                {$set: {expireAt:new Date()}}
            )
            return deleteUser;
        }catch(e){
            console.error(e.message);
        }
    }

    static async getUserNameAvailability(username){
        try{
            return await users.findOne({username:username})
        }catch(e){
            console.error(e.message);
        }
    }

    static async getEmailAvailability(email){
        try{
            return await users.findOne({email:email})
        }catch(e){
            console.error(e.message)
        }
    }

}