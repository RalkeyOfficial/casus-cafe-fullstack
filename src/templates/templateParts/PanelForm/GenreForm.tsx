import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from './Form.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { useGenre } from '@/hooks/genre';

const GenreForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const _useGenre = useGenre(queryClient);
  const createGenre = _useGenre.create();

  const onSubmit = (data: any) => {
    createGenre.mutate({ payload: data });
    reset();
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend>Maak Genre</legend>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label>Genre naam</label>
          <input type="text" {...register('name', { required: true })} />
          <ErrorMessage errors={errors} name="name" message="naam mag niet leeg zijn" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </fieldset>
  );
};

export default GenreForm;
