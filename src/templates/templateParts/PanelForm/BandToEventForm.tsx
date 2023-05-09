import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from './Form.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { useJoinBandEvent } from '@/hooks/joinBandEvent';
import { useEvent } from '@/hooks/event';
import Skeleton from 'react-loading-skeleton';
import { useBand } from '@/hooks/band';

const BandToEventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const _useJoinBandEvent = useJoinBandEvent(queryClient);
  const joinBandToEvent = _useJoinBandEvent.create();

  const _useEvent = useEvent(queryClient);
  const getEvent = _useEvent.getAll();

  const _useBand = useBand(queryClient);
  const getBand = _useBand.getAll();

  const onSubmit = (data: object) => {
    joinBandToEvent.mutate({ payload: data });
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend>Koppel Band aan Event</legend>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label>Event</label>
          {getEvent.isLoading && <Skeleton height="30px" />}
          {getEvent.isSuccess && (
            <select {...register('event', { required: true })}>
              {getEvent.data.map((event: any) => (
                <option key={event.id} value={event.id}>
                  {event.naam}
                </option>
              ))}
            </select>
          )}
          <ErrorMessage errors={errors} name="event" message="genre mag niet leeg zijn" />
        </div>

        <div>
          <label>Band</label>
          {getBand.isLoading && <Skeleton height="30px" />}
          {getBand.isSuccess && (
            <select {...register('band', { required: true })}>
              {getBand.data.map((band: any) => (
                <option key={band.idband} value={band.idband}>
                  {band.naam}
                </option>
              ))}
            </select>
          )}
          <ErrorMessage errors={errors} name="band" message="genre mag niet leeg zijn" />
        </div>

        <button type="submit">Koppel</button>
      </form>
    </fieldset>
  );
};

export default BandToEventForm;
