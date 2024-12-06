import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Notification from '../components/Notification';

const EditNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(`http://localhost:4000/api/news/${id}`);
      const json = await response.json();

      setTitle(json.title);
      setContent(json.content);
      setAuthor(json.author);
    };

    fetchNews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      setError('Visi laukai privalomi');
      return;
    }

    const naujiena = { title, content, author };

    const response = await fetch(`http://localhost:4000/api/news/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(naujiena)
    });

    if (response.ok) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="container create-new">
      <form onSubmit={handleSubmit}>
        <h1>Redaguoti naujieną:</h1>
        {showNotification && <Notification message="Pakeitimai išsaugoti!" type="success" />}
        {error && <div className="error">{error}</div>}
        <div className="group">
          <label>Autorius:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className={!author && error ? 'error-input' : ''} />
        </div>
        <div className="group">
          <label>Antraštė:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={!title && error ? 'error-input' : ''} />
        </div>
        <div className="group">
          <label>Turinys:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className={!content && error ? 'error-input' : ''} />
        </div>
        <button type="submit">Atnaujinti</button>
      </form>
    </div>
  );
};

export default EditNews;
