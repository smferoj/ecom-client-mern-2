import React from 'react';
import './footer.css'
const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>Follow Us</h4>
            <ul className="list-unstyled">
              <li><a href="#" >Messenger</a></li>
              <li><a href="#">What's App</a></li>
              <li><a href="#">Utube</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <address className='address'>
                Barisal<br />
                Bangladesh<br />
              <a href="tel:+8801326771971"></a><br />
              <a href="mailto:info@smferoj.com">info@example.com</a>
            </address>
          </div>
          <div className="col-md-4">
            <h4>Subscribe</h4>
            <p>Stay updated with our latest news and offers.</p>
            <form>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-primary" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="text-center py-3 bg-secondary">
        &copy; {new Date().getFullYear()} SM Feroj. All rights reserved.
      </div>
    </footer>
   
  )
}

export default Footer