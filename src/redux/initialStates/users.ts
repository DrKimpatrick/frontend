const users:any = {
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
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
  },
  isLoggedIn: false
};

export default users;
