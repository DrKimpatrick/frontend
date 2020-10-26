const users = {
  currentUser: {
    isLoggedIn: localStorage.getItem('token') ? true : false,
    loading: false,
    error: null,
    message: null,
    created: false,
    data: {
      firstName: 'John',
      lastName: 'Smith',
      profilePicture:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }
};

export default users;
