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
    employments: [
      {
        companyName: 'snow',
        supervisor: 'supervisor',
        title: 'title',
        startDate: '2020-10-5',
        responsibilities: ['res'],
        accomplishments: ['res'],
        favoriteProject: 'res',
        _id: 'id'
      }
    ]
  },
  messages: {
    message: 'sent'
  },
  educations: {
    education: {
      schoolName: 'schoolName',
      level: 'level',
      _id: '_id',
      accomplishments: ['res'],
      degreeOrCertification: 'degree',
      specializations: ['res'],
      startDate: '2020-10-10'
    },
    educations: [
      {
        schoolName: 'schoolName',
        level: 'level',
        _id: '_id',
        accomplishments: ['res'],
        degreeOrCertification: 'degree',
        specializations: ['res'],
        startDate: '2020-10-10'
      }
    ],
    loading: false,
    errors: {
      errors: null
    }
  }
};
