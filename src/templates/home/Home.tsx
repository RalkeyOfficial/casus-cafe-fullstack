import Agenda from '../templateParts/homeAgenda/Agenda';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <article className={styles.mainContent}>
          EasyTiger cafe is een unieke combinatie van een café en een muziektheater. Het café
          organiseert regelmatig muziekavonden waarop lokale en internationale bands optreden. Het
          publiek kan genieten van verschillende muziekgenres, van jazz tot rock en van folk tot
          pop. Naast reguliere optredens worden er ook festivals gehouden bij EasyTiger, waarbij de
          sfeer en het enthousiasme van het publiek zorgen voor een geweldige avond vol muziek en
          gezelligheid. Of je nu een muziekliefhebber bent of gewoon op zoek bent naar een leuke
          avond uit, EasyTiger is zeker een bezoekje waard!
          <br />
          <br />
          EasyTiger cafe biedt niet alleen fantastische live muziek en festivals, maar ook een
          uitgebreid menu met smakelijke hapjes en drankjes. Je kunt kiezen uit een verscheidenheid
          aan bieren van de tap en flessen, wijnen, cocktails en niet-alcoholische drankjes. Het
          menu biedt ook een selectie van heerlijke hapjes zoals nacho&#39;s, frietjes, sandwiches
          en vegetarische opties. Als je iets meer substantieels wilt, zijn er ook enkele
          hoofdgerechten beschikbaar, zoals hamburgers en pizza&#39;s. Het eten en drinken bij
          EasyTiger cafe is van hoge kwaliteit en perfect om te genieten terwijl je luistert naar
          geweldige live muziek of tijdens een gezellige avond met vrienden.
        </article>
      </div>

      <Agenda />
    </div>
  );
};

export default Home;
