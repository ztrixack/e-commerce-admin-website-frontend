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
});
