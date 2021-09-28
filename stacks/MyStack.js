import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      routes: {
        "GET /private": "src/private.handler",
      },
    });

    const auth = new sst.Auth(this, "Auth", {
      cognito: {
        userPool: {
          // Users will login using their email and password
          signInAliases: { email: true, phone: true },
        },
      },
      facebook: { appId: "253494680026526" },
    });
    const site = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
      // Pass in our environment variables
      environment: {
        REACT_APP_API_URL: api.url,
        REACT_APP_REGION: scope.region,
        REACT_APP_USER_POOL_ID: auth.cognitoUserPool.userPoolId,
        REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
        REACT_APP_USER_POOL_CLIENT_ID:
          auth.cognitoUserPoolClient.userPoolClientId,
      },
    });
    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
      IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
      UserPoolId: auth.cognitoUserPool.userPoolId,
      UserPoolClientId: auth.cognitoUserPoolClient.userPoolClientId,
      SiteUrl: site.url,
    });

    // Allow auth users to access the API
    auth.attachPermissionsForAuthUsers([api]);
  }
}
