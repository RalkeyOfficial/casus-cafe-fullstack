import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from './Form.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { useGenre } from '@/hooks/genre';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react';
import { useBand } from '@/hooks/band';

const BandForm: React.FC = () => {
  const {
    register,
    handleSubmit,
	reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const _useBand = useBand(queryClient);
  const createBand = _useBand.create();

  const _useGenre = useGenre(queryClient);
  const getGenre = _useGenre.getAll();

  useEffect(() => {
    setIsLoading(getGenre.isLoading);
  }, [getGenre.isLoading]);

  const onSubmit = (data: object) => {
    console.log(data);

    createBand.mutate({ payload: data });
	reset();
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend>Voer Band In</legend>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label>Band naam</label>
          <input type="text" {...register('name', { required: true })} />
          <ErrorMessage errors={errors} name="name" message="Band naam mag niet leeg zijn" />
        </div>

        <div>
          <label>Genre</label>
          {getGenre.isLoading && <Skeleton height="30px" />}
          {getGenre.isSuccess && (
            <select {...register('genre', { required: true })}>
              {getGenre.data.map((genre: any) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          )}
          <ErrorMessage errors={errors} name="genre" message="genre mag niet leeg zijn" />
        </div>

        <button disabled={isLoading} type="submit">
          Submit
        </button>
      </form>
    </fieldset>
  );
};

export default BandForm;
