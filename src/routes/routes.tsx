import { RouteObject } from 'react-router-dom';
import App from '../App.tsx';
import Home from '../routes/home.tsx';
import { TickerDemo } from './ticker.tsx';
import BasicCanvas from './basic-canvas.tsx';
import CanvasWithBasicCollision from './canvas-with-collision.tsx';
import GameWithProjectilesPage from './game-with-projectiles.tsx';

type DefinedRouteObject<T extends string> = RouteObject & {
  path: T
}

export const homeRoot = '/';

export const demoRoutes: {
  [key: string]: DefinedRouteObject<typeof key>
} = {
  'Ticker Timer': {
    path: 'ticker-demo',
    element: <TickerDemo/>
  },
  'Basic Canvas': {
    path: 'basic-canvas',
    element: <BasicCanvas/>
  },
  'Canvas with Basic Collision': {
    path: 'canvas-with-basic-collision',
    element: <CanvasWithBasicCollision />
  },
  'Game with projectiles': {
    path: 'game-with-projectiles',
    element: <GameWithProjectilesPage />
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
