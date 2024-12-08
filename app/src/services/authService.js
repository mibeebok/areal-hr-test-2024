import http from './http';

class AuthService {
  async login(loginData) {
    const response = await http.post('/auth/login', loginData);
    localStorage.setItem('token', response.data.access_token); 
    return response.data;
  }

  async logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();
