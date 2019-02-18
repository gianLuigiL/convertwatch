import React from 'react';
import "./app_footer.scss"

export default function AppFooter() {
  return (
    <footer className="flex_r_wrap justify_center">
      <div className="social">
        
      </div>
      <div className="content">
          Made in the UK with <span role="img" aria-label="love">❤️</span> by <a href="https://gianluigilamera.com">Gian Luigi Lamera</a>
          <ul>
              <li><a href="/">About page</a></li>
          </ul>
      </div>
    </footer>
  )
}
