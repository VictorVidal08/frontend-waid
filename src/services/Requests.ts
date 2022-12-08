import axios from 'axios';
import { IRegister } from '../interfaces/IRegister';

//  Local: http://localhost:3001/user
//  Production link: https://backend-waid-production.up.railway.app/register
export async function register(userData: IRegister) {
    const response = await axios.post('http://localhost:3001/user', 
      { email: userData.email, password: userData.password, userName: userData.userName, image: userData.image });
    return response;
  }