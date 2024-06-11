import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/Dashboard/index';
import Loadable from 'components/Loadable';

// render - data display components
const Typography = Loadable(lazy(() => import('pages/utilities/typography')));

// render - utils components page
const Color = Loadable(lazy(() => import('pages/utilities/color')));
const Shadow = Loadable(lazy(() => import('pages/utilities/shadows')));

// ==============================|| COMPONENTS ROUTES ||============================== //

const ComponentsRoutes = {
  path: 'utilities',
  element: <MainLayout />,
  children: [
    {
      path: 'card',
      element: <Typography />
    },
    {
      path: 'transaction',
      element: <Color />
    },
    {
      path: 'shadows',
      element: <Shadow />
    }
  ]
};

export default ComponentsRoutes;
