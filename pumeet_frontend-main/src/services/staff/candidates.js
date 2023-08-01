import axios from 'axios';

export async function getCandidates() {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/staff/candidate/list',
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

export async function getCandidateDetail(candidate_id) {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    const response = await axios({
      method: 'GET',
      url: `http://localhost:8000/api/staff/candidate/${candidate_id}`,
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


export async function approveCandidateProfile(candidate_id) {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    const response = await axios({
      method: 'POST',
      url: `http://localhost:8000/api/staff/candidate/${candidate_id}/approve`,
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

export async function rejectCandidateProfile(candidate_id) {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    const response = await axios({
      method: 'POST',
      url: `http://localhost:8000/api/staff/candidate/${candidate_id}/reject`,
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