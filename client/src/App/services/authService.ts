import axios from 'axios';

interface LoginData {
  email: string,
  password: string,
}

interface RegistationData extends LoginData {
  fullName: string,
  wantsRecieveNotifications: boolean,
}

class AuthService {

  static register = (data: LoginData) => {
    return axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
  }

  static login = (data: RegistationData) => {
    return axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
  }

}

export default AuthService;