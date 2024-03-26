/**
 * @swagger
 * /users/me:
 *    get:
 *      summary: Get my profile info
 *      security:
 *        - bearerAuth: []
 *      tags: [User]
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GetUser'
 *        400:
 *          description: 	Validation Failed
 *        401:
 *          description: Error Token
 *        403:
 *          description: Access Denied / Unauthorized
 *        500:
 *          description: Internal server error
 */
