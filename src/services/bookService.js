import api from './api';

export async function GetAllBook() {
    try{
        var response = await api.get(
            'book')
        
        return response.data;
    } catch(exception) {
        console.log(exception);
    }
}