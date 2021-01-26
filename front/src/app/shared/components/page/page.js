import React from "react";
import classnames from "classnames/dedupe";
import Header from "../header/header";
import "./page.scss";

const Page = (props) => {
  const { className, children, showHeader = true } = props;

  return (
    <div className="page">
      {showHeader && <Header className="page__header" />}
      <main className={classnames("page__content", className)}>{children}</main>
    </div>
  );
};

export default Page;
