import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { Helmet } from "react-helmet";

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
    const posts = data.allContentfulBlog.nodes;

    return (
        <>
            <Layout isHome={true}>
                <Helmet
                    meta={[
                        {
                            property: "title",
                            content: "테니스 치는 개발자 | teveloper",
                        },
                        {
                            property: "og:image",
                            content:
                                "https://images.unsplash.com/photo-1601646761285-65bfa67cd7a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                        },
                    ]}
                />
                <div className="container">
                    <section className="post-feed">
                        {posts.map((item) => (
                            <PostCard key={item.id} post={item} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    );
};

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
    query GhostPostQuery($limit: Int!, $skip: Int!) {
        allContentfulBlog(sort: { order: DESC, fields: createdAt }) {
            nodes {
                id
                title
                description
                slug
                category
                youtube
                thumbnail {
                    id
                    file {
                        url
                    }
                }
            }
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
