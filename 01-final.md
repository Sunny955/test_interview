### Code Review Transformer

Multi Tenancy <br/>
|- "Organization A" -> (has_users) -> "alpha, beta" <br/>
|- "Organization B" -> (has_users) -> "gamma"


Job: <br/>
|- Store the data into any of your favorite database locally <br />
|- Create a middleware and implement authentication  such that user (alpha & beta) can access only data of organization A & (gamma) of organization B

<br>

Test 📃 <br/>
Request API data for a specific tenant using api key based authentication <br/>
for eg: <br/>
```shell
curl --location 'localhost/getCodeReviewReport' \
--header 'Authorization: <api-key>'
```