import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from './Form.module.css';

const BandToEventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: object) => console.log(data);

  return (
    <fieldset className={styles.fieldset} style={{ maxWidth: 516 }}>
      <legend>Koppel Band aan Event</legend>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label>Event</label>
          <select {...register('event', { required: true })}>
            <option value="sundays best">sundays best</option>
          </select>
          <ErrorMessage errors={errors} name="event" message="genre mag niet leeg zijn" />
        </div>

        <div>
          <label>Band</label>
          <select {...register('band', { required: true })}>
            <option value="AC/DC">AC/DC</option>
          </select>
          <ErrorMessage errors={errors} name="band" message="genre mag niet leeg zijn" />
        </div>

        <button type="submit">Koppel</button>
      </form>
    </fieldset>
  );
};

export default BandToEventForm;
