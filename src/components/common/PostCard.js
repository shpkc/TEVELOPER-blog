import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";

const PostCard = ({ post }) => {
    return (
        <Link to={`/${post.slug}`} className="post-card">
            <header className="post-card-header">
                <div
                    className="post-card-image"
                    style={{
                        backgroundImage: `url(https://${post.thumbnail.file.url})`,
                    }}
                />
                {post.tags && (
                    <div className="post-card-tags">
                        <Tags
                            post={post}
                            visibility="public"
                            autolink={false}
                        />
                    </div>
                )}
                {post.featured && <span>Featured</span>}
                <h2 className="post-card-title">{post.title}</h2>
            </header>
            <section className="post-card-excerpt">{post.description}</section>
        </Link>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

export default PostCard;
