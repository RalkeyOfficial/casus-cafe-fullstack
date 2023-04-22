import clsx from 'clsx';
import styles from './Header.module.css';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className={clsx(styles.container, styles.shapedividers)}>
      <div className={styles.content}>
        <Link href="/">
          <h4 className={styles.header}>Casus Cafe</h4>
        </Link>
        <p>button here</p>
      </div>
    </div>
  );
};

export default Header;
