import React from "react";
import PublicFooter from "./PublicFooter";
import PublicHeader from "./PublicHeader";

// This returns component is a basic landing page with no authentication

export const Public = () => {
  const content = (
    <>
      <PublicHeader />
      <main className="public__main">
        {/* admin login details, this is only here for code reviewer testing this application */}
        <div className="login-details">
          <p style={{ color: "rgb(202, 26, 26" }}>
            Only managers and admin users can create employee users, for testing
            please use details below to login!!!
          </p>
          <span>username: admin</span>
          <span>password: 123456</span>
          <span>☑️ check trust this device to avoid being kicked out</span>
        </div>
        {/* employee login details, this is only here for code reviewer testing this application  */}
        <div className="login-details">
          <p style={{ color: "rgb(202, 26, 26" }}>
            To login as an employee use login details below or create an
            employee user logged in as an admin user!!!
          </p>
          <span>username: username</span>
          <span>password: 123456</span>
          <span>☑️ check trust this device to avoid being kicked out</span>
        </div>
        <address className="public__addr">
          G Tech.COM Repairs <br />
          23 Forest Hills Drive <br />
          Foo City, Cape Town 12345 <br />
          <a href="tell:+55555555555555">(555) 555-5555</a>
        </address>
      </main>
      <PublicFooter />
    </>
  );
  return content;
};

export default Public;
