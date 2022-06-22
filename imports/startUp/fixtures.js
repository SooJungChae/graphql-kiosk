import { Posts, Comments, Categoies, Groups, Tags, Humans, Belongs, Schools, Workers, Hobbies } from '/imports/api/collections';
import { Accounts } from 'meteor/accounts-base';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';

const USERS = 10;
const POST_PER_USER = 20;
const COMMENTS_PER_POST = 20;

const GROUPS = ['Admins', 'Super Users', 'Apollo Masters', 'Other'];
const TAGS = [
  'graphql-performance',
  'graphql-tools',
  'apollo-new',
  'destroy-the-world',
];
const POST_CATEGORIES = ['JavaScript', 'Meteor', 'React', 'Other'];
const COMMENT_TEXT_SAMPLES = ['Good', 'Bad', 'Neutral'];

const createUser = (email, password) => {
  const userId = Accounts.createUser({ email, password });
  return userId;
};

Meteor.setTimeout(() => {
  if (Meteor.users.find().count() > 0) {
    return;
  }

  console.log('[ok] now started to load fixtures, patience padawan!');

  // let tags = TAGS.map(name => db.tags.insert({ name }));
  let tags = _.map(TAGS, name => Tags.insert({ name }));
  
  let groups = GROUPS.map(name => Groups.insert({ name })); // map은 각각의 id로 됩
  let categories = POST_CATEGORIES.map(name =>
    Categoies.insert({ name })
  );

  console.log('tags' + tags[0])

  let users = [];
  _.each(_.range(USERS), idx => {
    users.push(createUser(`user-${uuid()}@app.com`, '12345'));
  });
   
    // users = userID 집합

  let countCheck = 0

  _.each(users, user => {

    countCheck = countCheck++ 

    Meteor.users.update(
      {_id: user},
      {$set: {groupsIds: [_.sample(groups), _.sample(groups)] }}
    )

    _.each(_.range(POST_PER_USER), idx => {
      let post = {
        title: `User Post - ${idx}`,
        tagsIds: [_.sample(tags), _.sample(tags)],
        userId: _.sample(users),
        categoryId: _.sample(categories),
      };
      
      // userPostLink.add(post);
      const getPostId = Posts.insert(post);

      _.each(_.range(COMMENTS_PER_POST), idx => {
        let comment = {
          postId: getPostId,
          userId: _.sample(users),
          text: _.sample(COMMENT_TEXT_SAMPLES),
        };

        // postCommentsLink.add(comment); // comment 추가
        Comments.insert(comment);

      });
    });
  });

  console.log('[ok] fixtures have been loaded.');
}, 2000);

/**
 * 두번째 데이터
 */

// const name = [];
const HUMAN_COUNT = 20;
const blood = ['A', 'B', 'AB', 'O'];
const gender = ['male', 'female'];
const age = [12, 20, 22, 30, 35, 37, 41 ];
const phone = '0100000000';
const hobbyData = ['piano', 'game', 'soccer', 'tv', 'drawing'];

const belongData = [
  {
    "humanType": "student",
    "name": "history",
    "location": "Jeju"
  },
  {
    "humanType": "student",
    "name": "science",
    "location": "Gangu"
  },
  {
    "humanType": "student",
    "name": "mathematics",
    "location": "Jeju"
  },
  {
    "humanType": "jobSkill",
    "name": "cook"
  },
  {
    "humanType": "worker",
    "name": "programer"
  },
  {
    "humanType": "worker",
    "name": "teacher"
  },
  {
    "humanType": "worker",
    "name": "doctor"
  }  
]

Meteor.setTimeout(() => {

  if (Humans.find().count() > 0) {
    return;
  }

  let belongs = [];
  belongData
    .map(belongData => {
      let belongId = Belongs.insert(belongData);
      belongs.push(belongId);
    });

  belongData
    .filter(data => data.humanType === 'worker')
    .map(worker => {
      workerId = Workers.insert(worker);
    });

  let schoolIds = []
  belongData
    .filter(data => data.humanType === 'student')
    .map(school => {
      const studentId = Schools.insert(school);
      schoolIds.push(studentId);
    });

  let hobbyIds = []
  hobbyData
    .map(hobby => { 
      hobbyValue = {'hobbyName': hobby}
      const hobbyId = Hobbies.insert(hobbyValue);
      hobbyIds.push(hobbyId);
    });

  _.each(_.range(HUMAN_COUNT), idx => {
    let humanValue = {
      humanName: `name_${idx}`,
      blood: _.sample(blood),
      gender: _.sample(gender),
      age: _.sample(age),
      phone: `${phone}${idx}`,
      belongToId: _.sample(belongs),
      schoolId: _.sample(schoolIds),
      hobbyIds: [ _.sample(hobbyIds), _.sample(hobbyIds)],
    }

    Humans.insert(humanValue);
  });

}, 2000);