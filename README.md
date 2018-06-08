##	Server Side Architecture
####	Application Architecture
####	Relationship Between Node and Express
####	Generating Express Apps
####	Express Route Handlers
####	Heroku Deployment Checklist
####	Installing the Heroku CLI
####	Verifying Heroku Deployment
####	Followup Deployments
##	Authentication with Google OAuth
####	Intro to Google OAuth
####	The OAuth Flow
####	Overview of Passport JS
####	Passport Setup
####	Enabling Google OAuth API
####	Securing API Keys
####	Google Strategy Options
####	Testing OAuth
####	Authorized Redirect URI's
####	OAuth Callbacks
####	Access and Refresh Tokens
####	Nodemon Setup
##	Adding MongoDB
####	Server Structure Refactor
####	The Theory of Authentication
####	Signing In Users with OAuth
####	Introduction to MongoDB
####	MongoDB Setup
####	Connecting Mongoose to Mongo
####	Breather and Review
####	Mongoose Model Classes
####	Saving Model Instances
####	Mongoose Queries
####	Passport Callbacks
####	Encoding Users
####	Deserialize User
####	Enabling Cookies
####	Testing Authentication
####	Logging Out Users
####	[Optional] A Deeper Dive
##	Dev vs Prod Environments
####	Dev vs Prod Keys
####	Generating Production Resources
####	Determining Environment
####	Version Control Scheme
####	Heroku Env Variables
####	Fixing Heroku Proxy Issues
##	Moving to the Client Side
####	React App Generation
####	A Separate Front End Server
####	Running the Client and Server
####	Routing Stumbling Block
####	The Beauty of Create React App's Proxy
####	[Optional] Why This Architecture?
##	Developing the Client Side
####	Async/Await Syntax
####	Refactoring with Async/Await
####	Front End Tech
####	Client React Setup
####	Installing Root Modules
####	Troubleshooting NPM
####	Redux Review and Setup
####	The Auth Reducer
####	Finishing Reducer Setup
####	Why We Care About Auth
####	React Router Setup
####	Route Configuration
####	Always Visible Components
####	Always Visible Components
####	Materialize CSS
####	Webpack with CSS
####	Header Design
####	Current User API
####	Additional Proxy Rules
####	Basics of Redux Thunk
####	Refactoring the App
####	Testing FetchUser
####	Refactoring to Async/Await
####	AuthReducer Return Values
####	Accessing State in the Header
####	Header Content
####	Redirecting a User on Auth
####	Redirect on Logout
####	Landing Component
####	Link Tags
##	Handling Payments
####	Client Side Billing
####	Billing Considerations
####	Stripe Billing Process
####	Exploring the Stripe API
####	Stripe API Keys
####	Env Variables with React
####	The Payments Component
####	Stripe Tokens
####	Payment Fixes
####	Reusing Action Types
####	Positing the Stripe Token
####	Post Request Handlers
####	Creating Charges
####	BodyParser Middleware
####	Creating a Charge Object
####	Finalizing a Charge
####	Adding Credits to a User
####	Requiring Authentication
####	Route-Specific Middlewares
####	Displaying Credit Quantity
####	Updating Credits
##	Back End to Front End Routing in Production
####	Express with Create-React-App in Production
####	Routing in Production
####	Deployment Options
####	Adding in a Heroku Build Step
####	Testing Deployment
##	Mongoose for Survey Creation
####	Survey Overview
####	Server Routes
####	Survey Model
####	Model Deficiencies
####	Limitations of Subdocument Collections
####	Setting up SubDocs
####	Relationship Fields
####	Survey Creation Route Handler
####	Verifying Minimum Credits
####	Creating Surveys
####	Creating Subdoc Collections
####	Oops! A Little Tweak
####	Creating Mailers
####	Identifying Unique Users
####	Sendgrid Setup
####	Mailer Setup
####	Mailer in Use
####	Mailer Constructor
####	Boilerplate for Sending Emails
####	More Mailer Properties
####	Sending SendGrid Emails
####	Testing Email Sending
####	Improving the Email Template
####	Polish in the Route Handler
####	Verifying Sendgrid Click Tracking
####	Feedback for User Feedback
##	Back to the Client!
####	Client Side Survey Creation
####	Material Icons
####	Navigation with the Link Tag
####	SurveyNew Form
####	Purpose of Redux Form
####	Redux Form Setup
####	The ReduxForm Helper
####	Redux Form in Practice
####	Custom Field Components
####	Wiring up Custom Fields
####	DRY'ing Up Fields
####	Fields from Config
####	Styling the Form
####	Form Validation
####	Showing Validation Errors
####	Generalizing Field Validation
####	Validating Emails
####	Displaying Invalid Emails
####	Toggling Visibility?
####	Advancing From SurveyForm
####	Retreat to the Form
####	Persisting Form Values
####	Refactoring Form Fields
####	Finalizing Review Fields
####	Outstanding Form Work
####	Dumping Form Values
####	Fixing Property Names
####	Posting to Surveys
####	Redirect on Submit
##	Handling Webhook Data
####	Feedback with Webhooks
####	Webhooks in Development
####	LocalTunnel Setup
####	Testing Webhooks
####	LocalTunnel Crash Fix
####	Finalizing Webhook Setup
####	Encoding Survey Data
####	Dirty Data from Webhooks
####	Processing Pipeline
####	Parsing the Route
####	Code Cleanup
####	Unique Events
####	Lodash Chain Helper
####	Bad Mongoose Queries
####	Finding the Exact Survey
####	Updating Records
####	Executing Queries
####	Testing the Query
####	Odds n' Ends Around Surveys
####	Mongoose Tips
##	The Home Stretch!
####	Fetching a List of Surveys
####	Whitelisting Model Fields
####	Testing Surveys Endpoint
####	Wiring Surveys Up to Redux
####	Wiring React to Redux
####	Rendering a List of Surveys
####	Reversing the Survey List
####	Expanding the App
