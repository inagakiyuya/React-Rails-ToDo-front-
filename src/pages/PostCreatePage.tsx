import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';

const PostCreatePage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (event: React.SubmitEvent) => {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const post = await createPost({ title, content });
      setSuccessMessage('Post was successfully created.');
      navigate(`/posts/${post.id}`);
    } catch {
      setErrorMessage('Failed to create the post. Please check your input.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>投稿作成</h1>

      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <label htmlFor="content">内容</label>
          <input
            id="content"
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        {errorMessage && <p role="alert">{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '投稿中...' : '投稿する'}
        </button>
      </form>

      <Link to="/posts">投稿一覧へ戻る</Link>
    </main>
  );
};

export default PostCreatePage;