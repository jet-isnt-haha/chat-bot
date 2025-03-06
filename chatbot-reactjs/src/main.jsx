import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import store from './store/index.js';
import router from './router/index.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <RouterProvider router={router}/>
  </Provider>
)
