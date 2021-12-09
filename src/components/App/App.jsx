import { ToastContainer } from 'react-toastify';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <Main />

      <ToastContainer theme="colored" />
    </div>
  );
};

export default App;
