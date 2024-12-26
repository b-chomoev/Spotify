import React, { useState } from 'react';
import axiosApi from '../../axiosApi';
import { toast } from 'react-toastify';

const initialState = {
  link: '',
}

const Home = () => {
  const [form, setForm] = useState(initialState);
  const [shortUrl, setShortUrl] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUrl = {
      originalUrl: form.link,
    }

    const response = await axiosApi.post('/links', newUrl);
    setShortUrl(response.data.shortUrl);
    setForm(initialState);
    toast.success('Link was successfully shortened!');
    console.log(response.data.shortUrl);
  };

  const result = `http://localhost:8000/${shortUrl}`;


  return (
    <div className='mt-3'>
      <h1 className='text-center'>Shorten your link!</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">Enter your link</label>
          <input
            type="url"
            className="form-control"
            id="link"
            name={'link'}
            value={form.link}
            onChange={(e) => setForm({...form, link: e.target.value})}
          />
        </div>
        <button type="submit" className="btn btn-primary">Shorten!</button>
      </form>

      <hr/>

      <h3>Your link now looks like this: </h3>

      {shortUrl && <a href='#' target="_blank" rel="noreferrer">{result}</a>}
    </div>
  );
};

export default Home;