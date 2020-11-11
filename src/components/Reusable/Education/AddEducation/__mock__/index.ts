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
  messages: {
    message: 'sent'
  },
  educations: {
    loading: false,
    errors: {
      errors: null
    },
    education: {
      _id: 'id',
      schoolName: 'school name',
      level: 'level',
      degreeOrCertification: 'education',
      specializations: ['specialization'],
      startDate: '2020-10-10',
      endDate: '2020-10-5',
      accomplishments: ['snow'],
      isCurrentEducation: false,
      verificationStatus: 'verified'
    }
  }
};
