import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ApplyUserLoans from './components/ApplyUserLoans';
import UserDashboard from './components/UserDashboard';
import ViewUserItems from './components/ViewUserItems';
import ViewUserLoans from './components/ViewUserLoans';
import AdminDashboard from './components/AdminDashboard';
import EditCustData from './components/EditCustData';
import ItemCard from './components/ItemCard';
import AddItem from './components/AddItem';
import AdminLogin from './components/AdminLogin';

function App() {
  return (

      <Router>
                   <div class="container-fluid">
                <div class="row flex-nowrap">
        <Sidebar />
        <Routes>
          <Route path = '/' element={<Login />}/>
          <Route path = '/login' element={<Login />} />
          <Route path = '/admin-login' element={<AdminLogin />} />
          <Route path = '/register' element={<Register />} />
          <Route path = '/dashboard' element={<UserDashboard />} />
          <Route path = '/admin-dashboard' element={<AdminDashboard />} />
          <Route path = 'edit-cust-data' element={<EditCustData />} />
          <Route path = '/apply' element={<ApplyUserLoans />} />
          <Route path = '/viewuseritems' element={<ViewUserItems />} />
          <Route path = '/viewloans' element={<ViewUserLoans />} />
          <Route path = '/viewItems' element={<ItemCard/>} />
          <Route path = '/addItem' element={<AddItem/>}/>
        </Routes>
        </div>
</div>
      </Router>
  );
}

export default App;
