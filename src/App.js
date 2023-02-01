import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Chats from './Components/Chats';
import { AuthProvider } from './Contexts/AuthContext';

function App() {
  return (
    <div className="App">

      <Router>
        <AuthProvider>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/chats' element={<Chats/>}/>
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
