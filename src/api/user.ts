export const apiUser = () => {

    const token = localStorage.getItem('token');

    const create = async (user: object) => {
        console.log('create user', user);
        try {
            const response = await fetch('http://localhost:3000/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                return await response.json();
            } else if (response.status === 500) {
                const error = await response.json();
                return { error: 'Đã có lỗi xảy ra khi tạo người dùng: ' + error.message };
            } else {
                const error = await response.json();
                return { error: 'Đã có lỗi xảy ra khi tạo người dùng: ' + error.message };
            }
        } catch (error) {
            return { error: 'Đã có lỗi xảy ra khi tạo người dùng: ' + error };

        }
    };

    const getUser = async (emailOrPhone: string, password: string) => {
        try {
            const response = await fetch(`http://localhost:3000/user/get/${emailOrPhone}/${password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            if (!response.ok) {
                const error = await response.json();
                return { error: 'Lỗi đăng nhập' + error.message };
            }
            if (response.status === 500) {
                const error = await response.json();
                return { error: 'Lỗi đăng nhập' + error.message };
            };
            if (response.ok) {
                return await response.json();
            }
        }

        catch (error) {
            return { error: 'Lỗi đăng nhập' + error }
        }
    }

    const getUserInfo = async () => {

        try {
            const response = await fetch('http://localhost:3000/user/info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            if (response.ok) {
                return await response.json();
            } else if (response.status === 500) {
                const error = await response.json();
                return { error: 'Error when get user info' + error }
            } else {
                const error = await response.json();
                return { error: 'Error when get user info' + error }
            }
        } catch (error) {
            return { error }
        }

    }

    const updateUser = async (user: object) => {

        try {
            const response = await fetch('http://localhost:3000/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            })
            console.log(response)
            if (response.ok) {
                return await response.json();
            } else if (!response.ok) {
                return { error: 'Error when update user info' }
            } else if (response.status == 500) {
                return { error: 'Error when update user info' }
            } else {
                return { error: 'Error when update user info' }
            }
        } catch (error) {
            return { error }
        }

    }

    const checkPassword = async (password: string) => {
        try {
            const response = await fetch(`http://localhost:3000/user/checkpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ password }),
            })
            if (response.ok) {
                return await response.json();
            } else if (response.status === 500) {
                const error = await response.json();
                return { error: 'Error when check password ' + error }
            } else {
                const error = await response.json();
                return { error: 'Error when check password ' + error }
            }
        } catch (error) {
            return { error }
        }
    }

    const updatePassword = async (password: string) => {
        console.log(JSON.stringify({ password }))
        try {
            const response = await fetch(`http://localhost:3000/user/updatepassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ password }),
            })
            if (response.ok) {
                return await response.json();
            } else if (response.status === 500) {
                return { error: 'Error when update password' }
            } else {
                return { error: 'Error when update password' }
            }
        } catch (error) {
            return { error }
        }
    }

    return { create, getUser, getUserInfo, updateUser, checkPassword, updatePassword };


}