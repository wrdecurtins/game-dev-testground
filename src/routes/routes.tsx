import { RouteObject } from 'react-router-dom';
import App from '../App.tsx';
import Home from '../routes/home.tsx';

type DefinedRouteObject<T extends string> = RouteObject & {
  path: T
}

export const demoRoutes: {
  [key: string]: DefinedRouteObject<typeof key>
} = {
  'Demo': {
    path: 'demo',
    element: <div>Test Demo</div>
  }
};

export const routes: RouteObject[] = [
  {
    element: <App/>,
    path: '/',
    children: [
      {
        index: true,
        element: <Home/>
      },
      ...Object.values(demoRoutes),
    ]
  }
];
