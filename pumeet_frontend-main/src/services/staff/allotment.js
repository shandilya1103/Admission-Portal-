import axios from 'axios';

export async function getSeatAllotment() {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    const response = await axios({
      method: 'GET',
      url: `http://localhost:8000/api/staff/allotment/list`,
      headers: {
        Authorization: 'Token ' + AUTH_TOKEN,
      },
    });
    return response;
  } catch (error) {
    const errorData = error?.response?.data;
    return { error: errorData[Object.keys(errorData)?.[0]]?.[0] };
  }
}

export async function generateAllotments() {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    const response = await axios({
      method: 'POST',
      url: `http://localhost:8000/api/staff/allot-branches`,
      headers: {
        Authorization: 'Token ' + AUTH_TOKEN,
      },
    });
    return response;
  } catch (error) {
    const errorData = error?.response?.data;
    return { error: errorData[Object.keys(errorData)?.[0]]?.[0] };
  }
}
