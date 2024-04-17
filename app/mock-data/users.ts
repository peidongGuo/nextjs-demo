import { User, UserRoles } from '../lib/models';

export const user1: User = {
  id: '410544b2-4001-4271-9855-fec4b6a6442a',
  name: 'User',
  email: 'user@nextmail.com',
  password: '123456',
  phone_number: '13691116398',
  role: UserRoles.admin,
};

export const user2: User = {
  id: '4d8ca51f-568a-4638-99b6-48fdb15b45ab',
  name: 'gpd',
  email: 'gpd_wfe@163.com',
  password: '123456',
  phone_number: '13691116396',
  role: UserRoles.customer,
};
