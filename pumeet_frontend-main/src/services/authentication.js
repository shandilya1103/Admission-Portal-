import axios from 'axios';

export async function AuthRegistration(params) {

  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:8000/auth/registration/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
    return response;
  } catch (error) {
    const errorData = error?.response?.data;
    return ({ error: errorData[Object.keys(errorData)?.[0]]?.[0]});
  }
  
}

export async function AuthLogin(params) {
  try {
    const response = await axios({
      url: 'http://localhost:8000/auth/login/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
    return response;
  } catch(error) {
    const errorData = error?.response?.data;
    return ({ error: errorData[Object.keys(errorData)?.[0]]?.[0]});
  }
}

export async function AuthLogout() {
  console.log('Req AuthLogout...');
  localStorage.removeItem('AUTH_TOKEN');
  window.location.replace('/signin');
  return true;
}
