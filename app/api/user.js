import Resource from 'utils/resource';

export default new Resource('/users', {
  signin: {
    url: 'signin',
    method: 'post',
  },
  signup: {
    url: 'signup',
    method: 'post',
  },
  changePassword: {
    url: 'change-password',
    method: 'post',
  },
  exist: {
    url: 'exist',
    method: 'get',
  },
});
