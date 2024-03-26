/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Update admin details by ID
 *     description: Endpoint to update details of an admin by ID.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Role'
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               lastname:
 *                 type: string
 *           example:
 *             name: New Name
 *             roles: ['ADMIN']
 *             email: new.email@example.com
 *             phoneNumber: '+1234567890'
 *             lastname: New Lastname
 *     responses:
 *       '200':
 *         description: Admin details updated successfully
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
 *                   example: Profile updated
 *                 data:
 *                   $ref: '#/components/schemas/Admin'
 */
