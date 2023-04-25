import styles from './Agenda.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { useEvent } from '@/hooks/event';
import Skeleton from 'react-loading-skeleton';
import AgendaItem from './AgendaItem';

const Agenda: React.FC = () => {
  const queryClient = useQueryClient();
  const _useEvents = useEvent(queryClient);
  const getEvent = _useEvents.getAll();

  return (
    <div className={styles.agendaContainer}>
      <h5>Evenementen Agenda</h5>
      {getEvent.isLoading && <Skeleton height="50px" />}
      {getEvent.isSuccess && (
        <div className={styles.agendaContent}>
          {getEvent.data.map((event: any, idx) => (
            <AgendaItem
              key={idx}
              name={event.naam}
              price={event.entree_kosten}
              date={event.datum}
              time={event.aanvangstijd}
              bands={event.bands}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Agenda;
