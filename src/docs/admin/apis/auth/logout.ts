/**
 * @swagger
 * /auth/admins/logout:
 *   delete:
 *     summary: Logout
 *     tags:
 *       - Authentication-Admin 🔐👤
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout success
 *     security:
 *      - bearerAuth: []
 */
