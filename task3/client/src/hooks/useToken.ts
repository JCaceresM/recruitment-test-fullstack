import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TOKEN, USER_INFO } from '../features/auth/authSlice';

const useIsTokenValid = () => {
    const authToken = useSelector((state: RootState) => state.auth.token);
    let isTokenValid: boolean = false;

    if (authToken !== '') {
        isTokenValid = authToken
            ? JSON.parse(atob(authToken.split('.')[1])).exp > Date.now() / 1000
            : false;
    }

    return { isTokenValid };
};
const useHasAuthorization = () => {
    const { isTokenValid } = useIsTokenValid();
    const { token } = useSelector((state: RootState) => state.auth);

    if (!isTokenValid && token) {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USER_INFO);
    }

    return { isTokenValid };
};

export {
    useHasAuthorization,
    useIsTokenValid
}
