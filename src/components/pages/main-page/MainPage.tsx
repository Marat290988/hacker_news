import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import StoryList from '../../story-list/StoryList';
import styles from './MainPage.module.css';

export interface Story {
  by: string,
  descendants: string,
  id: number,
  kids: number[],
  score : number,
  time : number,
  title : string,
  type : string,
  url : string,
  comment?: Comment[]
}

export interface Comment {
  by? : string,
  id? : number,
  kids? : number[],
  parent? : number,
  text? : string,
  time? : number,
  type? : string,
  comment?: Comment[]
}

const MainPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStoryIds = async () => {
      setIsLoading(true);
      const url = 'https://hacker-news.firebaseio.com/v0';
      const res = await fetch(`${url}/beststories.json`);
      const data: string[] = await res.json();
      const unsortedStories: Story[] = 
        await Promise.all(data.map(async (id) => await fetch(`${url}/item/${id}.json`).then(res => res.json())));
      const sortedStories = unsortedStories.sort((a, b) => {
        return b.time - a.time;
      });
      sortedStories.splice(0 , 100);
      setStories(sortedStories);
      setIsLoading(false);
    };
    getStoryIds();
    const linkTimer = setInterval(() => {
      getStoryIds();
    }, 60000);
    return (() => {
      clearInterval(linkTimer);
    })
  }, []);

  if (isLoading) {
    return (
      <div className={styles['center-container']}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <StoryList stories={stories} />
    </>
  );
}

export default MainPage;