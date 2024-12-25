import React, { useState } from 'react';

const initialState = {
  link: '',
}

const Home = () => {
  const [form, setForm] = useState(initialState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

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

    </div>
  );
};

export default Home;