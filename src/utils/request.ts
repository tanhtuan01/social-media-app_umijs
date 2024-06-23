const request = async (url: string, options = {}) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    return await response.json();
};

export default request;