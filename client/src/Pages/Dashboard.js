import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export function Dashboard(){
    useEffect(() => {
        const loginMessage = localStorage.getItem('loginMessage');
        if (loginMessage) {
          toast.success(loginMessage);
          localStorage.removeItem('loginMessage');
        }
      }, []);
    return(
        <>
            <Toaster position="top-right" reverseOrder={false}/>
            <h1>Dashboard Page</h1>
        </>
    )
}