import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/Header';
import Orders from './components/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
      <ToastContainer position='bottom-center'/>
    </>
  );
}

export default App;