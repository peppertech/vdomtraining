import { ComponentProps } from "preact";
import { useEffect, useState, useRef, useCallback } from 'preact/hooks';
import "ojs/ojfilmstrip";
import "ojs/ojpagingcontrol";
import { PagingModel } from "ojs/ojpagingmodel";
import { FilmStripElement, ojFilmStrip } from "ojs/ojfilmstrip";
import { PagingControlElement } from "ojs/ojpagingcontrol";
import { ojButton } from 'ojs/ojbutton';

const peopleData = [
  {
    "id": 3,
    "name": "Chris Benalamore",
    "title": "Area Business Operations Director EMEA & JAPAC",
    "image": "images/hcm/placeholder-male-03.png",
    "department": "Customer Support"
  },
  {
    "id": 4,
    "name": "Christopher Johnson",
    "title": "Vice-President HCM Application Development",
    "image": "images/hcm/placeholder-male-04.png",
    "department": "Sales"
  },
  {
    "id": 5,
    "name": "Samire Christian",
    "title": "Consulting Project Technical Manager",
    "image": "images/hcm/placeholder-male-05.png",
    "department": "Global Support"
  },
  {
    "id": 6,
    "name": "Kurt Marchris",
    "title": "Customer Service Analyst",
    "image": "images/hcm/placeholder-male-06.png",
    "department": "Customer Support"
  },
]

type FilmStripProps = ComponentProps<"oj-film-strip">;
type PagingControlProps = ComponentProps<"oj-paging-control">;
type Person = {
  id: number;
  name: string;
  title: string;
  image: string;
  department: string;
};

const navArrowPlacement: FilmStripProps["arrowPlacement"] = "adjacent";
const navArrowVisibility: FilmStripProps["arrowVisibility"] = "hidden";
const pagingControlOpts: PagingControlProps["pageOptions"] = { "type": "dots" };


const FilmStripTest = () => {

  const filmStripRef = useRef<FilmStripElement>(null);
  const pagingControlRef = useRef<PagingControlElement>(null);
  const [filmstripModel, setFilmstripModel] = useState<PagingModel>();
  // const people = useRef<Person[]>(peopleData);
  const [people, setPeople] = useState<Person[]>(peopleData);
  const currentItem = useRef<Person>(people[0]);
  // const currentItem = useRef<Person>(people.current[0]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const getInitials = (name: string) => {
    let firstlast = name.split(" ");
    let firstInitial = firstlast[0].charAt(0).toUpperCase();
    let lastInital = firstlast[firstlast.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInital;
  };

  useEffect(() => {
    if (refresh) setRefresh(false);
  }, [refresh])

  useEffect(() => {
    if (filmStripRef?.current) {
      setFilmstripModel(filmStripRef?.current.getPagingModel());
      console.log('in useEffect: ', filmStripRef?.current.getPagingModel())
    }
  }, [filmStripRef?.current, people]);

  const itemChangeHandler = useCallback(
    (e: ojFilmStrip.currentItemChanged) => {
      if (e.detail.updatedFrom === 'external') {
        const temp = e.detail.value;
        if (temp.index != undefined && temp.index >= 0) {
          currentItem.current = people[temp.index]
        }
      }
    }, [])

  const itemClick = (e: ojButton.ojAction) => {
    console.log('button: ', currentItem.current)
    console.log('peopleArrayStart: ', people)
    const tempObj = people.filter((item) => item.id !== currentItem.current.id)
    setPeople(tempObj);
    setRefresh(true);
  }

  return (
    <div>
      {refresh ? null : (
        <oj-film-strip
          id="filmStrip"
          aria-label="Set of avatars"
          maxItemsPerPage={1}
          oncurrentItemChanged={itemChangeHandler}
          arrowPlacement={navArrowPlacement}
          arrowVisibility={navArrowVisibility}
          ref={filmStripRef} >
          {people.map((person: Person, index: number) => (
            <div class="card">
              <oj-avatar
                key={index}
                src={person.image}
                initials={person.image ? "" : getInitials(person.name)}
                size="sm"
                shape="square"
                aria-label={person.name}></oj-avatar>
              <oj-button class="oj-button-sm" onojAction={itemClick}>
                {person.name}
              </oj-button>
            </div>
          ))}
        </oj-film-strip>
      )}
      {people.length > 1 && filmstripModel && filmstripModel?.getPageCount() > 1 && <div class="oj-flex-item oj-flex oj-helper-justify-content-center">
        <oj-paging-control
          id={`_paging_control`}
          data={filmstripModel}
          ref={pagingControlRef}
          pageSize={0}
          pageOptions={pagingControlOpts}>
        </oj-paging-control>
      </div>
      }
    </div>
  );
};

export default FilmStripTest;