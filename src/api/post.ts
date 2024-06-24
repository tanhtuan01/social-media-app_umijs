export const apiPost = () => {

    const create = async (post: object) => {
        try {
            const response = await fetch('http://localhost:3000/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })

            if (!response.ok) {
                return { error: 'Lỗi tạo mới bài viết' }
            }
            else if (response.ok) {
                const data = await response.json()
                return data
            }
            else if (response.status === 500) {
                const error = await response.json();
                return { error: 'Lỗi tạo bài viết: ' + error.message };
            } else {
                const error = await response.json();
                return { error: 'Lỗi tạo bài viết: ' + error.message };
            }
        } catch (error) {
            return { error }
        }
    }


    const userPost = async (userId: string, post: object) => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })
            if (response.status === 500) {
                return { error: 'Lỗi lấy danh sách bài viết' }
            } else if (!response.ok) {
                return { error: 'Lỗi lấy danh sách bài viết' }
            } else {
                return await response.json()
            }
        }
        catch (error) {
            return { error }
        }
    }

    return { create, userPost }


}