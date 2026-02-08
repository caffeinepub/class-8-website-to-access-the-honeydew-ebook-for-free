import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import LandingPage from './pages/LandingPage';
import ReaderPage from './pages/ReaderPage';
import SiteLayout from './components/layout/SiteLayout';

const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const readerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/read/$bookTitle',
  component: ReaderPage,
});

const routeTree = rootRoute.addChildren([indexRoute, readerRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;

