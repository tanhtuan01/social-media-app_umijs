export const apiUser = () => {

    const create = async (user: object) => {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
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

    return { create, text }


}