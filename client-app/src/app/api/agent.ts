import axios, { AxiosResponse, AxiosError } from 'axios'
import { IActivity } from '../models/activity';
import { history } from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response:AxiosResponse) =>{
return response.data;
}

axios.interceptors.response.use(undefined,error=>{
    console.log(error);
   
    if(error.message ==='Network Error' && !error.response)
    {
        console.log("in error");
        toast.error('Network error- Make sure API is running !!');
    }
    const {status,data,config} = error.response;
    if(error.response.status === 404)
    {
        history.push('/notfound');
    }
    if(config.method==='get' && data.errors.hasOwnProperty('id')&& status===500)
    {
        history.push('/notfound');

    }
    if(status=== 500)
    {
        toast.error('Server error - Check terminal for more info');
    }
   
});



const sleep = (ms:number) => (response:AxiosResponse) => new Promise<AxiosResponse>(resolve=> setTimeout(()=> resolve(response),ms));

//common requests which will be used through axios e.g. put post get delete
const requests = {

get : (url:string) => axios.get(url).then(sleep(1000)).then(responseBody),

post : (url:string,body:{}) => axios.post(url,body).then(sleep(1000)).then(responseBody),

put: (url:string ,body :{}) => axios.put(url,body).then(sleep(1000)).then(responseBody),

delete :(url:string) => axios.delete(url).then(sleep(1000))

}

const Activities = {

list : () : Promise<IActivity[]> => requests.get('/activities'),
details : (id:string) : Promise<IActivity> => requests.get(`/activities/${id}`),
create : (activity: IActivity) => requests.post('/activities',activity),
update : (activity:IActivity) => requests.put(`/activities/${activity.id}`,activity),
delete : (id:string) => requests.delete(`/activities/${id}`)
}



export default {
    Activities
}