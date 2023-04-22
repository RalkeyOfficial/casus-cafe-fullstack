import clsx from 'clsx';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <>
      <div className={clsx(styles.container, styles.shapedividers)}>
        <div className={styles.content}>
          <a href="../../">
            <h4 className={styles.header}>Casus Cafe</h4>
          </a>
          <p>button here</p>
        </div>
      </div>
      <div className={styles.shapedividers} />
    </>
  );
};

export default Header;
