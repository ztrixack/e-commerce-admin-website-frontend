const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

const defaultConfig = {
  baseUrl,
  apiUrl: `${baseUrl}/api/v1/`,
};

export default defaultConfig;
