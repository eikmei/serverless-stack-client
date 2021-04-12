const config = {
	s3: {
		REGION: "us-east-1",
		BUCKET: "file-upload-notes-app",
	},
	apiGateway: {
		REGION: "us-east-1",
		URL: "https://px8x2yeq79.execute-api.us-east-1.amazonaws.com/prod",
	},
	cognito: {
		REGION: "us-east-1",
		USER_POOL_ID: "us-east-1_ASW9vvyjZ",
		APP_CLIENT_ID: "170p6khmgd6evn4ft2o0paltaa",
		IDENTITY_POOL_ID: "us-east-1:4a7bd94e-3cb8-417e-9621-4f61142a59a2",
	},
	MAX_ATTACHMENT_SIZE: 5000000,
	STRIPE_KEY:
		"pk_test_51IehmtFYrYnTv4T12tASNnPKh6h4UxLhRfNGlZDxnStwEKuScTPAWMXclyVrACkMS8L3KZNmE9w28afjUjYYyxf3002DtzGy71",
};

export default config;
