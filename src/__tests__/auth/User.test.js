import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";


import { USERS } from "../constants.js";
import { authData } from "../setup/auth.data.js";
import "../setup/cleanup.js";

import registerTest  from "./register.js";
import  loginTests  from "./login.js";
import  authorizationTests  from "./authorization.js";


registerTest();
loginTests();
authorizationTests();

