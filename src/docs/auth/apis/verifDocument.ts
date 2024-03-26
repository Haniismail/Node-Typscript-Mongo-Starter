/**
 * @swagger
 * /auth/upload-documents/{userId}:
 *    post:
 *      summary: upload club documents
 *      consumes:
 *        - application/json
 *        - multipart/form-data
 *      tags: [Authentication]
 *      parameters:
 *        - in: path
 *          name: userId
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *              schema:
 *                $ref: '#components/schemas/VerifDocument'
 *      responses:
 *        200:
 *          description: 	OK
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
