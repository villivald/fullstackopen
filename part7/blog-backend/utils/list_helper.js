var _ = require("lodash");

const dummy = (blogs) => {
  if (blogs) {
    return 1;
  } else {
    return 1;
  }
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current;
  }, 0);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let result = _.countBy(blogs, "author");
  const sortedBlogs = Object.values(result).sort((a, b) => b - a);
  const sortedResult = Object.keys(result).sort(
    (a, b) => result[b] - result[a]
  );
  const mostBlogsObject = { author: sortedResult[0], blogs: sortedBlogs[0] };
  return mostBlogsObject;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const reducer = (acc, blog) => {
    return !acc[blog.author]
      ? { ...acc, [blog.author]: blog.likes }
      : { ...acc, [blog.author]: acc[blog.author] + blog.likes };
  };

  const likes = _.reduce(blogs, reducer, {});
  const mostLikedAuthor = Object.keys(likes).sort(
    (a, b) => likes[b] - likes[a]
  )[0];

  const mostLikesObject = {
    author: mostLikedAuthor,
    likes: likes[mostLikedAuthor],
  };

  return mostLikesObject;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
