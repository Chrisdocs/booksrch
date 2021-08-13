const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {

        books: async (parent, { title }) => {
            const params = title ? { title } : {}
            return Book.find(params).sort({})
        },
        book: async (parent, { bookId }) => {
            return Book.findOne({ bookId })
        },

        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('savedBooks')
        },
        //find one user
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('savedBooks')
        }
    }

};

module.exports = resolvers;