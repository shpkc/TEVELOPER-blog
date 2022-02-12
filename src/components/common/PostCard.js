import React from "react";
import { Link } from "gatsby";

const PostCard = ({ post }) => {
    return (
        <Link to={`/${post.category}/${post.slug}`} className="post-card">
            <header className="post-card-header">
                <div
                    className="post-card-image"
                    style={{
                        backgroundImage: `url(https://${post.thumbnail.file.url})`,
                    }}
                />
                <h2 className="post-card-title">{post.title}</h2>
            </header>
            <section className="post-card-excerpt">{post.description}</section>
        </Link>
    );
};

export default PostCard;
