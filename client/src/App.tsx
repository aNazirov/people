import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from './components/global/layout';
import { SceletonForPage } from './components/shared/Sceleton';
import { Account } from './pages/account';
import { Auth } from './pages/auth';
import { People } from './pages/people';
import { autoLogIn } from './store/global/global.thunks';
import { useAppDispatch, useAppSelector } from './store/hooks';

function App() {
  const { user, token } = useAppSelector((state) => state.global);
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (!user) {
      dispatch(autoLogIn())
        .then(() => {
          if (pathname === '/') {
            navigate('/people');
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <SceletonForPage />;

  return (
    <div className="h-full">
      {user ? (
        <Routes>
          <Route
            path="/people"
            element={<Layout link={{ to: '/account', title: 'Account' }} children={<People />} />}
          />
          <Route
            path="/account"
            element={<Layout link={{ to: '/people', title: 'People' }} children={<Account />} />}
          />
          <Route path="*" element={<Navigate to="/people" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
