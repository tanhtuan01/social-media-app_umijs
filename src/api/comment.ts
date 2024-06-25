export const apiComment = () => {

    const token = localStorage.getItem('token');

    const create = async (comment: object) => {
        try {
            const response = await fetch(`http://localhost:3000/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(comment),
            })
            if (response.ok) {
                return await response.json();
            }
            else if (response.status === 500) {
                return { error: 'Error' };
            } else {
                return { error: 'Error' };
            }
        } catch (error) {
            return { error };
        }
    }

    return { create }


}