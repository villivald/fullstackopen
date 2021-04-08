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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
