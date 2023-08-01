import axios from 'axios';

export async function getPreferences() {
    
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/seat-management/prefrence/list/',
      headers: {
        'Authorization': 'Token ' + AUTH_TOKEN
      },
    })
    return response;
  } catch (error) {
    const errorData = error?.response?.data;
    return ({ error: errorData[Object.keys(errorData)?.[0]]?.[0]});
  } 
}

export async function addPreference(params) {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/seat-management/prefrence/',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Token ' + AUTH_TOKEN
      },
      data: params,
    })
    return response;
  } catch (error) {
    const errorData = error?.response?.data;
    return ({ error: errorData[Object.keys(errorData)?.[0]]?.[0]});
  } 
}

export async function deleteAllPreferences() {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')
    const response = await axios({
      method: 'DELETE',
      url: 'http://localhost:8000/api/seat-management/prefrence/',
      headers: {
        'Authorization': 'Token ' + AUTH_TOKEN
      },
    })
    return response;
  } catch (error) {
    const errorData = error?.response?.data;
    return ({ error: errorData[Object.keys(errorData)?.[0]]?.[0]});
  } 
}

export async function getBranchList() {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/seat-management/branch/list/',
      headers: {
        'Authorization': 'Token ' + AUTH_TOKEN
      },
    })
    return response;
  } catch (error) {
    const errorData = error?.response?.data;
    return ({ error: errorData[Object.keys(errorData)?.[0]]?.[0]});
  } 
}