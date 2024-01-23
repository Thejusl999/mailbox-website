import { useState } from 'react';

const useDataFetch = () => {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  let prevBody={};
  const [prevMail,setPrevMail]=useState(prevBody);

  async function dataFetch(url, method, body){
    if(method==='POST'&&JSON.stringify(prevMail)===JSON.stringify(prevBody)){
      try{
        setPrevMail(body)
        const res=await fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setResponse(res.ok);
        if(!res.ok)
          throw new Error('Mail not sent, try again after some time!');
        setError('no error')
        const dat=await res.json();
        setData(dat);
      }catch(err){
        setError(err.message);
      }
    }else if(method==='GET'){
      try{
        const res=await fetch(url)
        setResponse(res.ok);
        if(!res.ok){
          throw new Error('could not fetch Emails')
        }
        const dat=await res.json();
        setData(dat);
      }catch(err){
        setError(err.message);
      }
    }else if(method==='PUT'){
      try{
        const res=await fetch(url, {
          method: method,
          body: JSON.stringify(body)
        })
        setResponse(res.ok);
        setData(null);
        if(!res.ok){
          throw new Error('could not set email status to READ!')
        }
        setError(null);
      }catch(err){
        setError(err.message)
      }
    }else if(method==='DELETE'){
      try{
        const res=await fetch(url, {
          method: method,
        })
        setResponse(res.ok);
        setData(null);
        if(!res.ok){
          throw new Error('could not delete email!')
        }
        setError(null);
      }catch(err){
        setError(err.message)
      }
    }
  }
  return { dataFetch, data, response, error };
};

export default useDataFetch;

