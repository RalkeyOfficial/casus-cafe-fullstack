import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from "./Form.module.css"

const EventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: object) => console.log(data);

  return (
    <fieldset className={styles.fieldset}>
      <legend>Maak Event</legend>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label>Event datum</label>
          <input type="date" {...register('datum', { required: true })} />
          <ErrorMessage errors={errors} name="datum" message="datum mag niet leeg zijn" />
        </div>

        <div>
          <label>Event aanvangstijd</label>
          <input type="time" {...register('aanvangstijd', { required: true })} />
          <ErrorMessage
            errors={errors}
            name="aanvangstijd"
            message="aanvangstijd mag niet leeg zijn"
          />
        </div>

        <div>
          <label>Event Naam</label>
          <input type="text" {...register('eventNaam', { required: true })} />
          <ErrorMessage errors={errors} name="eventNaam" message="event naam mag niet leeg zijn" />
        </div>

        <div>
          <label>Entree prijs</label>
          <input
            placeholder="000.00"
            type="number"
            step="any"
            {...register('entreePrijs', { required: true, pattern: /^(([1-9]\d*)|0)?\.\d{1,2}$/g })}
          />
          <ErrorMessage
            errors={errors}
            name="entreePrijs"
            message="de entree prijs mag niet beginnen met een 0 (behalve als het 0 euro is), het moet een decimal punt met 2 numbers hebben (.23)"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </fieldset>
  );
};

export default EventForm;
