/**
 * @swagger
 * /users/me:
 *    put:
 *      summary: Update my profile
 *      security:
 *        - bearerAuth: []
 *      consumes:
 *        - application/json
 *        - multipart/form-data
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *              schema:
 *                $ref: '#components/schemas/UpdateUser'
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
 *
 */
