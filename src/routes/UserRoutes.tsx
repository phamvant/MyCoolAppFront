import { Route } from 'react-router-dom';
import Users from '../pages/Users';
import UserDetail from '../pages/UserDetail';
import ProfileEdit from '../pages/ProfileEdit';
import CreateUser from '../pages/CreateUser';

const UserRoutes = (
  <>
    <Route path="/users" element={<Users />} />
    <Route path="/user/create" element={<CreateUser />} />
    <Route path="/user/:id" element={<UserDetail />} />
    <Route path="/user/:id/edit" element={<ProfileEdit />} />
  </>
);

export default UserRoutes;
