import React,{useEffect} from 'react';
import AuthPage from './pages/AuthPage';
import { Switch,Route,Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { userDataActions } from './store/userData';
import { useHistory} from 'react-router-dom';

function App() {
  const history=useHistory();
  const dispatch=useDispatch();
  const data=useSelector(state=>state.userData)
  useEffect(()=>{
    if(localStorage.length>0){
      Object.entries(localStorage).forEach(async(data)=>{
        dispatch(userDataActions.setIsLoggedIn());
        dispatch(userDataActions.setEmail(data[0]));
        dispatch(userDataActions.setToken(data[1]));
      })
      history.push('/home');
    }
  },[localStorage]);
  
  return (
    <Switch>
      <Route path='/' exact>
        <AuthPage/>
      </Route>
      <Route path='/home'>
        {data.isLoggedIn?<HomePage/>:<Redirect to='/'/>}
      </Route>
      <Redirect to='/'/>
    </Switch>
  );
}

export default App;