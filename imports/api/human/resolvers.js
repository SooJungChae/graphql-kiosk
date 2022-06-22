import { Humans, Schools, Workers, Hobbies } from '../collections';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub;

export default {
  Mutation: {
    async addHuman(_, args, context, info) {
      const humanValue = {
        humanName: args.input.humanName,
        blood: args.input.blood,
        gender: args.input.gender,
        age: Number(args.input.age),
        phone: args.input.phone
      }

      try {
        const humanId = await Humans.insert(humanValue);
        return humanId;
      }
      catch(error) {
        throw `Human Error: ${error}`;
      }
      
    },
    async addPerson(_, args, context, info) {
      const personValue = {
        humanName: args.humanName,
        blood: args.blood,
        gender: args.gender,
        age: Number(args.age),
        phone: args.phone
      }

      try {
        const humanId = await Humans.insert(personValue);
        personValue._id = humanId
        await pubsub.publish('PERSON_ADDED', {personAdded: personValue});
        return personValue;
      }
      catch(error) {
        throw `Human Error: ${error}`;
      }
    }
  },
  Query: {
    async humans(parent, args, context, info) {
      return await Humans.find().fetch();
      // return query.graphql(humanRaw, info, {}).fetch();
    },
    async belongs(_, args, context, info) {
      const workers = await Workers.find().fetch();
      const schools = await Schools.find().fetch();

      const belongs = [
        ...workers,
        ...schools,
      ]
      return belongs;
    },
    async schools(_, args, context, info) {
      return await Schools.find().fetch();
    },
    async wrokers(_, args, context, info) {
      return await Workers.find().fetch();
    },
    async people(_, args, context, info) {
      return await Humans.find().fetch();
    }
  },
  Human: {
    async school(parent, args, context, info) {
      return await Schools.findOne(parent.schoolId);
    },
    // belognTo(parent, args, context, info) {
    //   return Schools.findOne(parent.studentId);
    // },
    async hobbies(parent, args, context, info) {
      return await Hobbies.find({_id: {$in: parent.hobbyIds}}).fetch();
    }
  },
  BelongTo: { // BelongTo = School | Worker
    __resolveType(parent, contest, info) {
      
      // console.log(`Belong Parent: ${JSON.stringify(parent) }`)
      
      if(parent.humanType === 'worker') {
        return 'Worker'
      }
      if(parent.humanType === 'student') {
        return 'School'
      }

      // return null;
    }
  },  
  Subscription: {
    personAdded: {
      subscribe: async () => {
        // return pubsub.asyncIterator('PERSON_ADDED');
        return await pubsub.asyncIterator(['PERSON_ADDED']);
      }
    }
  }
}