import React from "react";
import PublicFooter from "./PublicFooter";
import PublicHeader from "./PublicHeader";

// This returns component is a basic landing page with no authentication

export const Public = () => {
  const content = (
    <>
      <PublicHeader />
      <main className="public__main">
        <p>This is an introduction</p>
        <address className="public__addr">
          G Tech.COM Repairs <br />
          23 Forest Hills Drive <br />
          Foo City, Cape Town 12345 <br />
          <a href="tell:+55555555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Kate Wilson</p>
      </main>
      <PublicFooter />
    </>
  );
  return content;
};

export default Public;
