import Head from 'next/head';
import React from 'react';
import { Box, Container } from '@mui/material';
import { useNotifier } from 'react-headless-notifier';

import {
  DangerNotification
} from '../src/components/notifications';
import { getProfile, updateProfile, getAllotment } from '../src/services/profiling.js'
import { AppLayout } from '../src/components/app-layout';
import { candidateProfileForm, CandidateProfileResponse } from '../src/interfaces/profile';
import { InfoAlert, WarningAlert, SuccessAlert } from '../src/components/alerts.js'
import styles from '../styles/auth.module.scss';

interface formData {
  preventDefault: any,
  target: candidateProfileForm | any
}

function Profile() {  
  const { notify } = useNotifier();
  const [authToken, setAuthToken] = React.useState("");
  const [seatAlloted, setAllotment] = React.useState<any>(false);
  const [profileData, setProfileData] = React.useState<CandidateProfileResponse>();
  const [editable, setEditable] = React.useState(true);

  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    setAuthToken(AUTH_TOKEN || "")
    if (!AUTH_TOKEN) {
      window.location.replace('/signin');
    } else {
      getProfileHandler();
      getAllotmentHandler();
    };
  }, [])

  const getAllotmentHandler = async () => {
    try {
      let response: any = await getAllotment();
      if(response?.error) {
        throw new Error(response?.error);
      } else if (response) {
        response = response.data;
        setAllotment(response);
        console.log(response)
      }
    } catch (err: any) {

    }
  }

  const getProfileHandler = async () => {
    try {
      let response: any = await getProfile();
      if(response?.error) {
        throw new Error(response?.error);
      } else if (response) {
        response = response.data;
        setEditable(false);
        setProfileData(response);
        setLoading(false)
        console.log(response)
      }
    } catch (err: any) {
      setEditable(true);
    }
  }

  const updateProfileHandler = async (params: any) => {
    let response: any = await updateProfile(params);
    try {
      if (response?.error) {
        throw new Error(response?.error);
      } else if (response) {
        return response.data;
      }
    } catch (err: any) {
      notify(<DangerNotification message={err.message} />);
    }
  }

  const generatePayload = async (form: formData) => {
    return new Promise((resolve, reject) => {
      let params: any = {};
      for (const element of form?.target?.elements) {
        if (element?.type != "submit" && element?.type != "button") {
          if (!!element?.value) {
            if (element?.type == "file") {
              params[element?.name] = element?.files[0];
            } else {
              params[element?.name] = element?.value;
            }
          } else {
            if (document?.activeElement?.value == "Submit") {
              // reject(false);
            }
          }
        }
      }
      resolve(params);
    });
  } 

  const handleSubmit = async (form: formData) => {
    form.preventDefault();

    try {
      let clickedBtn = document?.activeElement?.value;
      if (clickedBtn == "Edit") {
        setLoading(true);
        setEditable(true);
        setLoading(false);
      } else {
        try {
          await generatePayload(form).then(async (params: any) => {
            if(clickedBtn == "Submit") { params["submitted"] = true; }
            let response = await updateProfileHandler(params);
            if (response) {
              window.location.reload(true);              
            }
          })
        } catch (err: any) {
          notify(<DangerNotification message={"Some fields are empty"} />);            
        }
      }
    } catch (err: any) {
      setLoading(false);
      notify(<DangerNotification message={err.message} />);
    }
  }

  if (!authToken || isLoading) {
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
          Candidate | Profile
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
            <div className={styles.header}>
              <h2 className="font-medium mb-2 px-1">Your Profile</h2>
            </div>
            <div className={styles.content_wrapper}>
              <div className={styles._box + ` p-6`}>
                <form className={styles.form + " grid gap-x-6 gap-y-2 grid-cols-7"} autoComplete="off" onSubmit={handleSubmit}>    
                    <div className="col-span-5 grid gap-x-2 gap-y-2 grid-cols-6">
                      <div className="col-span-6">
                          <label htmlFor="application_number">Application No.</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="application_number" id="application_number" placeholder="e.g. 1234567890" defaultValue={profileData?.application_number} />
                          </div>
                      </div>

                      <div className="col-span-6">
                          <label htmlFor="name">Full Name</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="name" id="name" placeholder="e.g. Kashish Goyal" defaultValue={profileData?.name} />
                          </div>
                      </div>

                      <div className="col-span-3">
                          <label htmlFor="email">Email</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="email" name="email" id="email" placeholder="e.g. kashish.profile@gmail.com" defaultValue={profileData?.email} />
                          </div>
                      </div>
                      <div className="col-span-3">
                          <label htmlFor="mobile_no">Phone No.</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="mobile_no" id="mobile_no" placeholder="e.g. +918837678215" defaultValue={profileData?.mobile_no} />
                          </div>
                      </div>

                      <div className="col-span-2">
                          <label htmlFor="date_of_birth">Date of Birth</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="date" name="date_of_birth" id="date_of_birth" placeholder="e.g. 24-10-2001" defaultValue={profileData?.date_of_birth} />
                          </div>
                      </div>
                      <div className="col-span-2">
                          <label htmlFor="gender">Gender</label>
                          <select disabled={!editable} defaultValue={profileData?.gender} name="gender" id="gender" className={"p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                          </select> 
                      </div>
                      <div className="col-span-2">
                          <label htmlFor="category">Category</label>
                          <select disabled={!editable} defaultValue={profileData?.category} name="category" id="category" className={"p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}>
                              <option value="general">General</option>
                              <option value="scheduled_caste">SC</option>
                              <option value="schedule_tribe">ST</option>
                          </select> 
                      </div>

                      <div className="col-span-3">
                          <label htmlFor="nationality">Country</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="nationality" id="nationality" placeholder="e.g. India" defaultValue={profileData?.nationality} />
                          </div>
                      </div>
                      <div className="col-span-3">
                          <label htmlFor="state">State</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="state" id="state" placeholder="e.g. Punjab" defaultValue={profileData?.state} />
                          </div>
                      </div>

                      <div className="col-span-3">
                          <label htmlFor="permanent_address">Permanent Address</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="permanent_address" id="permanent_address" placeholder="e.g. #182, Sector 24, Chandigarh" defaultValue={profileData?.permanent_address} />
                          </div>
                      </div>
                      <div className="col-span-3">
                          <label htmlFor="correspondance_address">Correspondence Address</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="correspondance_address" id="correspondance_address" placeholder="e.g. #182, Sector 24, Chandigarh" defaultValue={profileData?.correspondance_address} />
                          </div>
                      </div>

                      <div className="col-span-3">
                          <label htmlFor="father_name">Father Name</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="father_name" id="father_name" defaultValue={profileData?.father_name} />
                          </div>
                      </div>
                      <div className="col-span-3">
                          <label htmlFor="mother_name">Mother Name</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="mother_name" id="mother_name" defaultValue={profileData?.mother_name} />
                          </div>
                      </div>

                      <div className="col-span-2">
                          <label htmlFor="tenth_board">10th Board</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="tenth_board" id="tenth_board" placeholder="e.g. CBSE" defaultValue={profileData?.tenth_board} />
                          </div>
                      </div>
                      <div className="col-span-2">
                          <label htmlFor="tenth_passing_year">10th Passing Year</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="tenth_passing_year" id="tenth_passing_year" placeholder="e.g. 2018" defaultValue={profileData?.tenth_passing_year} />
                          </div>
                      </div>
                      <div className="col-span-2">
                          <label htmlFor="tenth_marks">10th Marks(%)</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="tenth_marks" id="tenth_marks" placeholder="e.g. 86.4" defaultValue={profileData?.tenth_marks} />
                          </div>
                      </div>
                      
                      <div className="col-span-2">
                          <label htmlFor="twelveth_board">12th Board</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="twelveth_board" id="twelveth_board" placeholder="e.g. CBSE" defaultValue={profileData?.twelveth_board} />
                          </div>
                      </div>
                      <div className="col-span-2">
                          <label htmlFor="twelveth_passing_year">12th Passing Year</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="twelveth_passing_year" id="twelveth_passing_year" placeholder="e.g. 2018" defaultValue={profileData?.twelveth_passing_year} />
                          </div>
                      </div>
                      <div className="col-span-2">
                          <label htmlFor="twelveth_marks">12th Marks(%)</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="twelveth_marks" id="twelveth_marks" placeholder="e.g. 86.4" defaultValue={profileData?.twelveth_marks} />
                          </div>
                      </div>                  

                      <div className="col-span-3">
                        <label htmlFor="tenth_certificate">10th Certificate</label>
                        <div className={styles.input} >
                          <input disabled={!editable} type="file" name="tenth_certificate" id="tenth_certificate" />
                        </div>
                        <div className={ editable ? "text-xs" : "text-xs text-slate-500" }>{ profileData?.tenth_certificate?.split('/')?.pop() }</div>
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="twelveth_certificate">12th Certificate</label>
                        <div className={styles.input} >
                            <input disabled={!editable} type="file" name="twelveth_certificate" id="twelveth_certificate" />
                        </div>
                        <div className={ editable ? "text-xs" : "text-xs text-slate-500" }>{ profileData?.twelveth_certificate?.split('/')?.pop() }</div>
                      </div>
                    
                      <div className="col-span-6">
                          <label htmlFor="all_india_rank">All India Rank</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="all_india_rank" id="all_india_rank" defaultValue={profileData?.all_india_rank} />
                          </div>
                      </div>                                    

                      <div className="col-span-3">
                          <label htmlFor="diploma_institute">Diploma Institute</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="diploma_institute" id="diploma_institute" defaultValue={profileData?.diploma_institute} />
                          </div>
                      </div>
                      <div className="col-span-3">
                          <label htmlFor="diploma_branch">Diploma Branch</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="diploma_branch" id="diploma_branch" placeholder="e.g. CSE" defaultValue={profileData?.diploma_branch} />
                          </div>
                      </div>

                      <div className="col-span-2">
                          <label htmlFor="diploma_board">Diploma Board</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="diploma_board" id="diploma_board" placeholder="e.g. PSBTE" defaultValue={profileData?.diploma_board} />
                          </div>
                      </div>
                      <div className="col-span-2">
                          <label htmlFor="diploma_passing_year">Diploma Passing Year</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="diploma_passing_year" id="diploma_passing_year" placeholder="e.g. 2018" defaultValue={profileData?.diploma_passing_year} />
                          </div>
                      </div>
                      <div className="col-span-2">
                          <label htmlFor="diploma_marks">Diploma Marks(%)</label>
                          <div className={styles.input}>
                              <input disabled={!editable} type="text" name="diploma_marks" id="diploma_marks" placeholder="e.g. 86.4" defaultValue={profileData?.diploma_marks} />
                          </div>
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="diploma_certificate">Diploma Certificate</label>
                        <div className={styles.input} >
                            <input disabled={!editable} type="file" name="diploma_certificate" id="diploma_certificate" />
                        </div>
                        <div className={ editable ? "text-xs" : "text-xs text-slate-500" }>{ profileData?.diploma_certificate?.split('/')?.pop() }</div>
                      </div>
                    
                      <div className="mt-4 col-span-2">
                          <input disabled={(profileData?.submitted || profileData?.approved)} type="submit" value={editable ? "Save" : "Edit"} className="theme-btn-outlined mb-4" />
                      </div>
                      <div className="mt-4 col-span-2">
                          <input disabled={(profileData?.submitted || profileData?.approved)} type="submit" value={"Submit"} className="theme-btn mb-4" />
                      </div> 
                  </div>

                  <div className="col-span-2">
                    <div>
                      {seatAlloted && <SuccessAlert message={
                        "You have been alloted " +
                        seatAlloted?.branch?.name +
                        " in " +
                        seatAlloted?.allotment_category
                      } />}
                    </div>
                    <div>
                      {profileData?.approved ?
                        <InfoAlert message="Your profile is approved!" />
                        :
                        <InfoAlert message="Your profile is not approved" />
                      }
                    </div>
                    <div>
                      {(!profileData?.submitted && !profileData?.approved) && <WarningAlert message={"You need to submit your profile to get approved"} />}                      
                    </div>
                    <div className="text-xs px-1 py-3 text-slate-500">
                      <strong>Note :</strong>
                      {" "}
                      <span className="text-xs text-inherit font-medium">
                        You can submit your profile only once.
                        Save instead to be able to update it later.
                      </span>
                    </div>
                  </div>


                </form>
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </>
  )
}

Profile.getLayout = (page: any) => (
  <AppLayout>
    {page}
  </AppLayout>
)

export default Profile;
