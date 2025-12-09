import axios from 'axios';

const uri = import.meta.env.VITE_ENV === 'dev' ? import.meta.env.VITE_DEV_URI : import.meta.env.VITE_PROD_URI

console.log(uri);


const server = axios.create({
    baseURL : `${uri}/api`,
    withCredentials : true,

});

server.interceptors.response.use(undefined, async (error) => {
  if(error.response?.status === 401){
    await refreshToken();
    return instance(error.config); // Retry original request
  };

  throw error;
})


export default server