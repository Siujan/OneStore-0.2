import http from "../http-common"

class UsersDataService {
    
    getUserNameAvailability(username){
        return http.get(`/users/availability/username/${username}`)
    }

    getEmailAvailability(email){
        return http.get(`/users/availability/email/${email}`)
    }

    updateUsers(username,email,fullname,phone){
        return http.put('/users',{
            username:username,
            email:email,
            fullname:fullname,
            phone:phone
        },{withCredentials:true})
    }

    insertUsers(username,email,password){
        return http.post('/users',{
            username:username,
            email:email,
            password:password
        },{withCredentials:true})
    }

}

export default new UsersDataService();