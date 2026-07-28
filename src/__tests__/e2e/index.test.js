import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";


import { USERS } from "../constants.js";
import { authData } from "../shared/auth.data.js";
import "../shared/cleanup.js";


import registerTest from "./register.js";
import loginTests from "./login.js";
import authorizationTests from "./authorization.js";
import themeTests from "./theme.js";
import expositionTest from "./exposition.js";
import reservationTest from "./reservation.js";



registerTest();
loginTests();
authorizationTests();
themeTests();
expositionTest();
reservationTest();

