import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNew = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      setError('Užpildykite visus laukus');
      return;
    }

    const naujiena = { title, content, author };
    // console.log('Duomenys:', naujiena);

    const response = await fetch('http://localhost:4000/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(naujiena)
    });

    if (response.ok) {
      navigate('/');
    }
  };
  return (
    <div className="container create-new">
      <form onSubmit={handleSubmit}>
        <h1>Sukurti naujieną</h1>
        {error && <div className="error">{error}</div>}
        <div className="group">
          {' '}
          <label>Autorius:</label>
          <input type="text" placeholder="Autorius" value={author} onChange={(e) => setAuthor(e.target.value)} className={!author && error ? 'error-input' : ''} required />
        </div>
        <div className="group">
          {' '}
          <label>Antraštė:</label>
          <input type="text" placeholder="Pavadnimas" value={title} onChange={(e) => setTitle(e.target.value)} className={!title && error ? 'error-input' : ''} required />
        </div>
        <div className="group">
          {' '}
          <label>Turinys:</label>
          <textarea placeholder="Tekstas" value={content} onChange={(e) => setContent(e.target.value)} className={!content && error ? 'error-input' : ''} required />
        </div>
        <button type="submit">Sukurti</button>
      </form>
    </div>
  );
};

export default CreateNew;
