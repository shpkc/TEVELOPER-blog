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
            allContentfulBlog(sort: { order: DESC, fields: createdAt }) {
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

    const posts = result.data.allGhostPost.edges;
    const contentfulPosts = result.data.allContentfulBlog.nodes;

    const indexTemplate = path.resolve(`./src/templates/index.js`);
    const categoryTemplate = path.resolve(`./src/templates/category.js`);
    const aboutTemplate = path.resolve(`./src/templates/about.js`);
    const postTemplate = path.resolve(`./src/templates/post.js`);

    const defaultPages = [
        {
            title: "dev",
            category: "dev",
            slug: "dev",
            component: categoryTemplate,
        },
        {
            title: "tennis",
            category: "tennis",
            slug: "tennis",
            component: categoryTemplate,
        },
        {
            title: "about",
            category: "about",
            slug: "about",
            component: aboutTemplate,
        },
    ];

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
    defaultPages.forEach(({ title, category, slug, component }) => {
        createPage({
            path: `/${category}/`,
            component: component,
            context: {
                title,
                slug,
                category,
            },
        });
    });
};
