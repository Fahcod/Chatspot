import { createRoot } from 'react-dom/client';
import './index.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import ChatPage from './pages/ChatPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ChatContextProvider from './context/ChatContext';
import LoadingPage from './pages/LoadingPage';
import CreateStatus from './pages/CreateStatus';
import StoryViewer from './pages/StoryViewer';

const router = createBrowserRouter([
{
  path:'/home',
  element:<HomePage/>,
  children:[
    {
      path:'/home/',
      element:<WelcomePage/>,
      index:true
    },{
      path:'/home/chat',
      element:<ChatPage/>
    },{
      path:'/home/create-status',
      element:<CreateStatus/>
    },{
      path:'/home/view-stories/:userId',
      element:<StoryViewer/>
    }
  ]
},{
  path:"/signup",
  element:<SignupPage/>
},{
  path:"/login",
  element:<LoginPage/>
},{
  path:"/",
  element:<LoadingPage/>
}
]);

createRoot(document.getElementById('root')!).render(
  <>
  <Provider store={store}>
  <ChatContextProvider>
  <RouterProvider router={router}/>
  </ChatContextProvider>
  </Provider>
  </>
)
