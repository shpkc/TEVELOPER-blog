import React from "react";
import { graphql } from "gatsby";
import { Layout, PostCard } from "../components/common";
import { Helmet } from "react-helmet";

const About = ({ data }) => {
    console.log(data);
    const post = data.contentfulBlog;

    return (
        <Layout>
            <Helmet title="about | teveloper" />
            <div className="container">
                <article className="content">
                    <section className="post-full-content">
                        <h1 className="about-title">
                            반갑습니다.
                            <br />
                            테니스를 사랑하는 개발자, 박시형 입니다.
                        </h1>
                        {post.youtube && (
                            <div class="video-container">
                                <iframe
                                    width="600"
                                    height="346"
                                    src={`https://www.youtube.com/embed/${post.youtube}`}
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                />
                            </div>
                        )}
                        <section
                            className="content-body load-external-scripts"
                            dangerouslySetInnerHTML={{
                                __html: post.content.childMarkdownRemark.html,
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
        contentfulBlog(slug: { eq: "about" }) {
            id
            slug
            title
            youtube
            content {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`;
