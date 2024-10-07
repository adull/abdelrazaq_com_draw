import { h } from 'preact';

import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

import Header from './components/Header';
import ReviewAndComment from './components/ReviewAndComment';

export function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCommentsRoute = `https://665999f8de346625136d25c0.mockapi.io/api/v1/comments`

  const processCommentData = (data) => {
      let lastShownEmail = null;
      return data.map((comment) => {
          const { email } = comment?.user;
          const hideAvatar = email && email === lastShownEmail;
          lastShownEmail = email || lastShownEmail;
  
          return {
              ...comment,
              user: {
                  ...comment.user,
                  hideAvatar,
              }
          };
      });
  };

  const addComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    const processedData = processCommentData(updatedComments);
    setComments(processedData);
  };
  

  useEffect(() => {
      const fetchComments = async () => {
          try {
              const response = await axios.get(getCommentsRoute);
              const processedData = processCommentData(response.data);
              console.log({ processedData})
              setComments(processedData)
              setLoading(false);
          } catch (err) {
              setError(err.message);
              setLoading(false);
          }
      };

      fetchComments();
  }, []);
  return (
    <>
    <Header />
    <div class="container mx-auto">
      {error ? (
        <p>Error loading comments: {error}</p>
      ) : loading ? (
        <p class="flex">Loading comments...</p>
      ) : (
        <ReviewAndComment comments={comments} addComment={addComment} />
      )}
    </div>
    </>
  );
}
