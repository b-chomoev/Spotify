import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-primary'>
        <div className='container'>
          <NavLink to='/' className='text-decoration-none'><span
            className='navbar-brand mb-0 text-white fs-1'>Link Compressor</span></NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavBar;