// const config = {
// 	s3: {
// 		REGION: "us-east-1",
// 		BUCKET: "file-upload-notes-app",
// 	},
// 	apiGateway: {
// 		REGION: "us-east-1",
// 		URL: "https://px8x2yeq79.execute-api.us-east-1.amazonaws.com/prod",
// 	},
// 	cognito: {
// 		REGION: "us-east-1",
// 		USER_POOL_ID: "us-east-1_ASW9vvyjZ",
// 		APP_CLIENT_ID: "170p6khmgd6evn4ft2o0paltaa",
// 		IDENTITY_POOL_ID: "us-east-1:4a7bd94e-3cb8-417e-9621-4f61142a59a2",
// 	},
// 	MAX_ATTACHMENT_SIZE: 5000000,
// 	STRIPE_KEY:
// 		"pk_test_51IehmtFYrYnTv4T12tASNnPKh6h4UxLhRfNGlZDxnStwEKuScTPAWMXclyVrACkMS8L3KZNmE9w28afjUjYYyxf3002DtzGy71",
// };

// export default config;

const dev = {
  STRIPE_KEY: "pk_test_51IehmtFYrYnTv4T12tASNnPKh6h4UxLhRfNGlZDxnStwEKuScTPAWMXclyVrACkMS8L3KZNmE9w28afjUjYYyxf3002DtzGy71",
  s3: {
    REGION: "us-east-1",
    BUCKET: "dev-notes-infra-s3-uploads4f6eb0fd-177jc44xei8ob"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://jmt7i9z4fb.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_lIcQx32GV",
    APP_CLIENT_ID: "75tv4gtdt9dirbmb5prkd2ho40",
    IDENTITY_POOL_ID: "us-east-1:9a86a8c3-38ec-4045-aabe-787d5e84f7de"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_51IehmtFYrYnTv4T12tASNnPKh6h4UxLhRfNGlZDxnStwEKuScTPAWMXclyVrACkMS8L3KZNmE9w28afjUjYYyxf3002DtzGy71",
  s3: {
    REGION: "us-east-1",
    BUCKET: "prod-notes-infra-s3-uploads4f6eb0fd-kqbt7bmbdwwr"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://px8x2yeq79.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_RCBD4zlhj",
    APP_CLIENT_ID: "mpg3829v0dluts7crtjifsnr0",
    IDENTITY_POOL_ID: "us-east-1:749471c0-390c-4456-95d7-961ec4f7d3c0"
  }
};

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;
