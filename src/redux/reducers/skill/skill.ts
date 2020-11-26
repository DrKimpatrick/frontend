import {
  SkillTypes,
  SkillActionTypes,
  UserSkill
} from 'redux/action-types/skill';

interface InitialState {
  loading?: boolean;
  userSkill?: UserSkill[];
  errors?: any;
}

const initialState: InitialState = {};

export const skillReducer = (
  state = initialState,
  action: SkillActionTypes
) => {
  switch (action.type) {
    case SkillTypes.ListUserSkill:
      return { ...state, userSkill: action.payload.data, loading: false };

    case SkillTypes.Loading:
      return { ...state, loading: action.payload.loading };

    case SkillTypes.Errors:
      return { ...state, errors: action.payload.errors, loading: false };

    default:
      return state;
  }
};
