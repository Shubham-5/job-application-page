import "./Footer.css";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-text'>
        <p>
          <a href='#'>Render Home Page</a>
        </p>

        <a href='#' className='footer-logo-container'>
          <span>Jobs powered by</span>
          <img src='https://jobs.lever.co/img/lever-logo-full.svg' alt='logo' />
        </a>
      </div>
    </div>
  );
};

export default Footer;
