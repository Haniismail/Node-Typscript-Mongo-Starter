/**
 * @swagger
 * /auth/admins/forgot-password:
 *   post:
 *     summary: Admin forget password
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/ForgetPassword'
 *     tags:
 *       - Authentication-Admin 🔐👤
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               message: "An email has been sent to recover your password"
 *               data: {}
 */
