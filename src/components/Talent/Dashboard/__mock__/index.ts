import { VerificationStatus, SkillLevel } from 'redux/action-types/skill';
import { TalentProcess } from 'redux/action-types/user';

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
      verified: true,
      profileProcess: TalentProcess.Completed,
      stripeSubscriptionId: 'stripe'
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
  },
  skills: {
    userSkill: [
      {
        skill: {
          skill: 'php',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        _id: 'id',
        level: SkillLevel.Beginner,
        verificationStatus: VerificationStatus.Unverified,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      },
      {
        skill: {
          skill: 'typescript',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        _id: 'id',
        level: SkillLevel.Advanced,
        verificationStatus: VerificationStatus.Unverified,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      },
      {
        skill: {
          skill: 'typescript',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        _id: 'id',
        level: SkillLevel.Intermediate,
        verificationStatus: VerificationStatus.Unverified,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      }
    ],
    loading: false
  }
};
