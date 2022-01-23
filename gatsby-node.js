const path = require(`path`);
const { postsPerPage } = require(`./src/utils/siteConfig`);
const { paginate } = require(`gatsby-awesome-pagination`);

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allContentfulBlog(sort: { order: ASC, fields: createdAt }) {
                nodes {
                    id
                    title
                    slug
                    category
                    youtube
                    category
                    createdAt
                }
            }
            allGhostPost(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                    }
                }
            }
            allGhostTag(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                    }
                }
            }
            allGhostAuthor(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                    }
                }
            }
            allGhostPage(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                        url
                    }
                }
            }
        }
    `);

    // Check for any errors
    if (result.errors) {
        throw new Error(result.errors);
    }

    // Extract query results
    const tags = result.data.allGhostTag.edges;
    const authors = result.data.allGhostAuthor.edges;
    const pages = result.data.allGhostPage.edges;
    const posts = result.data.allGhostPost.edges;
    const contentfulPosts = result.data.allContentfulBlog.nodes;

    // Load templates
    const indexTemplate = path.resolve(`./src/templates/index.js`);
    const tagsTemplate = path.resolve(`./src/templates/tag.js`);
    const authorTemplate = path.resolve(`./src/templates/author.js`);
    const pageTemplate = path.resolve(`./src/templates/page.js`);
    const postTemplate = path.resolve(`./src/templates/post.js`);

    contentfulPosts.forEach(({ title, category, slug, createdAt }) => {
        createPage({
            path: `/${category}/${slug}`,
            component: postTemplate,
            context: {
                title,
                createdAt,
                slug,
                category,
            },
        });
    });

    // Create pages
    pages.forEach(({ node }) => {
        // This part here defines, that our pages will use
        // a `/:slug/` permalink.
        node.url = `/${node.category}/${node.slug}/`;

        createPage({
            path: node.url,
            component: pageTemplate,
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                category: node.category,
                slug: node.slug,
            },
        });
    });

    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: indexTemplate,
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/`;
            } else {
                return `/page`;
            }
        },
    });

    // // Create tag pages
    // tags.forEach(({ node }) => {
    //     const totalPosts = node.postCount !== null ? node.postCount : 0;

    //     // This part here defines, that our tag pages will use
    //     // a `/tag/:slug/` permalink.
    //     const url = `/tag/${node.slug}`;

    //     const items = Array.from({ length: totalPosts });

    //     // Create pagination
    //     paginate({
    //         createPage,
    //         items: items,
    //         itemsPerPage: postsPerPage,
    //         component: tagsTemplate,
    //         pathPrefix: ({ pageNumber }) =>
    //             pageNumber === 0 ? url : `${url}/page`,
    //         context: {
    //             slug: node.slug,
    //         },
    //     });
    // });
};
