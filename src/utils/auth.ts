/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  // isAuthenticated: true,
  signin(callback: () => void) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: () => void) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { fakeAuthProvider };
