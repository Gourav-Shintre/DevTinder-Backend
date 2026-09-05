import { z, ZodError } from "zod";

export const validateData = (schema) => {
  return (req, res, next) => {
    try {
      req.body =schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
       const errorMessages = Object.fromEntries(
        e.issues.map((issue) => [issue.path.join("."), issue.message])
     );
        return res.status(400).json({
          error: "Invalid data",
          details: errorMessages,
        });
      }
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };
};