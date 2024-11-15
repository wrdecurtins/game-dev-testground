import { RouteObject } from 'react-router-dom';
import App from '../App.tsx';
import Home from '../routes/home.tsx';
import { TickerDemo } from './ticker.tsx';
import BasicCanvas from './basic-canvas.tsx';

type DefinedRouteObject<T extends string> = RouteObject & {
  path: T
}

export const homeRoot = '/';

export const demoRoutes: {
  [key: string]: DefinedRouteObject<typeof key>
} = {
  'Navigation Test': {
    path: 'navtest',
    element: <div>Test Navigation Feature</div>
  },
  'Second Nav': {
    path: 'nav2',
    element: <div style={{
      height: '100px',
      width: '100px',
      backgroundColor: 'blue'
    }}/>
  },
  'Ticker Timer': {
    path: 'ticker-demo',
    element: <TickerDemo/>
  },
  'Basic Canvas': {
    path: 'basic-canvas',
    element: <BasicCanvas/>
  }
};

export const routes: RouteObject[] = [
  {
    element: <App/>,
    path: homeRoot,
    children: [
      {
        index: true,
        element: <Home/>
      },
      ...Object.values(demoRoutes),
    ]
  }
];
