Before you launch the solution, review the cost, architecture, network security, and other considerations discussed in this guide. Follow the step-by-step instructions in this section to configure and deploy the solution into your account.

**Time to deploy**: Approximately 15 minutes
## Deployment overview

Use the following steps to deploy this solution on AWS. For detailed instructions, follow the links for each step.

- Step 1. Launch the stack
    - [(Option 1) Deploy the AWS CloudFormation template in AWS Standard Regions](#launch-cognito)
    - [(Option 2) Deploy the AWS CloudFormation template in AWS China Regions](#launch-openid)
- Step 2. [Launch the web console](#launch-web-console)
- Step 3. [Create a transfer task](#create-task)


## Step 1. (Option 1) Launch the stack in AWS Standard Regions <a name="launch-cognito"></a>

!!! warning "Important"
    The following deployment instructions apply to AWS Standard Regions only. For deployment in AWS China Regions refer to Option 2.  

**Deploy the AWS CloudFormation template for Option 1 – AWS Standard Regions**

!!! note "Note"

    You are responsible for the cost of the AWS services used while running this solution. For more details, visit the Cost section in this guide, and refer to the pricing webpage for each AWS service used in this solution. 

1. Sign in to the AWS Management Console and select the button to launch the `DataTransferHub-cognito.template` AWS CloudFormation template. Alternatively, you can [download the template](https://aws-gcr-solutions.s3.amazonaws.com/data-transfer-hub/latest/DataTransferHub-cognito.template) as a starting point for your own implementation.

    [![Launch Stack](./images/launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/template?stackName=DataTransferHub&templateURL=https://aws-gcr-solutions.s3.amazonaws.com/data-transfer-hub/latest/DataTransferHub-cognito.template)

2.	The template launches in the US East (N. Virginia) Region by default. To launch the solution in a different AWS Region, use the Region selector in the console navigation bar. 

3.	On the **Create stack** page, verify that the correct template URL is in the **Amazon S3 URL** text box and choose **Next**.

4.	On the **Specify stack details** page, assign a name to your solution stack. For information about naming character limitations, refer to [IAM and STS Limits](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html) in the *AWS Identity and Access Management User Guide*.

5.	Under **Parameters**, review the parameters for this solution template and modify them as necessary. This solution uses the following default values.

    | Parameter | Default | Description |
    |----------|--------|--------|
    | **AdminEmail** | <Requires input\> |	The email of the Admin user.

6.	Choose **Next**. 

7.	On the **Configure Stack Options** page, keep the default values and choose **Next**.

8.	On the **Review** page, review and confirm the settings. Check the box acknowledging that the template will create AWS Identity and Access Management (IAM) resources.

9.	Choose **Create stack** to deploy the stack.

You can view the status of the stack in the AWS CloudFormation console in the **Status** column. You should receive a **CREATE_COMPLETE** status in approximately 15 minutes.

## Step 1. (Option 2) Launch the stack in AWS China Regions <a name="launch-openid"></a>

!!! warning "Important"

    The following deployment instructions apply to AWS China Regions only. For deployment in AWS Standard Regions refer to Option 1.  

### Prerequisites
1.	Create an OIDC User Pool. 
2.	Configure domain name service (DNS) resolution.

### Prerequisite 1: Create an OIDC user pool
In AWS Regions where Amazon Cognito is not yet available, you can use OIDC to provide authentication. The following procedure uses AWS Partner [Authing](https://www.authing.cn/) as an example, but you can also choose any available provider. 

1. Sign up for an Authing developer account. For more information, see [How to register an account](https://docs.authing.cn/v2/).

2. Sign in to Authing.

3. Select **Create new user pool**, enter a name, and choose **Confirm**.

4. After the user pool is created, you can then create an application for OIDC authentication. 
    1. Select and enter the **App** interface from the left sidebar, and select **Add App**.
    2. Select **Self-built application**.
    3. Enter the application name and enter the authentication address.
    4. Select **Create**.

5. Update the authorization configuration.
    1. Select from the left sidebar and enter the **Applicable Order** interface, select **App Configuration**, and then select **Authorized Configuration**.
    2. **Authorization mode** select **implicit**, return type select **id_token**.
    3. The id_token signature algorithm is modified to **RS256**.
    4. Select **Save**.

6. Update the callback URL.
    1. From **Application**, select **Configuration**, then choose **Auth Config**. 
    2. Modify the login callback URL to `https://<your-custom-domain>/authentication/callback`。
    3. Choose **Save**.
    !!! note "Note"

        Verify that the domain name has completed ICP registration in China. 

7. Update login control.
    1. Select and enter the **Application** interface from the left sidebar, select **Login Control**, and then select **Registration and Login**.
    2. Please select only **Password Login: Email** for the login method.
    3. Please **uncheck** all options in the registration method.
    4. Select **Save**.

8. Create an admin user.
    1. From **Users & Roles**, select **Users**, then choose **Create user**.
    2. Enter the email for the user. 
    3. Choose **OK**. 
    4. Check the email for a temporary password. 
    5. Reset the user password.

    !!! note "Note"
        Because this solution does not support application roles, all the users will receive admin rights. 

### Prerequisite 2: Configure domain name service resolution 
Configure domain name service (DNS) resolution to point the ICP licensed domain to the CloudFront default domain name. Optionally, you can use your own DNS resolver. 

The following is an example for configuring an Amazon Route 53.

1. Create a hosted zone in Amazon Route 53. For more information, refer to the [Amazon Route 53 Developer Guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html).

2. Create a CNAME record for the console URL.

    1. From the hosted zone, choose **Create Record**.
    1. In the **Record name** input box, enter the host name.
    1. From **Record type** select **CNAME**.
    1. In the value field, Enter the CloudFormation output PortalUrl. 
    1. Select **Create records**.

3. Add alternative domain names to the CloudFront distribution.

    1. Configure the corresponding domain name in CloudFront to open the CloudFront console by finding the distribution ID for PortalURL in the list and selecting **ID** (or check the check box, and then select **Distribution Settings**).
    1. Click **Edit**, and add the record of Route 53 in the previous step to the `Alternate Domain Name (CNAME)`.

**Deploy the AWS CloudFormation template for Option 2 – AWS China Regions**

This automated AWS CloudFormation template deploys Data Transfer Hub in the AWS Cloud. You must Create an ODIC User Pool and Configure DNS resolution before launching the stack.

!!! note "Note"

    You are responsible for the cost of the AWS services used while running this solution. For more details, visit the Cost section in this guide, and refer to the pricing webpage for each AWS service used in this solution. 

1. Sign in to the AWS Management Console and select the button to launch the `DataTransferHub-openid.template` AWS CloudFormation template. Alternatively, you can [download the template](https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/data-transfer-hub/latest/DataTransferHub-openid.template) as a starting point for your own implementation. 

    [![Launch Stack](./images/launch-stack.png)](https://console.amazonaws.cn/cloudformation/home#/stacks/create/template?stackName=DataTransferHub&templateURL=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/data-transfer-hub/latest/DataTransferHub-openid.template)

2. The template launches in your console’s default Region. To launch the solution in a different AWS Region, use the Region selector in the console navigation bar. 

3. On the **Create stack** page, verify that the correct template URL is in the Amazon S3 URL text box and choose **Next**.

4.	On the **Specify stack details** page, assign a name to your solution stack. For information about naming character limitations, refer to [IAM and STS Limits](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html) in the *AWS Identity and Access Management User Guide*.

5.	Under **Parameters**, review the parameters for this solution template and modify them as necessary. This solution uses the following default values.

    | Parameter | Default | Description |
    |----------|--------|--------|
    | **OidcProvider** | <Requires input\> |	Refers to the Issuer shown in the OIDC application configuration.  
    | **OidcClientId** | <Requires input\> |	Refers to the App ID shown in the OIDC application configuration. 
    | **OidcCustomerDomain** | <Requires input\> | Refers to the customer domain that has completed ICP registration in China, not the subdomain provided by Authing. <br> It must start with `https://`.

6. Choose **Next**.

7. On the **Configure Stack Options** page, keep the default values and choose **Next**.

8. On the **Review** page, review and confirm the settings. Check the box acknowledging that the template will create AWS Identity and Access Management (IAM) resources.

9. Choose **Create Stack** to deploy the stack. 
    
You can view the **status** of your stack in the AWS CloudFormation console in the Status column. You should receive a **CREATE_COMPLETE** status in approximately 15 minutes.

## Step 2. Launch the web console <a name="launch-web-console"></a>

After the stack is successfully created, navigate to the CloudFormation **Outputs** tab and select the **PortalUrl** value to access the Data Transfer Hub web console.

After successful deployment, an email containing the temporary login password will be sent to the email address provided.

Depending on the region where you start the stack, you can choose to access the web console from the AWS China Regions or the AWS Standard Regions.

- [Log in with Amazon Cognito User Pool (for AWS Standard Regions)](#cognito)
- [Log in with OpenID using Authing.cn (for AWS China Regions)](#openid)

### (Option 1) Log in using Amazon Cognito user pool for AWS Standard Regions <a name="cognito"></a>

1. Using a web browser, enter the **PortalURL** from the CloudFormation **Output** tab, then navigate to the Amazon Cognito console. 

2. Sign in with the **AdminEmail** and the temporary password.
    1. Set a new account password.
    2. (Optional) Verify your email address for account recovery. 
3. After the verification is complete, the system opens the Data Transfer Hub web console.

### (Option 2) OpenID authentication for AWS China Regions <a name="openid"></a>
1. Using a web browser, enter the Data Transfer Hub domain name. 
    - If you are logging in for the first time, the system will open the Authing.cn login interface. 
2. Enter the username and password you registered when you deployed the solution, then choose Login. The system opens the Data Transfer Hub web console.
3. Change your password and then sign in again. 

## Step 3. Create a transfer task <a name="create-task"></a>

Use the web console to create a transfer task for Amazon S3 or Amazon ECR. For more information, refer to [Create Amazon S3 Transfer Task](./tutorial-s3.md) and [Create Amazon ECR Transfer Task](./tutorial-ecr.md).

![dth-console](./images/dth-console.png)

Figure 1: Data Transfer Hub web console
