export const initialState = {
  users: {
    currentUser: {
      isLoggedIn: true,
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
    user: {
      _id: 'id',
      username: 'username',
      email: 'email',
      roles: ['talent'],
      updatedAt: '2020-10-10',
      dateRegistered: '2020-10-10',
      paymentStatus: 'verified',
      featureChoice: 'local',
      verified: true
    }
  },
  employments: {
    employment: {
      companyName: 'snow',
      supervisor: 'supervisor',
      title: 'title',
      startDate: '2020-10-5',
      responsibilities: ['res'],
      accomplishments: ['res'],
      favoriteProject: 'res',
      _id: 'id'
    },
    errors: null,
    loading: false,
    submitLoading: false
  },
  messages: {
    message: 'sent'
  },
  educations: {
    education: {
      schoolName: 'schoolName'
    }
  },
  skills: {
    userSkill: [
      {
        skill: {
          _id: '5fcf1c5b11c16c41f7c6c723',
          skill: 'Python',
          createdAt: '2020-12-08T06:25:31.128Z',
          updatedAt: '2020-12-08T06:25:31.128Z'
        },
        level: 'intermediate',
        verificationStatus: 'verified',
        _id: '5fcf52105cd56b9843252696',
        createdAt: '2020-12-08T10:14:40.231Z',
        updatedAt: '2020-12-08T13:05:46.873Z'
      }
    ]
  }
};
