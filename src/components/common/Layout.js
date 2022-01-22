import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import { BsInstagram } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";

import "../../styles/app.css";

const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;
    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>
            <div className="viewport">
                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header
                        className="site-head"
                        style={{
                            ...(site.cover_image && {
                                backgroundImage: `url("/images/main.jpeg")`,
                            }),
                        }}
                    >
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left"></div>
                                <div className="site-mast-right">
                                    <a
                                        href="https://www.instagram.com/tevelop_tennis/"
                                        className="site-nav-item"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <BsInstagram color="white" size={20} />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/%EC%8B%9C%ED%98%95-%EB%B0%95-1a8805211/"
                                        className="site-nav-item"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <SiLinkedin color="white" size={20} />
                                    </a>
                                </div>
                            </div>
                            {isHome ? (
                                <div className="site-banner">
                                    <h1 className="site-banner-title">
                                        테니스 치는 개발자
                                    </h1>
                                    <p className="site-banner-desc">
                                        TEVELOPER
                                    </p>
                                </div>
                            ) : null}
                            <nav className="site-nav">
                                <div className="site-nav-left">
                                    <a class="site-nav-item" href="/dev">
                                        Dev
                                    </a>
                                    <a class="site-nav-item" href="/tennis">
                                        Tennis
                                    </a>
                                </div>
                                <div className="site-nav-right">
                                    <Link
                                        className="site-nav-button"
                                        to="/about"
                                    >
                                        About
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>
                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">© 2022 Teveloper</Link>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
            }
        `}
        render={(data) => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
