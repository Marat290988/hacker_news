import { Button, CircularProgress } from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Story } from "../main-page/MainPage";
import CommentItems from "./CommentItem";
import styles from "./StoryDetails.module.css";

const StoryDetails = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [story, setStory] = useState<Story>();
  const [isError, setIsError] = useState(false);
  const [isComments, setIsComments] = useState(false);
  const navigate = useNavigate();

  const getComment = useCallback(async (story: Story) => {
    const url = "https://hacker-news.firebaseio.com/v0";
    const unsortedComments = await Promise.all(
      story.kids.map(
        async (id) =>
          await fetch(`${url}/item/${id}.json`).then((res) => res.json())
      )
    );
    const sortedComments = unsortedComments.sort((a, b) => {
      return b.time - a.time;
    });
    story.comment = sortedComments;
    if (story.comment?.length === 0) {
      story.comment = [{ text: "Нет комментариев" }];
    }
  }, []);

  useEffect(() => {
    const getStory = async (id: string | undefined) => {
      const url = "https://hacker-news.firebaseio.com/v0";
      setIsLoading(true);
      const data: Story = await fetch(`${url}/item/${id}.json`).then((res) =>
        res.json()
      );
      if (data.kids) {
        await getComment(data);
        setStory(data);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    };
    getStory(storyId);
  }, [getComment, storyId]);

  if (isLoading) {
    return (
      <div className={styles["center-container"]}>
        <CircularProgress />
      </div>
    );
  }

  let JSX;

  const commentClickHandle = () => {
    setIsComments((prevState) => !prevState);
  };

  if (isError) {
    JSX = <div className={styles.error}>НЕКОРРЕКТНЫЙ ID</div>;
  } else if (story) {
    const { title, by, url } = story;
    const dateStory = new Date(story.time * 1000);
    const dateString = moment(dateStory).format("DD.MM.YYYY - HH:mm:ss");
    const commentQty = story.kids.length;

    JSX = (
      <div>
        <div className={`${styles["news-info"]} ${styles["bg"]} ${styles.back}`}>
          <Button variant="contained" onClick={() => {navigate('/')}}>
            На главную
          </Button>
        </div>
        <h3>{title}</h3>
        <div className={styles["news-info"]}>
          Автор <span style={{ fontStyle: "italic" }}>{by}</span>
        </div>
        <div className={styles["news-info"]}>
          Дата <span style={{ fontStyle: "italic" }}>{dateString}</span>
        </div>
        <div className={`${styles["news-info"]} ${styles["bg"]}`}>
          <Button variant="contained" href={url} target="_blank">
            Открыть новость
          </Button>
        </div>
        <div className={styles.comments} onClick={commentClickHandle}>
          Комментарии... ({commentQty})
        </div>
        {isComments && (
          <div>
            {story.comment?.map((comment) => (
              <CommentItems key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="main-container">
        <div className={styles["story-details-container"]}>{JSX}</div>
      </div>
    </>
  );
};

export default StoryDetails;
