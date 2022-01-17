import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { Layout } from "../components/common";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data }) => {
    const post = data.contentfulBlog;
    return (
        <Layout>
            <div className="container">
                <article className="content">
                    {post.feature_image ? (
                        <figure className="post-feature-image">
                            <img src={post.feature_image} alt={post.title} />
                        </figure>
                    ) : null}
                    <section className="post-full-content">
                        <h1 className="content-title">{post.title}</h1>
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
            content {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`;
