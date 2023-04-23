import EventForm from '@/templates/templateParts/PanelForm/EventForm';
import styles from './Panel.module.css';
import BandForm from '@/templates/templateParts/PanelForm/BandForm';
import BandToEventForm from '@/templates/templateParts/PanelForm/BandToEventForm';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <EventForm />
      <BandForm />
      <BandToEventForm />
    </div>
  );
};

export default Home;
