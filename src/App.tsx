import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Suspense, createElement } from 'react';
import { DarkModeProvider } from './context/DarkModeContext';
import ModalProvider from './context/ModalContext.tsx';
import ConfirmCode from './pages/ConfirmCode.tsx';
import ConfirmEmail from './pages/ConfirmEmail.tsx';
import ConfirmPassword from './pages/ConfirmPassword.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import { getMenuData } from './services/menu/index.ts';
import AppLayout from './ui/AppLayout.tsx';
import AuthLayout from './ui/AuthLayout.tsx';
import ProtectedRoute from './ui/ProtectedRoute.tsx';
import Spinner from './ui/Spinner.tsx';

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
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Navigate replace to="leads" />} />
                  {getMenuData.map((menu) => {
                    return (
                      <Route
                        key={menu.key}
                        path={menu.path}
                        element={
                          <ProtectedRoute roles={menu.roles}>
                            {createElement(menu.component)}
                          </ProtectedRoute>
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
            </Suspense>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: '16px',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: 'var(--color-grey-0)',
                color: 'var(--color-grey-700)',
              },
            }}
          />
        </QueryClientProvider>
      </ModalProvider>
    </DarkModeProvider>
  );
}

export default App;
