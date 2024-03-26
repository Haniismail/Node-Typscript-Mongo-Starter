/**
 * @swagger
 * /auth/admins:
 *   post:
 *     summary: Add an admin (SUPERADMIN)
 *     description: Endpoint to register a new admin.
 *     tags:
 *       - Authentication-Admin 🔐👤
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           required:
 *             - name
 *             - email
 *             - password
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Admin has been created successfully
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
 *                   example: Admin has been created successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 653eb85acb36f465bb25e670
 *                         name:
 *                           type: string
 *                           example: admin
 *                         email:
 *                           type: string
 *                           example: haniismailoness@gmail.com
 *                         roles:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 6538e982f947867b9762f520
 *                               code:
 *                                 type: string
 *                                 example: ADMIN
 *                         profilePicUrl:
 *                           type: string
 *                           example: public/uploads/admins/admins-1698609241723.png
 *                         verified:
 *                           type: boolean
 *                           example: false
 */