import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Skeleton } from 'antd';
import { Suspense, createElement } from 'react';
import { DarkModeProvider } from './context/DarkModeContext';
import DrawerFeatureProvider from './context/DrawerFeatureContext.tsx';
import ModalProvider from './context/ModalContext.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import ConfirmCode from './pages/authentication/ConfirmCode.tsx';
import ConfirmEmail from './pages/authentication/ConfirmEmail.tsx';
import ConfirmPassword from './pages/authentication/ConfirmPassword.tsx';
import Login from './pages/authentication/Login.tsx';
import { getMenuData } from './services/menu/index.ts';
import AppLayout from './ui/AppLayout.tsx';
import AuthLayout from './ui/AuthLayout.tsx';
import ProtectedRoute from './ui/ProtectedRoute.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <ModalProvider>
        <DrawerFeatureProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Navigate replace to="leads" />} />
                  {getMenuData.map((menu) => {
                    return (
                      <Route
                        key={menu.key}
                        path={menu.path}
                        element={
                          <Suspense fallback={<Skeleton active />}>
                            <ProtectedRoute roles={menu.roles}>
                              {createElement(menu.component)}
                            </ProtectedRoute>
                          </Suspense>
                        }
                      >
                        {menu.elements &&
                          menu.elements.map((item) => (
                            <Route
                              key={item.path}
                              path={item.path}
                              element={createElement(item.el)}
                            />
                          ))}
                      </Route>
                    );
                  })}
                </Route>

                <Route path="/auth" element={<AuthLayout />}>
                  <Route
                    index
                    element={<Navigate replace to="/auth/login" />}
                  />
                  <Route path="/auth/login" element={<Login />} />
                  <Route
                    path="/auth/confirm/email"
                    element={<ConfirmEmail />}
                  />
                  <Route path="/auth/confirm/code" element={<ConfirmCode />} />
                  <Route
                    path="/auth/confirm/password"
                    element={<ConfirmPassword />}
                  />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </DrawerFeatureProvider>
      </ModalProvider>
    </DarkModeProvider>
  );
}

export default App;
