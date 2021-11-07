import AuthService from '../services/auth/auth.service';

const AuthProvider = {
  _isAuthenticated: false,
  get isAuthenticated(): boolean {
    console.log('accessToken');
    return !!AuthService.accessToken;
  },
  // signin(callback: () => void) {
  //   AuthProvider._isAuthenticated = true;
  //   setTimeout(callback, 100);
  // },
  async signout(callback: () => void) {
    const res = await AuthService.signout();
    AuthProvider._isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export default AuthProvider;
