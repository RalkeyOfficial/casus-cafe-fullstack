import { useUser } from '@auth0/nextjs-auth0/client';
import Panel from './panel/Panel';
import Login from './login/Login';

const AdminPanel: React.FC = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return user ? <Panel /> : <Login />;
};

export default AdminPanel;
