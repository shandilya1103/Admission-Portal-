import Head from 'next/head';
import React from 'react';
import { Box, Container } from '@mui/material';
import { useNotifier } from 'react-headless-notifier';

import {
  DangerNotification
} from '../../src/components/notifications';
import { getCandidates } from '../../src/services/staff/candidates.js';
import { AppLayout } from '../../src/components/app-layout';

function IndexPage() {  
  const { notify } = useNotifier();
  const [authToken, setAuthToken] = React.useState("");
  const [candidates, setCandidates] = React.useState([]);

  React.useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN");
    setAuthToken(AUTH_TOKEN || "");
    if (!AUTH_TOKEN) {
      window.location.replace('/signin');
    } else {
      getCandidatesHandler();
    }
  }, [])

  const getCandidatesHandler = async () => {
    try {
      let response: any = await getCandidates();
      if(response?.error) {
        notify(<DangerNotification message={"You are not allowed on this view"} />);
        window.location.replace('/');
        throw new Error(response?.error);
      } else if (response) {
        response = response.data;
        setCandidates(response);
        console.log(response)
      }
    } catch (err: any) {
      notify(<DangerNotification message={"You are not allowed on this view"}  />);
      window.location.replace('/');
    }
  }

  if (!authToken) {
    return (
      <div className="absolute top-0 left-0 w-screen h-screen bg-white flex justify-center items-center" style={{ zIndex: 1200 }}>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>
          Staff | PU Meet
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
          background: "#f6f6f9"
        }}
      >
        <Container maxWidth={false}>
          <div className="px-6 py-2">
            {
                candidates?.map((candidate: any) => {
                    return (
                        <a href={`/staff/candidate/${candidate?.user}`}>
                            <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <div className="w-16 h-16">
                                            <h3>{candidate?.email}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )
                })
            }
          </div>
        </Container>
      </Box>
    </>
  )
}

IndexPage.getLayout = (page: any) => (
  <AppLayout>
    {page}
  </AppLayout>
)

export default IndexPage;
