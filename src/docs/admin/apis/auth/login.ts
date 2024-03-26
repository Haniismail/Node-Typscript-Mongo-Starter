/**
 * @swagger
 * /auth/admins/login:
 *   post:
 *     summary: Admin login
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Login'
 *     tags:
 *       - Authentication-Admin 🔐👤
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Login
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   admin:
 *                      $ref: '#/components/schemas/Admin'
 *                   tokens:
 *                      $ref: '#/components/schemas/Tokens'
 *             example:
 *               statusCode: 200
 *               message: "Login Success"
 *               data:
 *                 admin:
 *                   _id: "653a32e6eee9aaccd1c04f26"
 *                   name: "admin"
 *                   email: "admin@admin.com"
 *                   roles: ["ADMIN"]
 *                   profilePicUrl: "public/uploads/admins/admins-1698315045763.png"
 *                   verified: true
 *                   createdAt: "2023-10-26T09:35:34.363Z"
 *                 tokens:
 *                   accessToken: "your_access_token_here"
 *                   refreshToken: "your_refresh_token_here"
 */
