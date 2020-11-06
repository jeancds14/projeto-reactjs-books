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

export async function CreateBook(data) {
    try{
        var response = await api.post(
            'book',
            data
        );
        
        return response.data;
    } catch(exception) {
        console.log(exception);
    }
}