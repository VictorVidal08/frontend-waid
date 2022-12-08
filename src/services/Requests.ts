import axios from 'axios';
import { IRegister } from '../interfaces/IRegister';
import { ILogin } from '../interfaces/ILogin';

//  Local: http://localhost:3001/user
//  Production link: https://backend-waid-production.up.railway.app/register
export async function register(userData: IRegister) {
    const response = await axios.post('http://localhost:3001/user', 
      { email: userData.email, password: userData.password, userName: userData.userName, image: userData.image });
    return response;
  }

//  Local: http://localhost:3001/login
//  Production link: https://backend-waid-production.up.railway.app/login
export async function login(userData: ILogin) {
    const response = await axios.post('http://localhost:3001/login', 
      { email: userData.email, password: userData.password });
    return response;
}

export async function getUsers(token: string | null) {
    const response = await axios.get('http://localhost:3001/users', {
      headers: {
        'authorization': token
      }
    });
    return response;
}

export async function getPosts(token: string | null) {
  const response = await axios.get('http://localhost:3001/posts', {
    headers: {
      'authorization': token
    }
  });
  return response;
}