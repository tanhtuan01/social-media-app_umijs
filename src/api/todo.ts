export const apiTodo = () => {
    const apiTodoList = async () => {
        try {
            const response = await fetch('http://localhost:3000/project/list'); // Replace with your actual API endpoint
            if (response.ok) {
                const data = await response.text();
                return data;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            throw error;
        }
    };

    return { apiTodoList };
}