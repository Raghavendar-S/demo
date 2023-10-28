import React,{useState,useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Spinner({path = "login"}) {
    const [count,setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        },1000);
        count === 0 && navigate(`/${path}`,{
            state: location.pathname
        })
        return () => clearInterval(interval)
    },[count,navigate,location, path]);
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2 className='text-center'>Redirecting to you in {count} second</h2><br/>
            <CircularProgress />
        </div>
    );
}
