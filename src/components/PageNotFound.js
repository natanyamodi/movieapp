import React from "react";
import "./CSS/PagenotFound.css";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Page not found!</h3>
                  <Link to="/" className="box__button">
                    Go back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
