import axios from 'axios';

export async function getProfile() {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/candidate-profile/profile/',
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

export async function updateProfile(params) {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/candidate-profile/profile/',
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

export async function deleteProfile() {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/candidate-profile/profile/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + AUTH_TOKEN
      },
    })
    return response;
  } catch (error) {
    const errorData = error?.response?.data;
    return ({ error: errorData[Object.keys(errorData)?.[0]]?.[0]});
  } 
}

export async function getAllotment() {
  try {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/seat-management/allotment/',
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