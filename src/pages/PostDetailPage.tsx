import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePost, getPost, updatePost } from '../api/posts';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setErrorMessage('Post ID is missing.');
        setIsLoading(false);
        return;
      }

      try {
        const post = await getPost(id);

        setTitle(post.title);
        setContent(post.content);
      } catch {
        setErrorMessage('Failed to fetch the post.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (event: React.SubmitEvent) => {
    event.preventDefault();

    if (!id) return;

    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      await updatePost(id, { title, content });
      setSuccessMessage('Post was successfully updated.');
    } catch {
      setErrorMessage('Failed to update the post. Please check your input.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
  
    const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (!confirmed) return;

    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      await deletePost(id);
      navigate('/posts');
    } catch {
      setErrorMessage('Failed to delete the post.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage && !title && !content) {
    return (
      <main>
        <p role="alert">{errorMessage}</p>
        <Link to="/posts">投稿一覧へ戻る</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>投稿詳細・編集</h1>

      <form onSubmit={handleUpdate}>
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
          {isSubmitting ? '更新中...' : '更新する'}
        </button>
      </form>

      <button type="button" onClick={handleDelete} disabled={isSubmitting}>
        投稿を削除する
      </button>

      <Link to="/posts">投稿一覧へ戻る</Link>
    </main>
  );
};

export default PostDetailPage;