// type
import { Home3, Colorfilter, Card, User } from 'iconsax-react';

// icons
const icons = {
  navigation: Home3,
  card: Card,
  transaction: Colorfilter,
  shadow: User
};

// ==============================|| MENU ITEMS - COMPONENTS ||============================== //

const components = {
  id: 'utilities',
  title: 'Utilities',
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'typography',
      title: 'Card',
      type: 'item',
      url: '/utilities/card',
      icon: icons.card,
      breadcrumbs: true
    },
    {
      id: 'color',
      title: 'Transactions',
      type: 'item',
      url: '/utilities/transaction',
      icon: icons.transaction,
      breadcrumbs: true
    }
    // {
    //   id: 'shadows',
    //   title: 'Account',
    //   type: 'item',
    //   url: '/utilities/shadows',
    //   icon: icons.shadow,
    //   breadcrumbs: true
    // }
  ]
};

export default components;
