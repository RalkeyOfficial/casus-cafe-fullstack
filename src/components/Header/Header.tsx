import clsx from 'clsx';
import styles from './Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const { pathname } = useRouter();

  const adminPage = pathname.includes('/admin');

  return (
    <div className={clsx(styles.container, styles.shapedividers)}>
      <div className={styles.content}>
        <Link href="/">
          <h4 className={styles.header}>Casus Cafe</h4>
        </Link>
        {adminPage && <p>Admin Panel v1.0.0</p>}
      </div>
    </div>
  );
};

export default Header;
