import { Mongo } from 'meteor/mongo';

// board  collections
const Posts = new Mongo.Collection('post');
const Comments = new Mongo.Collection('comment');
const Categoies = new Mongo.Collection('category');
const Groups = new Mongo.Collection('group');
const Tags = new Mongo.Collection('tag');

// human collections
const Humans = new Mongo.Collection('ex_1_human');
const Schools = new Mongo.Collection('ex_1_Schools');
const Workers = new Mongo.Collection('ex_1_worker');
const Belongs = new Mongo.Collection('ex_1_belong');
const Hobbies = new Mongo.Collection('ex_1_hobby');

export {
  Posts,
  Comments,
  Categoies,
  Groups,
  Tags,

  Humans,
  Schools,
  Workers,
  Belongs,
  Hobbies,
}