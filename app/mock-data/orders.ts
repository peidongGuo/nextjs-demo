import { Order, OrderStatus } from '../lib/models';
import { paper1 } from './papers';
import { user1 } from './users';

export const order1: Order = {
  id: '210544b2-4001-4271-9855-fec4b6a6442a',
  userinfo: user1,
  paper: paper1,
  status: OrderStatus.succeed,
  create_time: '2022-12-06 14:00:02',
  pay_time: '2022-12-06 14:02:00',
  price: 100,
};
