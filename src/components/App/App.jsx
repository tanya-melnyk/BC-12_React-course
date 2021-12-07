import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import './App.css';

const App = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
