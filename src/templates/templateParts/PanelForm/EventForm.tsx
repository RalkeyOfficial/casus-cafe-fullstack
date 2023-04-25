import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from './Form.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { useEvent } from '@/hooks/event';

const EventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const _useEvents = useEvent(queryClient);
  const createEvent = _useEvents.create();

  const onSubmit = (data: any) => {
    const payload = { ...data, time: data.time + ':00' };

    createEvent.mutate({ payload });
    reset();
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend>Maak Event</legend>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label>Event datum</label>
          <input type="date" {...register('date', { required: true })} />
          <ErrorMessage errors={errors} name="date" message="datum mag niet leeg zijn" />
        </div>

        <div>
          <label>Event aanvangstijd</label>
          <input type="time" {...register('time', { required: true })} />
          <ErrorMessage errors={errors} name="time" message="aanvangstijd mag niet leeg zijn" />
        </div>

        <div>
          <label>Event Naam</label>
          <input type="text" {...register('name', { required: true })} />
          <ErrorMessage errors={errors} name="name" message="event naam mag niet leeg zijn" />
        </div>

        <div>
          <label>Entree prijs</label>
          <input
            placeholder="000.00"
            type="number"
            step="any"
            {...register('price', { required: true, pattern: /^(([1-9]\d*)|0)?\.\d{1,2}$/g })}
          />
          <ErrorMessage
            errors={errors}
            name="price"
            message="de entree prijs mag niet beginnen met een 0 (behalve als het 0 euro is), het moet een decimal punt met 2 numbers hebben (.23)"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </fieldset>
  );
};

export default EventForm;
