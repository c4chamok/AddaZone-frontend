import { setLoading, setUser, setError, setAuthStatus, logout } from '@/lib/slices/authSlice'
import { useAppDispatch } from '@/lib/hooks';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import useAxiosInstance from './axiosHooks';


const useAuth = () => {

    const dispatch = useAppDispatch();
    const { axiosSecure } = useAxiosInstance()
    // const { isAuthenticated } = useAppSelector(state=>state.auth);

    const userLogin = async (email: string, password: string) => {
        dispatch(setLoading(true));


        try {
            const { data } = await axiosSecure.post('/auth/signin', { email, password });
            console.log(data);
            if (data?.success) {
                console.log(data);
                
                toast.success('successfully Signed In')
                await fetchUser();
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                // dispatch(setError(err));
                throw err;

            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    const fetchUser = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const { data } = await axiosSecure.get('/users/me');
            console.log('calling');
            if (data?.success) {
                console.log(data);
                dispatch(setUser(data))
                dispatch(setAuthStatus({ isAuthenticated: true }));
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                dispatch(setAuthStatus({ isAuthenticated: false }));
                dispatch(setError({ message: err.message, code: err.code, status: err.status }));
            }
        } finally {
            dispatch(setLoading(false));
        }
    }

    const userLogout = async () => {
        const { data } = await axiosSecure.get('auth/signout');
        console.log(data);
        if (data?.success) {
            dispatch(logout());
            toast.success('Luccessfully Logout')

        } else {
            console.log('something went wrong');
            toast.error('something went wrong')
        }
    }


    return {
        userLogin,
        fetchUser,
        userLogout,
    };
};

export default useAuth;