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
      skillsUsed: []
    },
    errors: null,
    loading: false
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
        supervisor: {
          detail: {
            name: 'user',
            email: 'email@gmail.com',
            phoneNumber: '0786601003'
          },
          name: 'HR'
        },
        skillsUsed: [],
        responsibilities: [],
        accomplishments: [],
        verificationStatus: 'unverified',
        isCurrentPosition: true,
        _id: '5fcf65a2c4c797a20acc1c99',
        title: 'Product Manager',
        startDate: '2020-10-15T00:00:00.000Z',
        endDate: null,
        companyName: 'heza',
        favoriteProject: 'tembea',
        userId: '5fcdf47ea1d1dd1564a21613',
        createdAt: '2020-12-08T11:38:10.729Z',
        updatedAt: '2020-12-08T11:38:10.729Z'
      }
    ]
  }
};
