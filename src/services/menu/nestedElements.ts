import { ComponentType } from 'react';
import AccessRoles from '../../pages/settings/AccessRoles';
import CompanyName from '../../pages/settings/CompanyName';
import Distribution from '../../pages/settings/Distribution';
import Ground from '../../pages/settings/Ground';
import HawaiiAndAlaska from '../../pages/settings/Regions';
import International from '../../pages/settings/International';
import LeadParsing from '../../pages/settings/LeadParsing';
import Merchant from '../../pages/settings/Merchant';
import PaymentApps from '../../pages/settings/PaymentApps';
import Providers from '../../pages/settings/Providers';
import Teams from '../../pages/settings/Teams';
import Templates from '../../pages/settings/Templates';
import Users from '../../pages/settings/Users';
import VoIP from '../../pages/settings/VoIP';

export type MenuNestedData = {
  title: string;
  path: string;
  category: string;
  el: ComponentType<unknown>;
};

export const elements: MenuNestedData[] = [
  {
    title: 'Users',
    path: '/settings/users',
    category: 'User Management',
    el: Users,
  },
  {
    title: 'Teams',
    path: '/settings/teams',
    category: 'User Management',
    el: Teams,
  },
  {
    title: 'Roles',
    path: '/settings/roles',
    category: 'User Management',
    el: AccessRoles,
  },
  {
    title: 'Providers',
    path: '/settings/providers',
    category: 'Lead Management',
    el: Providers,
  },
  {
    title: 'Distribution',
    path: '/settings/distribution',
    category: 'Lead Management',
    el: Distribution,
  },
  {
    title: 'Lead Parsing',
    path: '/settings/lead-parsing',
    category: 'Lead Management',
    el: LeadParsing,
  },
  {
    title: 'Ground',
    path: '/settings/ground',
    category: 'Contract',
    el: Ground,
  },
  {
    title: 'Hawaii and Alaska',
    path: '/settings/regions',
    category: 'Contract',
    el: HawaiiAndAlaska,
  },
  {
    title: 'International',
    path: '/settings/international',
    category: 'Contract',
    el: International,
  },
  {
    title: 'Company Name',
    path: '/settings/name',
    category: 'Company Management',
    el: CompanyName,
  },
  {
    title: 'Merchant',
    path: '/settings/merchant',
    category: 'Company Management',
    el: Merchant,
  },
  {
    title: 'Payment',
    path: '/settings/payment',
    category: 'Company Management',
    el: PaymentApps,
  },
  {
    title: 'Voip',
    path: '/settings/voip',
    category: 'Company Management',
    el: VoIP,
  },
  {
    title: 'Templates',
    path: '/settings/templates',
    category: 'Company Management',
    el: Templates,
  },
];
