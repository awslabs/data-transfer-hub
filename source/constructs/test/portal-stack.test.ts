/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import * as cdk from '@aws-cdk/core';
import { SynthUtils } from '@aws-cdk/assert';
import * as portal from '../lib/portal-stack';

test('Test portal stack', () => {
  const stack = new cdk.Stack();

  new portal.PortalStack(stack, 'MyTestPortalStack', {
    auth_type: "cognito",
    aws_oidc_customer_domain: "",
    aws_oidc_provider: "",
    aws_oidc_client_id: "",
    aws_user_pools_id: "",
    aws_user_pools_web_client_id: "",
    aws_appsync_graphqlEndpoint: "",
  });
  // THEN
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();

});
