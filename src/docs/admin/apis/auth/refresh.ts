/**
 * @swagger
 * /auth/admins/refresh:
 *   post:
 *     summary: Refresh token
 *     tags:
 *       - Authentication-Admin 🔐👤
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: Refresh token
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Tokens'
 *             example:
 *               statusCode: 200
 *               accessToken: "your_new_access_token_here"
 *               refreshToken: "your_new_refresh_token_here"
 *     security:
 *      - bearerAuth: []
 */
