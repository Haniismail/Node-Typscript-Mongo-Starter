/**
 * @swagger
 * /auth/admins/reset-password/{token}:
 *   post:
 *     summary: Reset admin password
 *     tags:
 *       - Authentication-Admin 🔐👤
 *     parameters:
 *       - in: path
 *         name: token
 *         description: Reset token received via email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *           example:
 *             newPassword: "new_password_here"
 *     responses:
 *       200:
 *         description: OK
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
 *                   example: new password has been reset successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/Admin'
 *                     tokens:
 *                       $ref: '#/components/schemas/Tokens'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: resetCode is required
 *                 data: {}
 *     security:
 *      - bearerAuth: []
 */
