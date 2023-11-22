import logo from './logo.svg';
import { BrowserRouter, Routes, Route} from'react-router-dom'
import './App.css';
import Home from './components/Home';
import Header from './components/UI/Header';
import Stock from './components/Stock';
import Footer from './components/UI/Footer';

import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import CreateBlogPost from './components/CreateBlogPost';
import News from './components/News';
import BlogDetail from './components/BlogDetail';
import Blog from './components/Blog';
import Market from './components/Market';
import AboutUs from './components/AboutUs';
import Screener from './components/Screener';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 




function App() {
  return (
    <div> 
      <BrowserRouter>
      <ToastContainer style={{ marginTop: '50px' }} />
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route exact path="/blogDetail/:blogId" element={<BlogDetail/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/createBlogPost" element={<CreateBlogPost/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/market" element={<Market/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/screener" element={<Screener/>}/>
        </Routes>
      </BrowserRouter>

      
      
   </div>
  );
}

export default App;
