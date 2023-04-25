import styles from './Agenda.module.css';

interface AgendaItemProps {
  name: string;
  price: string;
  date: string;
  time: string;
  bands: {
    band: string;
    genre: string;
  }[];
}

const AgendaItem: React.FC<AgendaItemProps> = ({ name, price, date, time, bands }) => {
  let _date = new Date(date);
  const dateString = `${_date.getDate()} ${
    [
      'Januari',
      'Februari',
      'Maart',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Augustus',
      'September',
      'Oktober',
      'November',
      'December',
    ][_date.getMonth()]
  }`;

  const _time = time.split(':').slice(0, -1).join(':');

  return (
    <div className={styles.agendaItem}>
      <div className={styles.agendaItemHead}>
        <div>
          {dateString} - {_time}
        </div>
        <h6>{name}</h6>
        <div>${price}</div>
      </div>

      {!!bands[0] &&
        bands.map((_band: any, idx) => (
          <div key={idx} className={styles.agendaItemBand}>
            <h6>{_band.band}</h6>
            <div>
              <div className={styles.genre}>{_band.genre}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AgendaItem;
