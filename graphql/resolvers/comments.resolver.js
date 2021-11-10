const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/post.model');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Mutation: {
    // Create Comment Resolver
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty!',
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        // Add comment to the top
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },

    // Delete Comment Resolver
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        const commentIdx = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIdx].username === username) {
          post.comments.splice(commentIdx, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action Forbidden!');
        }
      } else throw new UserInputError('Post not found');
    },
  },
};
