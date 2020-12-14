import {
  SkillTypes,
  SkillActionTypes,
  UserSkill,
  Skill
} from 'redux/action-types/skill';

interface InitialState {
  loading?: boolean;
  userSkill?: UserSkill[];
  errors?: any;
  skills?: Skill[];
  singleSkill?: Skill;
  action?: boolean;
  userSkillAction?: boolean;
  loadingBtn?: boolean;
}

const initialState: InitialState = {};

export const skillReducer = (
  state = initialState,
  action: SkillActionTypes
) => {
  switch (action.type) {
    case SkillTypes.ListUserSkill:
      return {
        ...state,
        userSkill: action.payload.data,
        loading: false,
        userSkillAction: false
      };

    case SkillTypes.Loading:
      return { ...state, loading: action.payload.loading };

    case SkillTypes.Errors:
      return { ...state, errors: action.payload.errors, loading: false };

    case SkillTypes.AddSkill:
      return {
        ...state,
        skills: state.skills
          ? state.skills.concat(action.payload.data)
          : action.payload.data,
        action: false
      };

    case SkillTypes.DeleteSkill:
      return {
        ...state,
        skills: state.skills
          ? state.skills.filter(item => item._id !== action.payload.data)
          : state.skills,
        action: false
      };

    case SkillTypes.UpdateSkill:
      if (state.skills) {
        const allSkills = state.skills;

        const skillIndex = allSkills.findIndex(
          item => item._id === action.payload.data._id
        );

        allSkills[skillIndex] = action.payload.data;

        return { ...state, skills: allSkills };
      }
      return state;

    case SkillTypes.ListSingleSkill:
      return { ...state, singleSkill: action.payload.data, loading: false };

    case SkillTypes.ListSkill:
      return {
        ...state,
        skills: action.payload.data,
        loading: false
      };

    case SkillTypes.SetActionModal:
      return { ...state, action: action.payload.data };

    case SkillTypes.AddUserSkill:
      return { ...state, userSkillAction: action.payload.data };

    case SkillTypes.LoadingBtn:
      return { ...state, loadingBtn: action.payload.loading };

    default:
      return state;
  }
};
