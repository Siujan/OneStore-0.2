import http from "../http-common"

class AuthenticationDataService {
    getAuthenticatedUser(){
        return http.get('/auth',{withCredentials:true})
    }
    googleLogin(){
        return http.get('/auth/google')
    }

    postLogin(username,password){
        return http.post('/auth/login',{
            username:username,
            password:password
        },{withCredentials:true})
    }

    logout(){
        return http.get('/auth/logout',{withCredentials:true});
    }
}

export default new AuthenticationDataService();