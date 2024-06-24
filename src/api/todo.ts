export const apiTodo = () => {
    const token = localStorage.getItem('token');
    const create = async (todo: object) => {
        console.log('todo create', todo);
        try {
            const response = await fetch(`http://localhost:3000/todo/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(todo),
            });
            if (response.ok) {
                const data = await response.text();
                return data;
            } else if (response.status === 500) {
                return {
                    error: 'All field is not null or empty'
                };
            } else {
                const error = await response.json();
                return { error: 'Lỗi tạo 2' };
            }
        } catch (error) {
            return { error: 'Lỗi tạo 3' + error };
        }
    };

    const list = async () => {
        try {
            const response = await fetch(`http://localhost:3000/todo/list-by-user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const error = await response.json();
                return { error: 'Error' };
            }
        } catch (error) {
            return { error: 'Eror' };
        }
    }
    return { create, list };
}