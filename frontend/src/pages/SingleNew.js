import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';

const SingleNew = () => {
  const [naujiena, setNaujiena] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleNews = async () => {
      const response = await fetch(`http://localhost:4000/api/news/${id}`);
      const json = await response.json();
      setNaujiena(json);
    };

    fetchSingleNews();
  }, [id]);

  return (
    <div className="container single-new">
      {naujiena && (
        <div className="naujiena-full">
          <h1>{naujiena.title}</h1>
          <div className="meta">
            <p className="author">Autorius: {naujiena.author}</p>
            <div className="group">
              <p className="time">{format(new Date(naujiena.date), 'MMM dd, yyyy')}</p>
              <span>|</span>
              <p className="ago">{formatDistanceToNow(new Date(naujiena.date), { addSuffix: true })}</p>
            </div>
          </div>
          <p className="content">{naujiena.content}</p>
          <button className="back-btn" onClick={() => navigate('/')}>
            Grąžti
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleNew;
