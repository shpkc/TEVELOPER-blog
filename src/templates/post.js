import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { Layout } from "../components/common";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

const Post = ({ data }) => {
    const post = data.contentfulBlog;

    return (
        <Layout>
            <Helmet title={`${post.title} | teveloper`} defer={false} />
            <div className="container">
                <article className="content">
                    {post.feature_image ? (
                        <figure className="post-feature-image">
                            <img src={post.feature_image} alt={post.title} />
                        </figure>
                    ) : null}
                    <section className="post-full-content">
                        <h1 className="content-title">{post.title}</h1>
                        <p className="content-createdAt">
                            {post.createdAt.slice(0, 10).replace(/-/gi, ".")}
                        </p>
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

export default Post;

export const postQuery = graphql`
    query MyQuery($slug: String!) {
        contentfulBlog(slug: { eq: $slug }) {
            id
            slug
            title
            youtube
            createdAt
            content {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`;
