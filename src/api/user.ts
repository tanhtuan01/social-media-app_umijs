export const apiUser = () => {

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

    const text = () => {
        return [
            {
                txt: 'API User TEXT',
                txt2: 'API User TEXT2'
            },
            {
                txt: 'API User TEXT3',
                txt2: 'API User TEXT4'
            },
        ]
    }

    return { create, text, getUser };


}