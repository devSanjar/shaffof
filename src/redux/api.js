import axios from 'axios'

export const loadUsersApi = async () => {
  const test = await axios.get('http://localhost:5000/users');
  return test;
}

export const createUserApi = async (user) => {
  const test = await axios.post('http://localhost:5000/users', user);
  return test;
}

export const deleteUserApi = async (userId) => {
  const test = await axios.delete(`http://localhost:5000/users/${userId}`);
  return test;
}

export const editUserApi = async (userId, userInfo) => {
  const test = await axios.put(`http://localhost:5000/users/${userId}`, userInfo);
  console.log('TEST', test)
  return test;
}