import clsx from 'clsx';
import styles from './Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const { pathname } = useRouter();

  const adminPage = pathname.includes('/admin');

  return (
    <header className={clsx(styles.container, styles.shapedividers)}>
      <div className={styles.content}>
        <Link href="/">
          <p className={styles.header}>Casus Cafe</p>
        </Link>
        {adminPage && <p>Admin Panel v1.0.0</p>}
      </div>
    </header>
  );
};

export default Header;
