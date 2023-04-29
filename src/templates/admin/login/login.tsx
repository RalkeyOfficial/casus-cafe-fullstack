import Link from 'next/link';
import styles from './Login.module.css';

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <h4>Admin Login</h4>
      <button>
        <Link href="/api/auth/login">Login with Auth0</Link>
      </button>
    </div>
  );
};

export default Login;
