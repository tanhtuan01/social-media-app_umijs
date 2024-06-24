
import { history } from 'umi';

export default function checkTokenFirst() {


    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
        // Nếu không có token, chuyển hướng đến trang đăng nhập
        history.push('/login');
    } else {
        // Kiểm tra token hợp lệ
        const payload = decodeToken(storedToken);
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > payload.exp) {
            // Nếu token đã hết hạn, chuyển hướng đến trang đăng nhập
            history.push('/login');
        }
    }



    function decodeToken(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }


}