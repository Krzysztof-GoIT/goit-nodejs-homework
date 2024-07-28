const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const {
    register,
    login,
    logout,
    userInfo,
    upSubscription,
    upAvatar,
    verifyEmail,
    repeatVerifyEmail,
} = require("../../controllers/auth.controller");
const { authUser, upUserSubscription } = require("../../helpers/schemasUsers");
const { validateAuth } = require("../../helpers/validateAuth");
const { validateToken } = require("../../helpers/validateToken");
const { upload } = require("../../helpers/uploadAvatar");

const authRouter = express.Router();

authRouter.post("/register", validateAuth(authUser), tryCatchWrapper(register));
authRouter.get("/login", validateAuth(authUser), tryCatchWrapper(login));
authRouter.post(
    "/logout",
    tryCatchWrapper(validateToken),
    tryCatchWrapper(logout)
);
authRouter.get(
    "/current",
    tryCatchWrapper(validateToken),
    tryCatchWrapper(userInfo)
);
authRouter.patch(
    "/",
    tryCatchWrapper(validateToken),
    validateAuth(upUserSubscription),
    tryCatchWrapper(upSubscription)
);
authRouter.patch(
    "/avatars",
    tryCatchWrapper(validateToken),
    upload.single("avatar"),
    tryCatchWrapper(upAvatar)
);
authRouter.get("/verify/:verificationToken", tryCatchWrapper(verifyEmail));
authRouter.post("/verify", tryCatchWrapper(repeatVerifyEmail));

module.exports = {
    authRouter,
};
