import Api from "./api";

export default class GithubActions extends Api {
  static getContributors(owner, repo) {
    const path = `https://api.github.com/repos/${owner}/${repo}/contributors`;

    return this.fetchGetRequest(path);
  }

  static getUserInfo(userId) {
    const path = `https://api.github.com/users/${userId}`;

    return this.fetchGetRequest(path);
  }

  static getRepoComits(owner, repo) {
    const path = `https://api.github.com/repos/${owner}/${repo}/commits`;

    return this.fetchGetRequest(path);
  }

  static createCommitComment(owner, repo, commitSHA, body) {
    const path = `  https://api.github.com/repos/${owner}/${repo}/commits/${commitSHA}/comments`;

    return this.fetchPostRequest(path, body);
  }
}
