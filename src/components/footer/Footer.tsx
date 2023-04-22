import Link from 'next/link';
import styles from './Footer.module.css';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.shapedividers}>
        <div className={styles.content}>
          <div>
            <p className={styles.header}>Casus Cafe</p>
            <div className={styles.socialMediaContainer}>
              <Link href="#" target="_blank" className={styles.socialMedia}>
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link href="#" target="_blank" className={styles.socialMedia}>
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link href="#" target="_blank" className={styles.socialMedia}>
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
            </div>
          </div>

          <div className={styles.links}>
            <p className={styles.footerHeader}>USEFUL LINKS!</p>
            <Link href="/">Home</Link>
            <Link href="/#">About us</Link>
            <Link href="/#">Services</Link>
          </div>

          <div>
            <p className={styles.footerHeader}>CONTACT US!</p>
            <p>
              Easy Tiger Patio
              <br />
              706 E. 6th St
            </p>
            <p>EasyTigerPatio@gmail.com</p>
            <p>+31 06 123456789</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
