import { FC, useRef, useState } from "react";
import { Comment } from "../main-page/MainPage";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import styles from './Comment.module.css';
import { CircularProgress } from "@mui/material";

const CommentItems: FC<{comment: Comment}> = ({comment}) => {
  let innerHtml = '';
  const arrow = useRef<HTMLDivElement>(null);
  const [isComments, setIsComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  if (comment.text) {
    innerHtml = comment.text;
  }

  const getComment = async (commentItem: Comment) => {
    if (comments.length === 0) {
      const url = "https://hacker-news.firebaseio.com/v0";
      if (commentItem.kids) {
        setIsLoading(true);
        const unsortedComments = await Promise.all(
          commentItem.kids.map(
            async (id) =>
              await fetch(`${url}/item/${id}.json`).then((res) => res.json())
          )
        );
        const sortedComments = unsortedComments.sort((a, b) => {
          return b.time - a.time;
        });
        setComments(sortedComments);
        setIsLoading(false);
      }
    }
  }

  const arrowClickHandle = () => {
    if (arrow.current?.classList.contains(styles.active)) {
      arrow.current?.classList.remove(styles.active);
      setIsComments(false);
    } else {
      arrow.current?.classList.add(styles.active);
      setIsComments(true);
      getComment(comment);
    }
  }

  return (
    <>
      <div style={{marginTop: '10px'}}>
        <div className={styles.author}>
          <div style={{marginLeft: '-3px'}}>
            <ContactPageIcon />
          </div>
          {comment.by}
          {comment.kids && <div ref={arrow} className={styles.arrow} onClick={arrowClickHandle}>▶</div>}
          {isLoading && <div className={styles.loading}><CircularProgress /></div>}
        </div>
        <div className={styles['comment-text']} dangerouslySetInnerHTML={{__html: innerHtml}}>
        </div>
        <div style={{marginLeft: '20px'}}>
          {isComments && comments.map(c => <CommentItems key={c.id} comment={c} />)}
        </div>
      </div>
    </>
  );
}

export default CommentItems;