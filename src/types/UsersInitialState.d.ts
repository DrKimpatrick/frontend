interface UsersInitialState {
  currentUser: {
    isLoggedIn: boolean;
    data: object | null | any;
    loading: boolean;
    error: null | object | any;
  };
}

export default UsersInitialState;
