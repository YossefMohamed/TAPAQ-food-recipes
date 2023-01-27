import { body } from "express-validator";

export const createRecipeValidators = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Cant be empty")
    .bail()
    .isLength({
      min: 5,
    })
    .withMessage("Title must be more than 4 letters"),
  body("ingrediantes")
    .isLength({
      min: 3,
    })
    .withMessage("Must be more than 3 ingrediantes")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Cant be empty"),
  body("steps")
    .isLength({
      min: 3,
    })
    .withMessage("Must be more than 3 steps")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Cant be empty"),
  body("tags")
    .isLength({
      min: 1,
      max: 4,
    })
    .withMessage("Must be at least 1 tag and at most 4 tags")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Cant be empty"),
];
