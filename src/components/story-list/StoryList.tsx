import { FC } from 'react';
import styles from './StoryList.module.css';
import { Story } from './../pages/main-page/MainPage';
import StoryItem from './StoryItem';

const StoryList: FC<{stories: Story[]}> = ({stories}) => {
  return (
    <>
      <div className={`main-container ${styles['story-list']}`}>
        {stories.map(story => <StoryItem key={story.id} story={story} />)}
      </div>
    </>
  );
}

export default StoryList;