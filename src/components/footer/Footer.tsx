import Link from 'next/link';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useUser } from '@auth0/nextjs-auth0/client';

const Footer: React.FC = () => {
  const { user } = useUser();

  return (
    <footer className={styles.container}>
      <div className={styles.shapedividers}>
        <div className={styles.content}>
          <div>
            <p className={styles.header}>EasyTiger Cafe</p>
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

        <div className={styles.adminLogin}>
          <Link href="/admin">Admin {user ? 'panel' : 'Login'} </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
