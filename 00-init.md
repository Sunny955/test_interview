### Code Review Transformer

Job: Create a code review report using the data present in `🗂️json` folder

API Data: <br>
| - `pulls.json` (contains all the pull request) <br>
| - `reviews.json` (contains all the reviews, for eg: comments, approved etc) <br>

<br>

Output 📃

<table style="text-align: left; border: 1px solid gray">
  <tr>
    <th>Owner</th>
    <th>Repository</th>
    <th>Title</th>
    <th>Reviewers</th>
    <th>Status</th>
    <th>Head Branch</th>
    <th>Merge Date</th>
    <th>Created At</th>
  </tr>
  <tr>
    <td>gomigo-labs</td>
    <td>scrut-organizationService</td>
    <td>cherry picked to release/2.0</td>
    <td>@john, @lisa</td>
    <td>Approved</td>
    <td>release/2.0</td>
    <td>23rd Nov 2023</td>
    <td>4th Oct 2023</td>
  </tr>
  <tr>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
  </tr>
  <tr>
    <td>gomigo-labs</td>
    <td>scrut-organizationService</td>
    <td>fix(fix): package json</td>
    <td>--</td>
    <td>Commented</td>
    <td>staging</td>
    <td>--</td>
    <td>10th Sept 2023</td>
  </tr>
  <tr>
    <td>gomigo-labs</td>
    <td>scrut-organizationService</td>
    <td>feat(feat): rate limiting feature</td>
    <td>@denis</td>
    <td>open</td>
    <td>master</td>
    <td>--</td>
    <td>9th Dec 2023</td>
  </tr>
</table>
