import { useState, useEffect } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { Link } from 'react-router-dom';

const Home = () => {
  const [naujienos, setNaujienos] = useState([]);

  useEffect(() => {
    const fetchNaujienos = async () => {
      const response = await fetch('http://localhost:4000/api/news', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      const sortedNaujienos = json.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNaujienos(sortedNaujienos);
    };

    fetchNaujienos();
  }, []);

  const truncateContent = (content, isFeatured) => {
    const limit = isFeatured ? 300 : 150;
    return content.length > limit ? content.substring(0, limit) + '...' : content;
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/api/news/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setNaujienos(naujienos.filter((naujiena) => naujiena._id !== id));
    }
  };

  return (
    <div className="container all-news">
      <h1>Naujienų sąrašas:</h1>
      <div className="naujienos">
        {naujienos &&
          naujienos.map((naujiena, index) => (
            <div key={naujiena._id} className={`naujiena ${index % 5 === 0 || index % 7 === 0 ? 'featured' : ''}`}>
              <h3 className="title">{naujiena.title}</h3>
              <p className="time">{format(new Date(naujiena.date), 'MMM dd, yyyy')}</p>
              <p className="ago">{formatDistanceToNow(new Date(naujiena.date), { addSuffix: true })}</p>
              <p className="content">{truncateContent(naujiena.content, index % 5 === 0 || index % 7 === 0)}</p>
              <p className="author">
                Parašė: <span>{naujiena.author}</span>
              </p>
              <Link to={`/news/${naujiena._id}`} className="read-more">
                Daugiau
              </Link>
              <Link to={`/edit/${naujiena._id}`} className="edit-btn">
                Redaguoti
              </Link>
              <button onClick={() => handleDelete(naujiena._id)} className="delete-btn">
                Trinti
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
