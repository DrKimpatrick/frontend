export const frontData = {
  title: 'Test this title',
  description:
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.'
};

export const steps = [
  {
    step: 1,
    stepDetails:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    step: 2,
    stepDetails:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    step: 3,
    stepDetails:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    step: 4,
    stepDetails:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    step: 5,
    stepDetails:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    step: 6,
    stepDetails:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  }
];

export const accounts = [
  {
    id: 'talent', // Id matches with a role in database
    title: 'Talent',
    description:
      'Stay up to date on the latest changes and training in your skillset.\nGet hired faster with pre certified employment and education records and verified technical skills.'
  },
  {
    id: 'education',
    title: 'Education',
    description:
      'Ensure your students are receiving real time technical skills training.\nCreate a direct pipeline with companies looking to hire.'
  },
  {
    id: 'training_admin',
    title: 'Training',
    description:
      'Submit your training application to be a premiere training partner.'
  },
  {
    id: 'recruitment_admin',
    title: 'HR Recruitment',
    description:
      'Save time and money on candidate recruitment with access to pre verified and certified candidates.'
  }
];

export const subscriptions = [
  {
    title: 'Basic',
    price: null,
    values: [
      {
        status: false,
        name: 'Unverified Resume Listing'
      },
      {
        status: true,
        name: 'Employment Verification'
      }
    ]
  },
  {
    title: 'Standard',
    priceMonthly: 9.99,
    priceAnnually: 107.0,
    values: [
      {
        status: false,
        name: 'Unverified Resume Listing'
      },
      {
        status: true,
        name: 'Employment Verification'
      },
      {
        status: true,
        name: 'Employment Verification'
      },
      {
        status: true,
        name: 'orem ipsum dolor'
      }
    ]
  },
  {
    title: 'Premium',
    price: 19.99,
    priceAnnually: 203.0,
    values: [
      {
        status: false,
        name: 'Unverified Resume Listing'
      },
      {
        status: true,
        name: 'Employment Verification'
      },
      {
        status: true,
        name: 'Employment Verification'
      },
      {
        status: false,
        name: 'Lorem ipsum dolor'
      }
    ]
  }
];

export const testmonials = [
  {
    title:
      'I have learnt alot about industrial standards while on this platform',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there is not anything embarrassing hidden in the middle of text.',
    userInfo: {
      userImage:
        'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png',
      name: 'joe Doe',
      position: 'Co-Founder at Snow Media'
    }
  },
  {
    title: 'The best Platform I have ever seen',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there is not anything embarrassing hidden in the middle of text.',
    userInfo: {
      userImage:
        'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png',
      name: 'Joe Doe',
      position: 'CTO at Snow Media'
    }
  }
];

export const pageTexts = {
  account: {
    title: 'What type of account do you want?',
    subTitle:
      'Once you select an account, you can not change it, you will need to contact admin to change your account type incase you need to it.'
  }
};

export const education = [
  {
    id: 1,
    name: 'University of California',
    status: 'verified'
  },
  {
    id: 3,
    name: 'Harvard University',
    status: 'unverified'
  },
  {
    id: 2,
    name: 'Google African Certificate',
    status: 'processing'
  }
];

export const employment = [
  {
    id: 1,
    name: 'OSC',
    status: 'verified'
  },
  {
    id: 3,
    name: 'Snow Media Tech',
    status: 'unverified'
  },
  {
    id: 2,
    name: 'Irembo',
    status: 'processing'
  }
];

export const expertSkills = [
  {
    id: 1,
    name: 'HTML',
    status: 'verified'
  },
  {
    id: 3,
    name: 'CSS',
    status: 'unverified'
  },
  {
    id: 2,
    name: 'Javascript',
    status: 'processing'
  }
];

export const intermediateSkills = [
  {
    id: 1,
    name: 'Python',
    status: 'verified'
  },
  {
    id: 3,
    name: 'Java',
    status: 'unverified'
  },
  {
    id: 2,
    name: 'Algorithms and Data structure',
    status: 'processing'
  }
];

export const beginnerSkills = [
  {
    id: 1,
    name: 'SQL',
    status: 'verified'
  },
  {
    id: 3,
    name: 'Redux',
    status: 'unverified'
  },
  {
    id: 2,
    name: 'React',
    status: 'processing'
  }
];
