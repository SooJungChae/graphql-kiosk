import { Posts, Comments, Categoies, Groups, Tags } from '../collections';
import { query, addLinks, manyToOne, oneToOne, manyToMany, oneToMany } from '@bluelibs/nova';

const postRaw = Posts.rawCollection();
const commentRaw = Comments.rawCollection();
const categoryRaw = Categoies.rawCollection();
const groupRaw = Groups.rawCollection();
const tagRaw = Tags.rawCollection();
const userRaw = Meteor.users.rawCollection();

// addLinks(postRaw,  {
//   comments: {
//     collection: () => commentRaw,
//     inversedBy: "post"
//   }
// });

// addLinks(commentRaw, {
//   post: {
//     collection: () => postRaw,
//     field: 'postId'
//   }
// });

manyToOne(commentRaw, postRaw, {
  linkName: 'post',
  inversedLinkName: 'comments',
});

oneToOne(postRaw, categoryRaw, {
  linkName: 'category',
  inversedLinkName: 'post',
});

manyToMany(postRaw, tagRaw, {
  linkName: 'tags',
  inversedLinkName: 'posts',
  // field will be `tagsIds`
});

manyToOne(postRaw, userRaw, {
  linkName: 'user',
  inversedLinkName: 'posts'
})

// addLinks(userRaw,  {
//   posts: {
//     collection: () => postRaw,
//     inversedBy: 'user'
//   }
// });

// addLinks(postRaw, {
//   user: {
//     collection: () => userRaw,
//     field:'userId'
//   }
// });


manyToMany(userRaw, groupRaw, {
  linkName: 'groups',
  inversedLinkName: 'users'
});

oneToOne(commentRaw, userRaw, {
  linkName: 'user',
  inversedLinkName: 'comments'
});

const queries = {
  async posts(_, args, context, info) {
    const postLimit = Number(args.limit);

    // return query.graphql(postRaw, info, {}).fetch();
    return await query.graphql(postRaw, info, {
      embody(body, args) {

        const commentsLimit = Number(args('posts.comments').limit);
        // console.log(`commentLimit: ${commentsLimit}`);
        
        if(postLimit) {
          body.$ = {
            options: {
              limit: postLimit
            }
          }
        }

        if(commentsLimit) {
          console.log(`commentsLimit: ${commentsLimit}`);
          body.comments.$ = {
            options: {
              limit: commentsLimit
            }
          }
        }
      }
    }).fetch();
  },
  async comments(_, args, context, info) {

    let setfilters = {}
    let setOptions = {}

    if(args.text) setfilters.text = RegExp(args.text);
    if(args.limit) setOptions.limit = args.limit;
    if(args.skip) setOptions.skip = args.skip;

    return await query.graphql(commentRaw, info, {
      embody(body, args) {
        body.$ = {
          filters: setfilters,
          options: setOptions
        }
      }
    }).fetch();
  }
}

const mutations = {
  async addPost() {
    return;
  }
}

const resolvers = {
  Query: queries,
  Mutation: mutations
}

export default resolvers;