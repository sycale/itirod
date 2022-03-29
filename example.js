// example file of showing how functionality is supposed to be implemented

import GithubActions from "./ghActions";

const foo = async () => {
  const data = await GithubActions.getContributors("test", "test");

  console.log(data);
};
