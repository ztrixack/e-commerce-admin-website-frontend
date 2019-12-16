import Resource from 'utils/resource';

export default new Resource('/users', {
  login: {
    url: 'login',
    method: 'post',
  },
  signup: {
    url: 'signup',
    method: 'post',
  },
});
