import '../../assets/styles/footer.css'

export const Footer = () => {
    return(
        <footer className="footer">
          <div className="copyright d-flex flex-row align-items-start justify-content-center">
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with{" "}
                  <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
                  <a href="https://colorlib.com" target="_blank">
                    Colorlib
                  </a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </div>
    </footer>
    );
}