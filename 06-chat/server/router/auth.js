/* 
    path: api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validateFields");

const { create, login, revalidateToken } = require("../controllers/auth");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").isString(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check(
      "password",
      "la longitud de la contraseña debe ser de al menos 6 caracteres"
    ).isLength({ min: 6, max: 12 }),
    validateFields,
  ],
  create
);

router.post(
  "/",
  [
    check("email", "El email es oblicatorio").isString(),
    check("password", "La constraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  login
);

router.get("/renew", revalidateToken);

module.exports = router;

