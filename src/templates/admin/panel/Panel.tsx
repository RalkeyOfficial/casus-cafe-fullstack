import EventForm from '@/templates/templateParts/PanelForm/EventForm';
import styles from './Panel.module.css';
import BandForm from '@/templates/templateParts/PanelForm/BandForm';
import BandToEventForm from '@/templates/templateParts/PanelForm/BandToEventForm';
import GenreForm from '@/templates/templateParts/PanelForm/GenreForm';

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
