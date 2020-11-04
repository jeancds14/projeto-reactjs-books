import api from './api';

export async function SignInUser(email, password) {
    try{
        var response = await api.post(
            'user/login',
            {
                email: email,
                password: password
            } 
        )
        
        return response.data;
    } catch(exception) {
        console.log(exception);
    }
}

export async function SignUpUser(email, password) {
    var response = await api.post(
        'user',
        {
            email: email,
            password: password
        } 
    )
    
    return response.data;
}
