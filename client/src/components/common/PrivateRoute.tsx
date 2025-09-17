// client/src/components/common/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store.ts';

const PrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;