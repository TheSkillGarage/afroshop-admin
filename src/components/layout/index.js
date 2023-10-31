import React from "react";


const PageLayout = ({ children }) => {

  return (
    <section>
      <div className="bg-white w-full h-full flex flex-col gap-[60px] md:gap-[80px] large-screen">{children}</div>
    </section>
  );
};

export default PageLayout;
