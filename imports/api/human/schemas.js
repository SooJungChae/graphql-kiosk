import { gql } from 'apollo-server'

const typeDefs = gql`

  enum Blood { # enum으로 설정한 후 해당하는 값이 아닌 값이 있으면 query시 오류 발생
    A
    B
    O
    AB
  }

  type Human {
    humanName: String
    blood: Blood
    gender: String
    age: Int
    phone: String
    school: School
    # belognTo: BelongTo
    hobbies: [Hobby]
  }

  input HumanInput {
    humanName: String
    blood: String
    gender: String
    age: Int
    phone: String
  }

  type Person {
    _id: ID
    humanName: String
    blood: String
    gender: String
    age: Int
    phone: String
  }

  # fragment HumanInfo on Person { flagment는 ㄴschema에서 정의 안됨 이건 frontend에서 따로 정의해 사용해야 함.
  #   blood
  #   sex
  #   age
  #   phone
  # }

  type Hobby {
    _id: ID
    hobbyName: String
  }

  union BelongTo = School | Worker

  interface TypeCommon {
    _id: ID
    name: String
  }

  type Worker implements TypeCommon {
    _id: ID
    name: String
    humanType: String
  }

  type School implements TypeCommon {
    _id: ID
    name: String
    humanType: String
    location: String
  }

  # fragment HumanInfo on Human {
  #   humanName: String
  #   blood: String
  #   sex: String
  #   age: Int
  #   phone: String
  # }

  extend type Query {
    humans: [Human]
    belongs: [BelongTo]
    people: [Person]
    schools: [School]
    wrokers: [Worker]
  }

  extend type Mutation {
    addHuman(input: HumanInput) : ID
    addPerson(humanName: String, blood: String, age: Int, gender: String, phone: String): Person
  }

  type Subscription {
    personAdded: Person
  }
` 
export default typeDefs;