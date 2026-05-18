import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import 'ojs/ojfilmstrip';
import 'ojs/ojactioncard';
import 'ojs/ojavatar';
import 'css!./demo.css';

type UserModel = {
  id: number;
  name: string;
  title: string;
  image: string;
};

const USERS: UserModel[] = [
  {
    id: 1,
    name: 'Chris Black',
    title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
    image: '../images/hcm/placeholder-male-01.png',
  },
  {
    id: 2,
    name: 'Christine Cooper',
    title: 'Senior Principal Escalation Manager',
    image: '../images/hcm/placeholder-female-01.png',
  },
  {
    id: 3,
    name: 'Alfred Marchris',
    title: 'Principal Developer',
    image: '../images/hcm/placeholder-male-13.png',
  },
  {
    id: 4,
    name: 'Chris Benalamore',
    title: 'Area Business Operations Director EMEA & JAPAC',
    image: '../images/hcm/placeholder-male-03.png',
  },
  {
    id: 5,
    name: 'Chloe Christenson',
    title: 'Senior Engineering Manager',
    image: '../images/hcm/placeholder-female-07.png',
  },
  {
    id: 6,
    name: 'Charlotte Marchris',
    title: 'Customer Service Analyst',
    image: '../images/hcm/placeholder-female-08.png',
  },
  {
    id: 7,
    name: 'Christopher Johnson',
    title: 'Vice-President HCM Application Development',
    image: '../images/hcm/placeholder-male-04.png',
  },
  {
    id: 8,
    name: 'Samire Christian',
    title: 'Consulting Project Technical Manager',
    image: '../images/hcm/placeholder-male-05.png',
  },
  {
    id: 9,
    name: 'Kurt Marchris',
    title: 'Customer Service Analyst',
    image: '../images/hcm/placeholder-male-06.png',
  },
  {
    id: 10,
    name: 'Zelda Christian Cooperman',
    title: 'Senior Principal Escalation Manager',
    image: '../images/hcm/placeholder-female-02.png',
  },
  {
    id: 11,
    name: 'Christian Wu',
    title: 'Senior Principal Escalation Manager',
    image: '../images/hcm/placeholder-male-07.png',
  },
  {
    id: 12,
    name: 'Jennifer Christy',
    title: 'Area Business Operations Director EMEA & JAPAC',
    image: '../images/hcm/placeholder-female-03.png',
  },
  {
    id: 13,
    name: 'Christine Ellis',
    title: 'Vice-President HCM Application Development',
    image: '../images/hcm/placeholder-female-04.png',
  },
  {
    id: 14,
    name: 'Patrick Chrismon',
    title: 'Consulting Project Technical Manager',
    image: '../images/hcm/placeholder-male-08.png',
  },
];

const getIsSmallDisplay = (): boolean => window.matchMedia('(max-width: 599.9px)').matches;

export const FilmStripFilmStripActionCards = () => {
  const [isSmallDisplay, setIsSmallDisplay] = useState<boolean>(() => getIsSmallDisplay());

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 599.9px)');
    const listener = () => setIsSmallDisplay(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, []);

  return (
    <div id="filmstrip-action-cards-example">
      <div class="oj-panel oj-sm-margin-4x">
        <oj-film-strip
          id="filmstrip"
          aria-label="Users"
          class="demo-filmstrip"
          arrowPlacement={isSmallDisplay ? 'overlay' : 'adjacent'}
          arrowVisibility="visible"
        >
          {USERS.map((user) => (
            <oj-action-card key={user.id} class="demo-card">
              <div class="oj-sm-padding-4x oj-flex oj-sm-flex-direction-column">
                <oj-avatar class="oj-sm-margin-1x-bottom" size="lg" src={user.image}></oj-avatar>
                <span class="oj-typography-body-md oj-text-color-primary">{user.name}</span>
                <span class="oj-typography-body-sm oj-text-color-secondary oj-line-clamp-2">
                  {user.title}
                </span>
              </div>
            </oj-action-card>
          ))}
        </oj-film-strip>
      </div>
    </div>
  );
};

export default FilmStripFilmStripActionCards;
