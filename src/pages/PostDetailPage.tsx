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

};

export default PostDetailPage;