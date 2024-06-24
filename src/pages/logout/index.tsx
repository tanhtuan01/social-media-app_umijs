import { history } from "umi";

export default function ProfileHomePage() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    return handleLogout()
}