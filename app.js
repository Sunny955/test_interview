const tenantA_pulls = require("./json/tenantA/pulls.json");
const tenantA_reviews = require("./json/tenantA/reviews.json");

const tenantB_pulls = require("./json/tenantB/pulls.json");
const tenantB_reviews = require("./json/tenantB/reviews.json");

let tenantA_output = [];
let tenantB_output = [];

tenantA_pulls.forEach((data) => {
  let obj = {};
  obj["owner"] = data.head.repo.owner.login;
  obj["repository"] = data.head.repo.owner.url;
  obj["title"] = data.title;
  const repo_url = data.url;
  let reviewers = "";
  let status = "";
  tenantA_reviews.forEach((review) => {
    review.forEach((r) => {
      if (r.pull_request_url === repo_url) {
        reviewers += r.user.login;
      }
    });
    let len = review.length;
    status = review[len - 1].state;
  });
  obj["reviewers"] = reviewers;
  obj["status"] = status;
  obj["head_branch"] = data.head.ref;
  obj["merge_date"] = data.merged_at;
  obj["createdAt"] = data.created_at;
  tenantA_output.push(obj);
});

tenantB_pulls.forEach((data) => {
  let obj = {};
  obj["owner"] = data.head.repo.owner.login;
  obj["repository"] = data.head.repo.owner.url;
  obj["title"] = data.title;
  const repo_url = data.url;
  let reviewers = "";
  let status = "";
  tenantB_reviews.forEach((review) => {
    review.forEach((r) => {
      if (r.pull_request_url === repo_url) {
        reviewers += r.user.login;
      }
    });
    let len = review.length;
    status = review[len - 1].state;
  });
  obj["reviewers"] = reviewers;
  obj["status"] = status;
  obj["head_branch"] = data.head.ref;
  obj["merge_date"] = data.merged_at;
  obj["createdAt"] = data.created_at;
  tenantB_output.push(obj);
});

console.log(tenantA_output.length);
console.log(tenantB_output.length);
