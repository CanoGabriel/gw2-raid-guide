import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";
import Header from "../header/header";
import "./page.scss";

const Page = (props) => {
  const { className, children, showHeader = true } = props;

  return (
    <div className="page">
      {showHeader && <Header className="page__header" />}
      <main className={classnames("page__content", className)}>{children}</main>

      <div>
        Icons made by
        <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a>
        {" "}
        from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
      <div>
        Icons made by
        <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a>
        {" "}
        from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
    </div>
  );
};

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType(PropTypes.arrayOf(PropTypes.node), PropTypes.node),
  showHeader: PropTypes.bool,
};

export default Page;
