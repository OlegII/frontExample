import React from "react";
import { MenuHideShow } from "./FirstPage";
import { Link } from "react-router-dom";

export const MenuHide = () => (
  <div>
    <MenuHideShow>
      <div>
        <p>
          <Link className="react-link" to="/signupform">
            Sign Up
          </Link>
        </p>

        {/*<p>
          <Link className="react-link" to="/alluserdata">
            Data
          </Link>
        </p>*/}

        <p>
          <Link className="react-link" to="/signin">
            Sign In
          </Link>
        </p>

          <p>
              <Link className="react-link" to="/editform">
                  Edit Form
              </Link>
          </p>
      </div>
    </MenuHideShow>
  </div>
);
