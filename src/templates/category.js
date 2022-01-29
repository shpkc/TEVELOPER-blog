import React from "react";
import { graphql } from "gatsby";
import { Layout, PostCard } from "../components/common";
import { Helmet } from "react-helmet";

const Category = ({ data }) => {
    const posts = data.allContentfulBlog.nodes;
    console.log(posts);

    return (
        <>
            <Layout isHome={true}>
                <Helmet title="dev | teveloper" />
                <div className="container">
                    <section className="post-feed">
                        {posts.map((item) => (
                            <PostCard key={item.id} post={item} />
                        ))}
                    </section>
                </div>
            </Layout>
        </>
    );
};

export default Category;

export const categoryQuery = graphql`
    query CategoryQuery($category: String!) {
        allContentfulBlog(filter: { category: { eq: $category } }) {
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
    }
`;
