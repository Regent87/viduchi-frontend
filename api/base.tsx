export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });

    // Если токен истек или недействителен
    if (response.status === 401) {
      localStorage.removeItem('jwt_token');
      throw new Error('Сессия истекла');
    }

    return response;
  };
