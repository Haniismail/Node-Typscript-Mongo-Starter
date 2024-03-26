/**
 * @swagger
 * /admins/all/non-admins:
 *   get:
 *     summary: Get all non-admin users
 *     description: Retrieve a list of non-admin users.
 *     tags:
 *       - Admin 👤
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for paginated results (default is 1).
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: The number of items per page (default is 12).
 *       - in: query
 *         name: deleted
 *         schema:
 *           type: boolean
 *         description: Filter users based on whether they are deleted or not (true/false).
 *     responses:
 *       '200':
 *         description: All non-admin users returned successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               message: All users returned successfully
 *               meta:
 *                 limit: 12
 *                 hasPrevPage: false
 *                 hasNextPage: false
 *                 hasMore: false
 *                 totalDocs: 5
 *                 totalPages: 1
 *                 page: 1
 *                 pagingCounter: 1
 *               docs:
 *                 - _id: "653f6d33a52f186417470b32"
 *                   firstName: "omar"
 *                   lastName: "labidli"
 *                   userName: "omar"
 *                   email: "omar@gmail.com"
 *                   phoneNumber: "56987845"
 *                   userType: "653933986b7b89f9093607c7"
 *                   verified: true
 *                   token: null
 *                   createdAt: "2023-10-30T08:45:39.804Z"
 *                   updatedAt: "2023-10-30T08:45:39.804Z"
 *                 - _id: "65390a4010cbf74c5702db4f"
 *                   firstName: "string"
 *                   lastName: "string"
 *                   email: "amine1@gmail.com"
 *                   phoneNumber: "54879563"
 *                   verified: true
 *                   token: null
 *                   createdAt: "2023-10-25T12:29:52.214Z"
 *                   updatedAt: "2023-10-25T12:30:21.421Z"
 *                 - _id: "653905af0c5ff177984d7577"
 *                   firstName: "string"
 *                   lastName: "string"
 *                   email: "amine@gmail.com"
 *                   phoneNumber: "54879563"
 *                   verified: true
 *                   token: null
 *                   createdAt: "2023-10-25T12:10:23.591Z"
 *                   updatedAt: "2023-10-25T12:10:58.073Z"
 *                 - _id: "6538ee538f439ab2ed246764"
 *                   firstName: "string"
 *                   lastName: "string"
 *                   email: "amine.karkni@hotmail.fr"
 *                   phoneNumber: "54867711"
 *                   verified: true
 *                   token: null
 *                   createdAt: "2023-10-25T10:30:43.806Z"
 *                   updatedAt: "2023-10-26T08:40:04.385Z"
 *                   resetCode: "357631"
 *                 - _id: "6538e9b85e293d806167d030"
 *                   name: "Hani"
 *                   email: "romox55865@wermink.com"
 *                   profilePicUrl: "public/uploads/users/users-1698228660238.png"
 *                   verified: false
 *                   status: true
 *                   token: "7a1a613c-5263-43bf-813c-9836455ae822"
 *                   createdAt: "2023-10-25T10:11:04.756Z"
 *                   updatedAt: "2023-10-25T10:11:04.756Z"
 */
