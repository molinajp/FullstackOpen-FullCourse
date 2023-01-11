var _ = require('lodash');

const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const maxLikes = blogs => blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, {});

const mostBlogs = blogs => {
  if (blogs.length !== 0) {
    var array = _(blogs)
      .countBy('author')
      .entries()
      .maxBy(_.last)
    return {
      author: array[0],
      blogs: array[1]
    }
  } else {
    return {}
  }
}

const mostLikes = blogs => {
  if (blogs.length !== 0) {
    var array =
      _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
        'author': key,
        'likes': _.sumBy(objs, 'likes') }))
      .value()
      return maxLikes(array)
  } else {
    return {}
  }
}


module.exports = {
  dummy,
  totalLikes,
  maxLikes,
  mostBlogs,
  mostLikes
}