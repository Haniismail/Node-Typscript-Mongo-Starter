/**
 * @swagger
 * /admins/me:
 *   get:
 *     summary: Get current admin's profile
 *     description: Endpoint to retrieve details of the current admin.
 *     tags:
 *       - Admin 👤
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
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "65393132824320bb80ab730c"
 *                     name:
 *                       type: string
 *                       example: "super"
 *                     email:
 *                       type: string
 *                       example: "super@admin.com"
 *                     password:
 *                       type: string
 *                       example: "$2a$12$UuyjSF.FIl/KRZk6U2mD8OfCZbGTwjSn3OQvLgRDCnZORxbaPUiga"
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "653f6cb541431805706d26ba"
 *                           code:
 *                             type: string
 *                             example: "SUPERADMIN"
 *                           status:
 *                             type: boolean
 *                             example: true
 *                     verified:
 *                       type: boolean
 *                       example: true
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       example: "2023-10-25T15:16:02.168Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2023-10-25T15:16:02.168Z"
 */