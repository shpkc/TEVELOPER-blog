import React from "react";
import { graphql } from "gatsby";
import { Layout, PostCard } from "../components/common";
import { Helmet } from "react-helmet";

const About = ({ data }) => {
    const about = data.contentfulAbout;

    return (
        <Layout>
            <Helmet title="about | teveloper" />
            <div className="container">
                <article className="content">
                    <section className="post-full-content">
                        <br />
                        <h1 className="about-title">
                            반갑습니다.
                            <br />
                            프론트엔드 개발자
                            <br />
                            박시형 입니다.
                        </h1>
                        <section
                            className="content-body load-external-scripts"
                            dangerouslySetInnerHTML={{
                                __html: about.content.childMarkdownRemark.html,
                            }}
                        />
                    </section>
                </article>
            </div>
        </Layout>
    );
};

export default About;

export const aboutQuery = graphql`
    query AboutQuery {
        contentfulAbout(title: { eq: "about" }) {
            id
            title
            slug
            content {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`;
