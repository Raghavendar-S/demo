import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { LoginPage } from './Pages/LoginPage';
import { RegisterPage } from './Pages/RegisterPage';
import { Dashboard } from './Pages/Dashboard';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {isUserSignedIn && <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
