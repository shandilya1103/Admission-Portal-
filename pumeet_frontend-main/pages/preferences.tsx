import Head from 'next/head';
import React from 'react';
import { Box, Container } from '@mui/material';
import { useNotifier } from 'react-headless-notifier';

import {
  DangerNotification
} from '../src/components/notifications';
import { getPreferences, addPreference, deleteAllPreferences, getBranchList } from '../src/services/preferences.js'
import { getProfile } from '../src/services/profiling.js'
import { AppLayout } from '../src/components/app-layout';
import styles from '../styles/auth.module.scss';


function Preferences() {  
  const { notify } = useNotifier();
  const [authToken, setAuthToken] = React.useState("");
  const [preferenceList, setPreferenceList] = React.useState<any>([]);
  const [branchList, setBranchList] = React.useState<any>();
  const [editable, setEditable] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    setAuthToken(AUTH_TOKEN || "")
    if (!AUTH_TOKEN) {
      window.location.replace('/signin');
    } else {
      getProfileHandler()
      getBranchListHandler();
      getPreferencesHandler();      
    };
  }, [])

  const getProfileHandler = async () => {
    setLoading(true)
    try {
      let response: any = await getProfile();
      if(response?.error) {
        throw new Error(response?.error);
      } else if (response) {
        response = response.data;
        if (!response.approved) {
          window.location.replace("/profile")      
        } else {
          setLoading(false)
        }
      }
    } catch (err: any) {
      window.location.replace("/profile")
    }
  }

  const getBranchListHandler = async () => {
    try {
      let response: any = await getBranchList();
      if(response?.error) {
        throw new Error(response?.error);
      } else if (response) {
        response = response.data;
        setBranchList(response);
      }
    } catch (err: any) {
      setEditable(true);
    }
  }

  const getPreferencesHandler = async () => {
    try {
      let response: any = await getPreferences();
      if(response?.error) {
        throw new Error(response?.error);
      } else if (response) {
        response = response.data;
        setEditable(false);
        setPreferenceList(response);
      }
    } catch (err: any) {
      setEditable(true);
    }
  }

  const addPreferenceComponent = () => {
    setEditable(true);
    setPreferenceList(
      (prevState: any) => (
        [...prevState, { preference: (preferenceList.length + 1) }]
      )
    );
  }

  const removePreferenceComponenet = (preferenceNumber: number) => {
    if (!editable) {
      return;
    }
    let temp = preferenceList;
    temp = temp.filter((preference: any) => preference.preference != preferenceNumber);
    temp = temp.map((preference: any) => {
      if (preference.preference > preferenceNumber) {
        preference.preference -= 1
      }
      return preference
    })
    setPreferenceList(temp)
  }  

  const updatePreferencesHandler = async (params: any) => {
    let deleted: any = await deleteAllPreferences();
    try {
      if (deleted?.error) {
        throw new Error(deleted?.error);
      } else if (deleted) {
        let response: any;
        for (let index = 0; index < params.length; index++){
          response = await addPreference({
            preference: params[index][0],
            branch: params[index][1]
          });
          if (response?.error) {
            throw new Error(response?.error);
          }
        }
        if (response) {
          return response.data;          
        }
      }
    } catch (err: any) {
      notify(<DangerNotification message={err.message} />);
    }
  }

  const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
  }

  const generatePayload = async (form: formData) => {
    return new Promise((resolve, reject) => {
      let params: any = [];
      let chosenBranches: any = [];
      let formElements: any = form?.target?.elements;
      for (let index = 0; index < formElements.length; index += 2) {
        let preferenceElement = formElements[index];
        let branchElement = formElements[index+1];
        if (preferenceElement?.type != "submit" && preferenceElement?.type != "button") {
          if (!!preferenceElement?.value && !!branchElement?.value) {
            params.push([preferenceElement?.value, branchElement?.value]);
            chosenBranches.push(branchElement?.value);
          } else {
            reject("Please remove the empty preferences");
          }
        }
      }
      if (hasDuplicates(chosenBranches)) {
        reject("Please select different branch for each preference")
      }
      resolve(params);
    });
  } 

  const handleSubmit = async (form: formData) => {
    form.preventDefault();
    setEditable(false)
    try {
      let clickedBtn = document?.activeElement?.value;
      if (clickedBtn == "Edit") {
        setLoading(true);
        setEditable(true);
        setLoading(false);
      } else {
        try {
          await generatePayload(form).then(async (params: any) => {
            let response: any = await updatePreferencesHandler(params);
            if (response) {
              console.log(response)
              window.location.reload(true);              
            }
          })
        } catch (err: any) {
          notify(<DangerNotification message={err} />);            
        }
      }
    } catch (err: any) {
      setLoading(false);
      notify(<DangerNotification message={err.message} />);
    }
  }

  const PreferenceComponent = ({ preferenceNumber, defaultBranch }: any) => {
    return (
      <>
        <div className="col-span-4">
          <label htmlFor="pre">Preferences</label>
          <div className={styles.input}>
            <input readOnly={true} disabled={!editable} name="preference" id="preference" value={preferenceNumber} />
          </div>
        </div>
        <div className="col-span-4">
          <label htmlFor="branch">Branch</label>
          <select disabled={!editable} defaultValue={defaultBranch} name="branch" id="branch" className={"p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}>
            <option value="">Select a branch</option>
            {branchList?.map((branch: any) => {
              return (
                <option key={branch.id} value={branch.id}>{branch.branch_name}</option>
              )
            })}
          </select> 
        </div>
        <div className="col-span-1 flex justify-center items-end mb-1">
          <span type="button" onClick={() => removePreferenceComponenet(preferenceNumber)}>
            <svg className={editable ? "bin fill-slate-500 hover:fill-red-500" : "bin disabled fill-slate-500 hover:fill-red-500"} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="28px" height="28px"><path d="M 10 2 L 9 3 L 5 3 C 4.448 3 4 3.448 4 4 C 4 4.552 4.448 5 5 5 L 7 5 L 17 5 L 19 5 C 19.552 5 20 4.552 20 4 C 20 3.448 19.552 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.105 5.895 22 7 22 L 17 22 C 18.105 22 19 21.105 19 20 L 19 7 L 5 7 z"/></svg>
          </span>
        </div>
      </>
    )
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
          Candidate | Preferences
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
              <h2 className="font-medium mb-2 px-1">Your Preferences</h2>
            </div>
            <div className={styles.content_wrapper}>
              <div className={styles._box + ` p-6`}>
                <form className={styles.form + " grid gap-x-6 gap-y-2 grid-cols-7"} autoComplete="off" onSubmit={handleSubmit}>    
                  <div className="col-span-5 grid gap-x-2 gap-y-2 grid-cols-9">
                    {!preferenceList.length ?
                      <div className="col-span-8 mt-5 font-semibold text-slate-500">
                        No preferences added. 
                      </div>
                      :
                      <>
                        {preferenceList?.sort((p1: any, p2: any) => { return (p1.preference - p2.preference) })
                          .map((preference: any, index: number) => {
                            return (
                              <PreferenceComponent
                                key={index}
                                defaultBranch={preference?.branch?.id}
                                preferenceNumber={preference?.preference}
                              />
                            )
                        })}                  
                      </>
                    }

                    <div className="mt-4 col-span-3">
                      <input type="submit" value={editable ? "Save" : "Edit"} className="theme-btn mb-4" />
                    </div>  
                  </div>

                  <div className="col-span-2">
                    <div className="mt-6">
                      <input type="button" value="Add Preference" className="theme-btn-outlined mb-2" onClick={addPreferenceComponent} />
                    </div>
                    <div className="text-xs px-1 text-slate-500">
                      <strong>Note :</strong>
                      {" "}
                      <span className="text-xs text-inherit font-medium">
                        You can update your preferences n times till 31 December, 2022.
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

Preferences.getLayout = (page: any) => (
  <AppLayout>
    {page}
  </AppLayout>
)

export default Preferences;
