import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from './Form.module.css';

const BandForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: object) => console.log(data);

  return (
    <fieldset className={styles.fieldset}>
      <legend>Voer Band In</legend>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label>Band naam</label>
          <input type="text" {...register('naam', { required: true })} />
          <ErrorMessage errors={errors} name="naam" message="Band naam mag niet leeg zijn" />
        </div>

        <div>
          <label>Genre</label>
          <select {...register('genre', { required: true })}>
            <option value="rock&roll">rock&roll</option>
          </select>
          <ErrorMessage errors={errors} name="genre" message="genre mag niet leeg zijn" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </fieldset>
  );
};

export default BandForm;
