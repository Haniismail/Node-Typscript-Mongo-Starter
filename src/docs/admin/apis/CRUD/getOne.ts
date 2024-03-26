/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Get admin details by ID
 *     description: Endpoint to retrieve details of an admin by ID.
 *     tags:
 *       - Admin 👤
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Admin ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Admin details retrieved successfully
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
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Admin'
 */