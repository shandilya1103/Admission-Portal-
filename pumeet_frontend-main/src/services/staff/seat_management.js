import axios from 'axios';

export async function getCandidatePreferences(candidate_id) {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    const response = await axios({
      method: 'GET',
      url: `http://localhost:8000/api/staff/preference/${candidate_id}`,
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
