import { Posts, Comments, Categoies, Groups, Tags  } from '../collections';

let count_ = 0;

export default {

  Query: {
    async posts(_, {_id}, context, info) {
      count_ = 0;
  
      let filters = {};
  
      if(_id) filters = {_id};
  
      console.log('posts query' + count_++)
      return await Posts.find(filters).fetch();
    },
    async users() {
      return await Meteor.users.find().fetch();
    },
  },
  Post: {
    async comments(parent, args, context, info) {
      console.log('posts query' + count_++)
      console.log(`comment parent: ${JSON.stringify(parent)}`);
      return await Comments.find({postId: parent._id}).fetch();
    },
    async user(parent, args, context, info) {
      console.log('posts query' + count_++)
      return await Meteor.users.findOne(parent.userId);
    },
    async tags(parent, args, context, info) {
      // console.log(`tags parent : ${JSON.stringify(parent)}`)
      // return Tags.find({_id: { $in: [parent.tagsIds]}}).fetch();
      console.log('posts query' + count_++)
      return await Tags.find({_id: { $in: parent.tagsIds}}).fetch();
    },
    async category(parent, args, context, info) {
      console.log('posts query' + count_++)
      return await Categoies.findOne(parent.categoryId);
    },
  },  
  Comment: {
    async user(parent, args, context, info) {
      console.log('posts query' + count_++)
      return await Meteor.users.findOne(parent.userId);
    },
    async post(parent, args, context, info) {
      console.log('posts query' + count_++)
      return await Posts.findOne(parent.postId);
    }
  },
  User: {
    async groups(parent, args, context, info) {
      console.log('posts query' + count_++)
      return await Groups.find({_id: {$in: parent.groupsIds}}).fetch();
    },
    async posts(parent, args, context, info) {
      console.log('posts query' + count_++)
      return await Posts.find({userId: parent._id}).fetch();
    },
    async comments(parent, args, context, info) {
        console.log('posts query' + count_++)
        return await Comments.find({userId: parent._id}).fetch();
    }
  },
  Group: {
    async users(parent, args, context, info) {
      console.log('posts query' + count_++)
      return await Meteor.users.find({groupIds: {$in: parent._id}}).fetch();
    },
  },  
  Tag: {
    async posts(parent, args, context, info) {
      console.log('posts query' + count_++)
      return await Posts.find({tagIds: {$in: [parent._id]}}).fetch();
    },
  },
  Category: {
    async posts(parent, args, context, info) {
      console.log('posts query' + count_++)
      return await Posts.find({categoryId: parent._id}).fetch();
    },
  },
  Group: {
    async users(parent, args, context, info) {
      console.log('posts query' + count_++)
      return await Meteor.users.find({groupIds: {$in: parent._id}}).fetch();
    },
  },

  Mutation: {
    addPost() {
      return;
    }
  } 
}

// const resolvers = {
//   Query: queries,
//   Mutation: mutations,
// }

// export default resolvers;