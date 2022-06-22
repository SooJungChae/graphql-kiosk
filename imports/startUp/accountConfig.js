// import { userId } from 'meteor-apollo-accounts/client';
import { Accounts } from 'meteor/accounts-base';


Accounts.onCreateUser((options, user) => {

  console.log(`options: ${options}`);
  console.log(`user: ${user}`);

  if(options.email === 'admin@admin.com') {
    user.profile = options.profile ? options.profile : {};
    user.profile = options.profile;
  } else {
    user.profile = options.profile ? options.profile : {};
    user.profile.role = 'user';
  }

  return user;
  
});
