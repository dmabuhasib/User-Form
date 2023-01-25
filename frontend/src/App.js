import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import UserForm from './userForm/UserForm';
import UserSaveData from './UserSaveData';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<UserForm />}></Route>
      <Route path="/userupdate" element={<UserSaveData />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
