import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import { getUser } from '../../redux/modules/user';

const useProtectedRoute = () => {
  const router = useHistory();
  const dispatch = useDispatch();
  const [loadingUser, setLoading] = useState(false);
  const { userId } = useSelector(userSelector);


  useEffect(() => {
    const hasToken = !!localStorage.getItem('JWT_TOKEN');
    if (!userId && hasToken) {
      dispatch(getUser())
        .then(() => setLoading(false))
        .catch(() => {
          setLoading(false);
          router.push('/login')
        });
    }

    if (!hasToken) {
      return router.push('/login');
    }

  }, [userId]);

  return { loadingUser, userId };
};

export default useProtectedRoute;
