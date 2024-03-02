export const apiFetch = async (endpoint: string, options?: ApiFetchOptions) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/${
        endpoint[0] === '/' ? endpoint.slice(1) : endpoint
      }`,
      {
        method: options?.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options?.token
            ? { Authorization: `Bearer ${options.token}` }
            : {}),
        },
        body: options?.data ? JSON.stringify(options.data) : null,
      }
    );
    const response = await res.json();
    console.log({ response });
    return response;
  } catch (error) {
    console.log({ error });
  }
};

export interface ApiFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: Record<string, any>;
  token?: string;
}
