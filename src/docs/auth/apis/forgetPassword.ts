/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: user forget Password
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/ForgetPassword'
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: OK
 */
