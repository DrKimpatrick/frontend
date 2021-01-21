import { UserRole } from 'redux/action-types/user';
import { Routes } from './routes';

export const redirect = (value: string[]) => {
  for (let i = 0; i < value.length; i++) {
    switch (value[i]) {
      case UserRole.Talent:
        return String(Routes.UserDashboard);

      case UserRole.RecruitmentAdmin:
      case UserRole.HrAdmin:
        return String(Routes.HrAdminDashboard);

      case UserRole.SuperAdmin:
        return String(Routes.SuperAdminDashboard);

      case UserRole.EducationUser:
        return String(Routes.SchoolDashboard);

      case UserRole.TrainingAffiliate:
        return String(Routes.AffiliateDashboard);

      default:
        return undefined;
    }
  }
  return undefined;
};
