import styles from './Footer.module.css';
import clsx from 'clsx';

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.shapedividers}>
        <div className={styles.content}>
          <p>footer</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
