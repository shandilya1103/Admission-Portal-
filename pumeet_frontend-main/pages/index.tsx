import React from 'react';

function IndexPage() {  
  React.useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN");
    if (!AUTH_TOKEN) {
      window.location.replace('/signin');
    } else {
      window.location.replace('/profile');
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-white flex justify-center items-center" style={{ zIndex: 1200 }}>
      <h1>Loading...</h1>
    </div>
  )
}

export default IndexPage;
