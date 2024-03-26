/**
 * @swagger
 * /auth/admins/confirm/{token}:
 *   get:
 *     summary: Confirm email address for admin
 *     tags:
 *       - Authentication-Admin 🔐👤
 *     parameters:
 *       - in: path
 *         name: token
 *         description: Confirmation token received via email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Email confirmed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "653a32e6eee9aaccd1c04f26"
 *                         name:
 *                           type: string
 *                           example: "admin"
 *                         email:
 *                           type: string
 *                           example: "admin@admin.com"
 *                         roles:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: "6538e982f947867b9762f520"
 *                               code:
 *                                 type: string
 *                                 example: "ADMIN"
 *                         profilePicUrl:
 *                           type: string
 *                           example: "public/uploads/admins/admins-1698315045763.png"
 *                         verified:
 *                           type: boolean
 *                           example: true
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                         refreshToken:
 *                           type: string
 *                           example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
