import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Layout, PostCard, Pagination } from "../components/common";
import { Head } from "../components/head";

const Index = ({ data, pageContext }) => {
    const posts = data.allContentfulBlog.nodes;

    return (
        <>
            <Layout isHome={true}>
                <Head title={"테니스 치는 개발자"} />
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

export default Index;

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
