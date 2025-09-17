import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import type { RootState, AppDispatch } from '../../app/store';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/'); 
  };

  return (
    <header className='flex justify-between items-center p-4 bg-white shadow-md'>
      <div className='logo'>
        <Link to='/dashboard' className='text-xl font-bold text-blue-600 text-left'>CRM Pro</Link>
      </div>
      <nav>
        <ul className='flex items-center space-x-4'>
          {user ? (
            <li>
              <button 
                onClick={onLogout} 
                className='px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition'
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
            <Link to='/'/>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;