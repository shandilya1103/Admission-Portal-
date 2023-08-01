import Head from 'next/head';
import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useNotifier } from 'react-headless-notifier';

import {
  SuccessNotification,
  InfoNotification,
  WarningNotification,
  DangerNotification,
} from '../../src/components/notifications';
import { getProfile, updateProfile } from '../../src/services/profiling.js';
import { getSeatAllotment, generateAllotments } from '../../src/services/staff/allotment.js';
import { AppLayout } from '../../src/components/app-layout';
import styles from '../styles/auth.module.scss';

function AllotmentPage() {
  const { notify } = useNotifier();
  const [authToken, setAuthToken] = React.useState('');
  const [editable, setEditable] = React.useState(true);
  const [allotments, setAllotments] = React.useState([]);
  const [formValid, setFormValid] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    setAuthToken(AUTH_TOKEN || '');
    if (!AUTH_TOKEN) {
      window.location.replace('/signin');
    } else {
      getAllotmentsHandler();
    }
  }, []);

  const getAllotmentsHandler = async () => {
    try {
      let response: any = await getSeatAllotment();
      if (response?.error) {
        notify(<DangerNotification message={'You are not allowed on this view'} />);
        window.location.replace('/');
        throw new Error(response?.error);
      } else if (response) {
        response = response.data;
        console.log(response);
        setAllotments(response);
        console.log(response);
      }
    } catch (err: any) {
      notify(<DangerNotification message={'You are not allowed on this view'} />);
      window.location.replace('/');
      setEditable(true);
    }
  };

  const generateAllotmentsHandler = async () => {
    try {
      let response: any = await generateAllotments();
      if (response?.error) {
        notify(<DangerNotification message={'You are not allowed on this view'} />);
        window.location.replace('/');
        throw new Error(response?.error);
      } else if (response) {
        response = response.data;
        notify(<SuccessNotification message={'Allotments done'} />);
        getAllotmentsHandler();
        console.log(response);
      }
    } catch (err: any) {
      notify(<DangerNotification message={'You are not allowed on this view'} />);
      window.location.replace('/');
      setEditable(true);
    }
  };

  if (!authToken || isLoading) {
    return (
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-white flex justify-center items-center"
        style={{ zIndex: 1200 }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Staff | PU Meet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
          background: '#f6f6f9',
        }}
      >
        <Container maxWidth={false}>
          <h1>Allotments</h1>
          <div className="px-6 py-2">
            {allotments.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                <div className="flex justify-center">
                  <a
                    onClick={() => {
                      generateAllotmentsHandler();
                    }}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Generate Allotments
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="px-6 py-2">
            {allotments.length > 0 &&
              allotments?.map((allotment: any) => {
                return (
                  <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                    <div className="flex justify-between">
                      <h3>{allotment?.user?.email}</h3>
                      <h3>{allotment?.branch?.name}</h3>
                      <h3>{allotment?.allotment_category}</h3>
                      <h3>{allotment?.preference?.preference}</h3>
                    </div>
                  </div>
                );
              })}
          </div>
        </Container>
      </Box>
    </>
  );
}

AllotmentPage.getLayout = (page: any) => <AppLayout>{page}</AppLayout>;

export default AllotmentPage;
