import axios from 'axios';
import { AUTHENTICATION } from 'config/constants';
import _config from 'config';
const baseURL = _config.apiUrl;

axios.defaults.baseURL = baseURL;
function buildURLFromTemplate(data, options) {
  let outputData;
  let outputURL;
  if (data instanceof FormData) {
    outputData = data;
    outputURL = options.url.replace(/\{(.+?)\}/g, (m, label) => {
      const value = outputData.get(label);
      if (value !== undefined) {
        outputData.delete(label);
      } else {
        throw new Error(`Cannot find ${label} in ${options.url}`);
      }
      return value;
    });
  } else {
    outputData = { ...options.defaultParams, ...data };
    outputURL = options.url.replace(/\{(.+?)\}/g, (m, label) => {
      const value = outputData[label];
      if (value !== undefined) {
        delete outputData[label];
      } else {
        throw new Error(`Cannot find ${label} in ${options.url}`);
      }
      return value;
    });
  }

  return {
    data: outputData,
    url: outputURL,
  };
}

export async function refreshToken(token) {
  const options = {
    method: 'get',
    url: '/oauth/token',
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.request(options);
    localStorage.setItem(AUTHENTICATION, JSON.stringify(response.data));
    return response;
  } catch (e) {
    throw e;
  }
}

export default async (data, options, extraOptions) => {
  const config = {};
  const { data: outputData, url } = buildURLFromTemplate(data, options);
  config.url = url;
  switch (options.method) {
    case 'post':
      config.method = 'post';
      config.data = outputData;
      break;
    case 'get':
      config.method = 'get';
      config.params = outputData;
      break;
    case 'put':
      config.method = 'put';
      config.data = outputData;
      break;
    case 'delete':
      config.method = 'delete';
      config.params = outputData;
      break;
    case 'patch':
      config.method = 'patch';
      config.data = outputData;
      break;
    default:
      throw new Error('Http method not support');
  }

  try {
    // set header
    config.headers = {
      ...options.headers,
    };
    if (localStorage.getItem(AUTHENTICATION)) {
      try {
        let token = JSON.parse(localStorage.getItem(AUTHENTICATION));
        // check if require refresh token
        if (Date.now() - token.created_at >= token.expires_in) {
          await refreshToken(`${token.token_type} ${token.refresh_token}`);
          token = JSON.parse(localStorage.getItem(AUTHENTICATION));
        }

        const authorization = `${token.token_type} ${token.access_token}`;
        config.headers.Authorization = authorization;
      } catch (e) {
        delete config.headers.Authorization;
      }
    }

    const result = await axios.request({ ...config, ...extraOptions });
    return result.data;
  } catch (e) {
    if (e.response && e.response.data && e.response.data.error) {
      e.response = e.response.data.error;
    }
    throw e;
  }
};
