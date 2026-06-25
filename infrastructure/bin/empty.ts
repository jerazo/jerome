#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'

// Used only for `cdk bootstrap` so we don't need app secrets at bootstrap time.
new cdk.App()
