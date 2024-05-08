import { ComponentType, LazyExoticComponent, lazy } from 'react';

import Leads from '../../pages/Leads';

import firstImg from '../../../public/img/sidebar/01.svg';
import firstImgActive from '../../../public/img/sidebar/01_active.svg';
import secondImg from '../../../public/img/sidebar/02.svg';
import secondImgActive from '../../../public/img/sidebar/02_active.svg';
import thirdImg from '../../../public/img/sidebar/03.svg';
import thirdImgActive from '../../../public/img/sidebar/03_active.svg';
import fifthImg from '../../../public/img/sidebar/05.svg';
import fifthImgActive from '../../../public/img/sidebar/05_active.svg';
import sixthImg from '../../../public/img/sidebar/06.svg';
import sixthImgActive from '../../../public/img/sidebar/06_active.svg';
import ninthImg from '../../../public/img/sidebar/09.svg';
import ninthImgActive from '../../../public/img/sidebar/09_active.svg';

import { MenuNestedData, elements } from './nestedElements';

const lazyLoad = (
  importFunc: () => Promise<{ default: ComponentType<unknown> }>,
) => {
  return lazy(importFunc);
};

export type SortByStatusType = {
  id: number;
  value: string;
  title: string;
};

export type MenuData = {
  title: string;
  path: string;
  key: string;
  icon: string;
  iconActive: string;
  component:
    | ComponentType<unknown>
    | LazyExoticComponent<ComponentType<unknown>>;
  roles: string[];
  status?: SortByStatusType[];
  elements?: MenuNestedData[];
};

export const getMenuData: MenuData[] = [
  {
    title: 'Leads',
    key: '__leads',
    path: '/leads',
    icon: firstImg,
    iconActive: firstImgActive,
    component: Leads,
    roles: ['admin', 'user'],
    status: [
      //!? /leads?filter_by=query -> www.meta.uz/leads?filter_by=quotes
      { id: 1, value: 'leads', title: 'Leads' },
      { id: 2, value: 'archived', title: 'Archived' },
    ],
  },
  {
    title: 'Quotes',
    key: '__quotes',
    path: '/quotes',
    icon: secondImg,
    iconActive: secondImgActive,
    component: lazyLoad(() => import('../../pages/Quotes')),
    roles: ['admin', 'user'],
    status: [
      { id: 3, value: 'quotes', title: 'Quotes' },
      { id: 4, value: 'follow_up', title: 'Follow up' },
      { id: 5, value: 'warm', title: 'Warm' },
      { id: 6, value: 'ongoing', title: 'Ongoing' },
      { id: 7, value: 'upcoming', title: 'Upcoming' },
      { id: 8, value: 'on_hold', title: 'On hold' },
      { id: 9, value: 'not_now', title: 'Not now' },
      { id: 10, value: 'archived', title: 'Archived' },
    ],
  },
  {
    title: 'Orders',
    key: '__orders',
    path: '/orders',
    icon: thirdImg,
    iconActive: thirdImgActive,
    component: lazyLoad(() => import('../../pages/Orders')),
    roles: ['admin', 'user'],
    status: [
      { id: 11, value: 'orders', title: 'Orders' },
      { id: 12, value: 'booked', title: 'Booked' },
      { id: 13, value: 'posted', title: 'Posted' },
      { id: 14, value: 'not_signed', title: 'Not-Signed' },
      { id: 15, value: 'dispatched', title: 'Dispatched' },
      { id: 16, value: 'issue', title: 'Issue' },
      { id: 17, value: 'picked_up', title: ' Picked up' },
      { id: 18, value: 'completed', title: 'Completed' },
      { id: 19, value: 'on_hold', title: 'On hold' },
      { id: 20, value: 'archived', title: 'Archived' },
    ],
  },
  {
    title: 'Task',
    key: '__task',
    path: '/task',
    icon: fifthImg,
    iconActive: fifthImgActive,
    component: lazyLoad(() => import('../../pages/Task')),
    roles: ['admin', 'user'],
    status: [
      { id: 21, value: 'task_list', title: 'Task list' },
      { id: 22, value: 'support', title: 'Support' },
      { id: 23, value: 'completed', title: 'Completed' },
      { id: 24, value: 'archived', title: 'Archived' },
    ],
  },
  {
    title: 'Contact',
    key: '__contact',
    path: '/contact',
    icon: sixthImg,
    iconActive: sixthImgActive,
    component: lazyLoad(() => import('../../pages/Contact')),
    roles: ['admin', 'user'],
    status: [
      { id: 25, value: 'all_customers', title: 'All customers' },
      { id: 26, value: 'active', title: 'Active' },
      { id: 27, value: 'inactive', title: 'Inactive' },
    ],
  },
  {
    title: 'Settings',
    key: '__settings',
    path: '/settings',
    icon: ninthImg,
    iconActive: ninthImgActive,
    component: lazyLoad(() => import('../../pages/Settings')),
    roles: ['admin', 'user'],
    elements,
  },
];
