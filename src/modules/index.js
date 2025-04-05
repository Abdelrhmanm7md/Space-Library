import facultyRouter from "./Faculty/faculty.routes.js";
import authRouter from "./auth/auth.routes.js";
import usersRouter from "./users/users.routes.js";
import subjectRouter from "./Subject/subject.routes.js";
import priceListRouter from "./PriceList/priceList.routes.js";
import doctorRouter from "./Doctor/doctor.routes.js";
import lectureRouter from "./Lecture/lecture.routes.js";
import orderRouter from "./Order/order.routes.js";
export function init(app) {
  app.use("/api/v1/users", usersRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/faculty", facultyRouter);
  app.use("/api/v1/price", priceListRouter);
  app.use("/api/v1/subject", subjectRouter);
  app.use("/api/v1/doctor", doctorRouter);
  app.use("/api/v1/lecture", lectureRouter);
  app.use("/api/v1/order", orderRouter);


  app.use("/", (req, res, next) => {
    // res.send("Page Not Found");
   return res.status(404).json({ message: "Page Not Found" });
  });

  app.all("*", (req, res, next) => {
    next(res.status(404).json({ message: "Page Not found" }));
  });
}
