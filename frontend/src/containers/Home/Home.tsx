import React, { useState } from 'react';
import axiosApi from '../../axiosApi';
import { toast } from 'react-toastify';

interface Link {
  shortUrl: string;
  originalUrl: string;
}

const Home = () => {
  const [form, setForm] = useState<string>('');
  const [data, setData] = useState<Link | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response: {data: Link} = await axiosApi.post('/links', {originalUrl: form});
    setData(response.data || null);
    toast.success('Link was successfully shortened!');
    console.log(response.data);
  };

  return (
    <div className='mt-3'>
      <h1 className='text-center'>Shorten your link!</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">Enter your link</label>
          <input
            className="form-control"
            value={form}
            onChange={(e) => setForm(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Shorten!</button>
      </form>

      <hr/>

      {data ?

        <>
          <h3>Your link now looks like this: </h3>
          <a target='_blank' href={`http://localhost:8000/links/${data.shortUrl}`}>
            {`http://localhost:8000/links/${data.shortUrl}`}
          </a>
        </>
        :
        null
      }
    </div>
  );
};

export default Home;