import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebApp } from 'meteor/webapp';
import { gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

(async function(){

  // schema 정의
  const typeDefs = gql`
    type Human {
      humanName: String
      blood: String
      sex: String
      age: Int
    }

    type Query {
      humans: [Human]
    }
  `

  // 정의된 schema를 실제 구동되도록 하는 resolver
  const resolvers = {
    Query: {
      async humans(_, args, context, info) {

        humanData = [
          {
            humanName: 'name_1',
            blood: 'A',
            Gender: 'male',
            age: 12
          },
          {
            humanName: 'name_2',
            blood: 'B',
            Gender: 'female',
            age: 22
          },
          {
            humanName: 'name_3',
            blood: 'O',
            Gender: 'male',
            age: 42
          },
          {
            humanName: 'name_4',
            blood: 'A',
            Gender: 'male',
            age: 32
          },                        
        ]
        return humanData;
      }
    }
  }

  // schema + resolver
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  
  // apollo server 선언
  const server = new ApolloServer({
    playground: true, // playground 사용 여부
    schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(), // playground 설정
    ],
    context: '',
  });

  // apollo server 시작
  await server.start();
  
  // 미들웨어 설정
  server.applyMiddleware({
    app: WebApp.connectHandlers,
    cors: true,
    path: '/graphql',
  });
  
})();
