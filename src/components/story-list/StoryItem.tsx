import { FC } from "react";
import styles from "./StoryItem.module.css";
import { Story } from "./../pages/main-page/MainPage";
import moment from "moment";
import { Link } from "react-router-dom";

const StoryItem: FC<{ story: Story }> = ({ story }) => {
  const dateStory = new Date(story.time * 1000);
  const dateString = moment(dateStory).format("DD.MM.YYYY - HH:mm:ss");
  const { title, score, by, id } = story;
  return (
    <>
      <Link to={`/story/${id}`}>
        <div className={styles["story-container"]}>
          <h3>{title}</h3>
          <div className={styles["story-info"]}>
            <span>Рейтинг - {score},</span>
            <span>автор - {by},</span>
            <span>дата - {dateString}</span>.
          </div>
        </div>
      </Link>
    </>
  );
};

export default StoryItem;
