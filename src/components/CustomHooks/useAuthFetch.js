import { useState,useEffect } from 'react';

const useAuthFetch = (url,mail,password) => {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);

  async function fetchData(url, mail, password){
    if(url!==undefined){
      const res=await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: mail,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setResponse(res.ok)
      const dat=await res.json();
      setData(dat);
    };
  }
  return { fetchData, data, response };
};

export default useAuthFetch;

