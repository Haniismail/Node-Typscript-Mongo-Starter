/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Delete admin by id (SUPERADMIN)
 *     tags:
 *       - Admin 👤
 *     parameters:
 *       - in: path
 *         name: id
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
 *                   example: Admin Deleted
 *                 data:
 *                   $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Validation Failed
 *       401:
 *         description: Error Token
 *       403:
 *         description: Access Denied / Unauthorized
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */
