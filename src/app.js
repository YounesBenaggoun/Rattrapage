

import express from "express";
import userRouter from "./4_Presentation/routes/user.route.js";
import expositionRouter from "./4_Presentation/routes/exposition.route.js";
import reservationRouter from "./4_Presentation/routes/reservation.route.js";
import themeRouter from "./4_Presentation/routes/theme.route.js";




const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/exposition", expositionRouter);
app.use("/reservation", reservationRouter);
app.use("/theme", themeRouter);




export default app;
