import { gql } from 'apollo-server';

const typeDefs = gql`

  type Post {
    _id: ID
    title: String
    userId: ID
    categoryId: ID
    tagsIds: [ID]
    user: User
    category: Category
    tags: [Tag]
    comments(limit: Int): [Comment]
  }

  type Comment {
    _id: ID
    text: String
    user: User
    post: Post
    userId: ID
    postId: ID
  }

  type Category {
    _id: ID
    name: String
    posts: [Post]
  }

  type Group {
    _id: ID
    name: String
    users: [User]
  }

  type User {
    _id: ID
    username: String
    email: String
    groupsIds: [ID]
    groups: [Group]
    posts: [Post]
    comments: [Comment]
  }

  type Tag {
    _id: ID
    name: String
    posts: [Post]
  }

  type Query {
    users: [User]
    posts(limit: Int): [Post]
    comments(skip: Int, limit: Int, text: String): [Comment]
  }

  type Mutation {
    addPost(title: String): ID
  }

`

export default typeDefs;