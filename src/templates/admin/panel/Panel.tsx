import EventForm from '@/templates/templateParts/panelForm/EventForm';
import styles from './Panel.module.css';
import BandForm from '@/templates/templateParts/panelForm/BandForm';
import BandToEventForm from '@/templates/templateParts/panelForm/BandToEventForm';
import GenreForm from '@/templates/templateParts/panelForm/GenreForm';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <EventForm />
      <BandForm />
      <GenreForm />
      <BandToEventForm />
    </div>
  );
};

export default Home;
