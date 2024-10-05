/**
 * @swagger
 * tags:
 *   name: Auth

 *
 * /api/auth/login:
 *   post:
 *     summary: 계정 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: 사용자 아이디
 *                 example: "testUser123"
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 사용자 고유 ID
 *                       example: "610d1f0e9e27b1001a9b618b"
 *                     id:
 *                       type: string
 *                       description: 사용자 아이디
 *                       example: "testUser123"
 *                     email:
 *                       type: string
 *                       description: 사용자 이메일
 *                       example: "test@example.com"
 *                     name:
 *                       type: string
 *                       description: 사용자 이름
 *                       example: "홍길동"
 *                 token:
 *                   type: string
 *                   description: 인증 토큰
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: 로그인 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "아이디 혹은 비밀번호를 확인해주세요"
 */

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Google 계정으로 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Google 인증 토큰
 *                 example: "ya29.a0AfH6SMDcJ-..."
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 사용자 고유 ID
 *                       example: "610d1f0e9e27b1001a9b618b"
 *                     id:
 *                       type: string
 *                       description: 사용자 아이디
 *                       example: "testUser123"
 *                     email:
 *                       type: string
 *                       description: 사용자 이메일
 *                       example: "test@example.com"
 *                     name:
 *                       type: string
 *                       description: 사용자 이름
 *                       example: "홍길동"
 *                 token:
 *                   type: string
 *                   description: 세션 토큰
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: 로그인 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "Google 로그인에 실패하였습니다."
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: 새로운 사용자 생성
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               id:
 *                 type: string
 *                 example: user123
 *               level:
 *                 type: string
 *                 example: customer
 *               name:
 *                 type: string
 *                 example: John Doe
 *               shipTo:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "Seoul"
 *               contact:
 *                 type: object
 *                 properties:
 *                   phone:
 *                     type: string
 *                     example: "010-1234-5678"
 *               image:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: 사용자 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: 사용자 생성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "이미 등록된 이메일입니다."
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: 현재 사용자 정보 가져오기
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     shipTo:
 *                       type: object
 *                     contact:
 *                       type: object
 *                     image:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *       400:
 *         description: 사용자 정보 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: "Invalid token"
 */

/**
 * @swagger
 * /api/user/admin:
 *   get:
 *     summary: 사용자 목록 조회 (관리자 전용)
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *         example: 1
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: 이름으로 사용자 필터링
 *         example: "John"
 *     responses:
 *       200:
 *         description: 사용자 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: user@example.com
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                 totalPageNum:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: 사용자 목록 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

/**
 * @swagger
 * /api/user/me:
 *   put:
 *     summary: 현재 사용자 정보 업데이트
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *               shipTo:
 *                 type: object
 *               contact:
 *                 type: object
 *               image:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: 사용자 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *       400:
 *         description: 사용자 업데이트 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: 사용자 삭제 (관리자 전용)
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 사용자 ID
 *         schema:
 *           type: string
 *           example: "603c9f8f82f8b7b62c9d779a"
 *     responses:
 *       200:
 *         description: 사용자 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: 사용자 삭제 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */


/**
 * @swagger
 * /api/auth/kakao:
 *   post:
 *     summary: Kakao 계정으로 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Kakao 인증 토큰
 *                 example: "xkhdjshgfiwuef..."
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 사용자 고유 ID
 *                       example: "610d1f0e9e27b1001a9b618b"
 *                     id:
 *                       type: string
 *                       description: 사용자 아이디
 *                       example: "testUser123"
 *                     email:
 *                       type: string
 *                       description: 사용자 이메일
 *                       example: "test@example.com"
 *                     name:
 *                       type: string
 *                       description: 사용자 이름
 *                       example: "홍길동"
 *                 token:
 *                   type: string
 *                   description: 세션 토큰
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       500:
 *         description: 로그인 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "카카오 로그인에 실패하였습니다."
 */

/**
 * @swagger
 * /api/password/forgot-password:
 *   post:
 *     summary: 비밀번호 재설정 요청
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: 재설정 이메일 발송 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 재설정 이메일이 발송되었습니다.
 *       400:
 *         description: 비밀번호 재설정 요청 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: 해당 이메일로 가입된 사용자가 없습니다.
 */

/**
 * @swagger
 * /api/password/reset-password/{token}:
 *   post:
 *     summary: 비밀번호 재설정
 *     tags: [Password]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: 비밀번호 재설정 토큰
 *         schema:
 *           type: string
 *           example: "abcdef123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: newPassword123!
 *     responses:
 *       200:
 *         description: 비밀번호 재설정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 비밀번호가 성공적으로 재설정되었습니다.
 *       400:
 *         description: 비밀번호 재설정 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: 토큰이 유효하지 않거나 만료되었습니다.
 */

/**
 * @swagger
 * /api/password/verify-password:
 *   post:
 *     summary: 현재 비밀번호 확인
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: currentPassword123!
 *     responses:
 *       200:
 *         description: 현재 비밀번호 확인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 현재 비밀번호가 확인되었습니다.
 *                 isAuthenticated:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: 현재 비밀번호 확인 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: 현재 비밀번호가 올바르지 않습니다.
 */

/**
 * @swagger
 * /api/password/change-password:
 *   put:
 *     summary: 비밀번호 변경
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: newPassword123!
 *     responses:
 *       200:
 *         description: 비밀번호 변경 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 비밀번호가 성공적으로 변경되었습니다.
 *       400:
 *         description: 비밀번호 변경 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: 사용자를 찾을 수 없습니다.
 */

/**
 * @swagger
 * /api/favorite:
 *   get:
 *     summary: 사용자의 즐겨찾기 레시피 조회
 *     tags: [Favorite]
 *     responses:
 *       200:
 *         description: 즐겨찾기 레시피 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "60f7edc8b637cf0017d8fefb"
 *                     recipes:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "60f7edc8b637cf0017d8fefb"
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "60f7edc8b637cf0017d8fefb"
 *       400:
 *         description: 즐겨찾기 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "조회 실패"
 */

/**
 * @swagger
 * /api/favorite/{id}:
 *   put:
 *     summary: 즐겨찾기에 레시피 추가
 *     tags: [Favorite]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 레시피 ID
 *         schema:
 *           type: string
 *           example: "60f7edc8b637cf0017d8fefb"
 *     responses:
 *       200:
 *         description: 레시피 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: 레시피 추가 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "추가 실패"
 */

/**
 * @swagger
 * /api/favorite/{id}:
 *   delete:
 *     summary: 즐겨찾기에서 레시피 삭제
 *     tags: [Favorite]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 레시피 ID
 *         schema:
 *           type: string
 *           example: "60f7edc8b637cf0017d8fefb"
 *     responses:
 *       200:
 *         description: 레시피 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: 레시피 삭제 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제 실패"
 */


/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: 사용자의 장바구니 조회
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: 장바구니 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ingredientId:
 *                         type: string
 *                         description: 재료 ID
 *                         example: "60f7edc8b637cf0017d8fefb"
 *                       qty:
 *                         type: number
 *                         description: 수량
 *                         example: 2
 *       400:
 *         description: 장바구니 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "장바구니를 조회할 수 없습니다."
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: 장바구니에 아이템 추가
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredientId:
 *                 type: string
 *                 description: 재료 ID
 *                 example: "60f7edc8b637cf0017d8fefb"
 *               qty:
 *                 type: number
 *                 description: 수량
 *                 example: 2
 *     responses:
 *       200:
 *         description: 아이템 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: string
 *                       description: 재료 ID
 *                       example: "60f7edc8b637cf0017d8fefb"
 *                     qty:
 *                       type: number
 *                       description: 수량
 *                       example: 2
 *       400:
 *         description: 아이템 추가 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "상품이 이미 카트에 담겨 있습니다!"
 */

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: 장바구니 아이템 업데이트
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 장바구니 아이템 ID
 *         example: "60f7edc8b637cf0017d8fefb"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qty:
 *                 type: number
 *                 description: 수량
 *                 example: 3
 *     responses:
 *       200:
 *         description: 아이템 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: string
 *                       description: 재료 ID
 *                       example: "60f7edc8b637cf0017d8fefb"
 *                     qty:
 *                       type: number
 *                       description: 수량
 *                       example: 3
 *       400:
 *         description: 아이템 업데이트 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "카트에서 상품을 찾을 수 없습니다."
 */

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: 장바구니 아이템 삭제
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 장바구니 아이템 ID
 *         example: "60f7edc8b637cf0017d8fefb"
 *     responses:
 *       200:
 *         description: 아이템 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ingredientId:
 *                         type: string
 *                         description: 재료 ID
 *                         example: "60f7edc8b637cf0017d8fefb"
 *                       qty:
 *                         type: number
 *                         description: 수량
 *                         example: 2
 *       400:
 *         description: 아이템 삭제 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "Item not found in cart"
 */

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: 새로운 주문 생성
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contactInfo:
 *                 type: object
 *                 properties:
 *                   shipTo:
 *                     type: object
 *                     required:
 *                       - address
 *                     properties:
 *                       address:
 *                         type: string
 *                         description: 배송지 주소
 *                       phone:
 *                         type: string
 *                         description: 연락처
 *                   contact:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: 연락처 이름
 *                       phone:
 *                         type: string
 *                         description: 연락처 전화번호
 *               totalPrice:
 *                 type: number
 *                 format: float
 *                 description: 총 가격
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: string
 *                       description: 재료 ID
 *                     qty:
 *                       type: integer
 *                       description: 수량
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: 가격
 *     responses:
 *       200:
 *         description: 주문 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 orderNum:
 *                   type: string
 *                   description: 주문 번호
 *       400:
 *         description: 주문 생성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: 재고가 부족합니다.
 */

/**
 * @swagger
 * /api/order/me:
 *   get:
 *     summary: 인증된 사용자의 주문 목록 가져오기
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: 주문 목록 성공적으로 조회
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         description: 사용자 ID
 *                       contactInfo:
 *                         type: object
 *                         description: 주문자 연락처 정보
 *                       totalPrice:
 *                         type: number
 *                         format: float
 *                         description: 주문 총 가격
 *                       status:
 *                         type: string
 *                         description: 주문 상태
 *                       orderNum:
 *                         type: string
 *                         description: 주문 번호
 *       400:
 *         description: 주문 목록 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: 사용자 인증 실패.
 */

/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: 주문 목록 가져오기
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: orderNum
 *         required: false
 *         description: 주문 번호
 *         schema:
 *           type: string
 *           example: "ORD123456"
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: 시작 날짜 (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           example: "2023-01-01"
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: 종료 날짜 (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           example: "2023-01-31"
 *     responses:
 *       200:
 *         description: 주문 목록 성공적으로 조회
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         description: 사용자 ID
 *                       contactInfo:
 *                         type: object
 *                         description: 주문자 연락처 정보
 *                       totalPrice:
 *                         type: number
 *                         format: float
 *                         description: 주문 총 가격
 *                       status:
 *                         type: string
 *                         description: 주문 상태
 *                       orderNum:
 *                         type: string
 *                         description: 주문 번호
 *                 totalPageNum:
 *                   type: integer
 *                   description: 총 페이지 수
 *       400:
 *         description: 주문 목록 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: 사용자 인증 실패.
 */

/**
 * @swagger
 * /api/order/{id}:
 *   put:
 *     summary: 주문 상태 업데이트
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 주문 ID
 *         schema:
 *           type: string
 *           example: "60d5ec49f4c29b8e35f69f6e"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: completed
 *     responses:
 *       200:
 *         description: 주문 상태 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: 주문 ID
 *                     status:
 *                       type: string
 *                       description: 업데이트된 주문 상태
 *       400:
 *         description: 주문 상태 업데이트 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: 주문을 찾을 수 없습니다.
 */

/**
 * @swagger
 * /api/recipe:
 *   post:
 *     summary: 레시피 생성
 *     tags: [Recipe]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 레시피 이름
 *                 example: "김치찌개"
 *               description:
 *                 type: string
 *                 description: 레시피 설명
 *                 example: "매운 김치찌개 레시피"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: string
 *                       description: 재료 ID
 *                       example: "60f7edc8b637cf0017d8fefb"
 *                     name:
 *                       type: string
 *                       description: 재료 이름
 *                       example: "돼지고기"
 *                     qty:
 *                       type: string
 *                       description: 수량
 *                       example: "200g"
 *                     unit:
 *                       type: string
 *                       description: 측정 단위
 *                       example: "g"
 *               steps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       description: 요리 단계 설명
 *                       example: "돼지고기를 볶는다."
 *                     image:
 *                       type: string
 *                       description: 단계별 이미지 URL
 *                       example: "https://example.com/step1.jpg"
 *               categories:
 *                 type: object
 *                 properties:
 *                   food:
 *                     type: string
 *                     description: 음식 카테고리
 *                     example: "한식"
 *                   mood:
 *                     type: string
 *                     description: 기분 카테고리
 *                     example: "매운 음식"
 *                   method:
 *                     type: string
 *                     description: 조리 방법
 *                     example: "끓이기"
 *                   ingredient:
 *                     type: string
 *                     description: 주요 재료
 *                     example: "김치"
 *                   etc:
 *                     type: string
 *                     description: 기타 카테고리
 *                     example: "간단한 요리"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: 이미지 URL
 *                   example: "https://example.com/recipe.jpg"
 *               time:
 *                 type: string
 *                 description: 소요 시간
 *                 example: "30분"
 *               servings:
 *                 type: string
 *                 description: 제공 인원
 *                 example: "4명"
 *               difficulty:
 *                 type: string
 *                 description: 난이도
 *                 example: "중간"
 *     responses:
 *       200:
 *         description: 레시피 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: 요청이 잘못됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 */

/**
 * @swagger
 * /api/recipe:
 *   get:
 *     summary: 레시피 목록 조회
 *     tags: [Recipe]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *         example: 1
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: 레시피 이름으로 필터링
 *         example: "파스타"
 *     responses:
 *       200:
 *         description: 레시피 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 totalPageNum:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60f7edc8b637cf0017d8fefb"
 *                       name:
 *                         type: string
 *                         example: "파스타"
 *                       reviewCnt:
 *                         type: integer
 *                         example: 5
 *       400:
 *         description: 레시피 목록 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "잘못된 요청입니다."
 */

/**
 * @swagger
 * /api/recipe/{id}:
 *   get:
 *     summary: 특정 레시피 조회
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 레시피 ID
 *         example: "66ffde4e06367798a1061106"
 *     responses:
 *       200:
 *         description: 레시피 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: 레시피 ID
 *                       example: "60f7edc8b637cf0017d8fefb"
 *                     name:
 *                       type: string
 *                       description: 레시피 이름
 *                       example: "파스타"
 *                     description:
 *                       type: string
 *                       description: 레시피 설명
 *                       example: "맛있는 파스타 레시피입니다."
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ingredientId:
 *                             type: string
 *                             description: 재료 ID
 *                             example: "60f7edc8b637cf0017d8fefb"
 *                           name:
 *                             type: string
 *                             description: 재료 이름
 *                             example: "파스타 면"
 *                           qty:
 *                             type: string
 *                             description: 수량
 *                             example: "200g"
 *                           unit:
 *                             type: string
 *                             description: 단위
 *                             example: "g"
 *                     steps:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           description:
 *                             type: string
 *                             description: 조리 단계 설명
 *                             example: "냄비에 물을 끓입니다."
 *                           image:
 *                             type: string
 *                             description: 조리 단계 이미지 URL
 *                             example: "http://example.com/image.jpg"
 *       400:
 *         description: 레시피 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "레시피를 찾을 수 없습니다."
 */

/**
 * @swagger
 * /api/recipe/category:
 *   get:
 *     summary: 카테고리별 레시피 조회
 *     tags: [Recipe]
 *     parameters:
 *       - in: query
 *         name: food
 *         schema:
 *           type: string
 *         description: 음식 카테고리
 *         example: "이탈리아 요리"
 *       - in: query
 *         name: mood
 *         schema:
 *           type: string
 *         description: 기분 카테고리
 *         example: "편안함"
 *       - in: query
 *         name: method
 *         schema:
 *           type: string
 *         description: 조리 방법
 *         example: "끓이기"
 *       - in: query
 *         name: ingredient
 *         schema:
 *           type: string
 *         description: 주 재료
 *         example: "파스타"
 *       - in: query
 *         name: etc
 *         schema:
 *           type: string
 *         description: 기타 카테고리
 *         example: "가족모임"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 한 페이지당 레시피 수
 *         example: 12
 *     responses:
 *       200:
 *         description: 카테고리별 레시피 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 recipeList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60f7edc8b637cf0017d8fefb"
 *                       name:
 *                         type: string
 *                         example: "파스타"
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: 카테고리별 레시피 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "잘못된 요청입니다."
 */

/**
 * @swagger
 * /api/recipe/fridge/recommend:
 *   get:
 *     summary: 추천 레시피 조회
 *     tags: [Recipe]
 *     parameters:
 *       - in: query
 *         name: checkedItems
 *         schema:
 *           type: string
 *         description: 추천할 재료 목록 (쉼표로 구분)
 *         example: "토마토,양파,마늘"
 *     responses:
 *       200:
 *         description: 추천 레시피 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 recipeList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60f7edc8b637cf0017d8fefb"
 *                       name:
 *                         type: string
 *                         example: "토마토 파스타"
 *       400:
 *         description: 추천 레시피 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: string
 *                   example: "재료가 제공되지 않았습니다."
 */

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: 레시피 수정
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 레시피 ID
 *         example: "60f7edc8b637cf0017d8fefb"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 레시피 이름
 *                 example: "업데이트된 파스타"
 *               description:
 *                 type: string
 *                 description: 레시피 설명
 *                 example: "업데이트된 맛있는 파스타 레시피입니다."
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: string
 *                       description: 재료 ID
 *                       example: "60f7edc8b637cf0017d8fefb"
 *                     name:
 *                       type: string
 *                       description: 재료 이름
 *                       example: "파스타 면"
 *                     qty:
 *                       type: string
 *                       description: 수량
 *                       example: "250g"
 *                     unit:
 *                       type: string
 *                       description: 단위
 *                       example: "g"
 *               steps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       description: 조리 단계 설명
 *                       example: "업데이트된 조리 단계."
 *                     image:
 *                       type: string
 *                       description: 조리 단계 이미지 URL
 *                       example: "http://example.com/new-image.jpg"
 *               categories:
 *                 type: object
 *                 properties:
 *                   food:
 *                     type: string
 *                     description: 음식 카테고리
 *                     example: "이탈리아 요리"
 *                   mood:
 *                     type: string
 *                     description: 기분 카테고리
 *                     example: "편안함"
 *                   method:
 *                     type: string
 *                     description: 조리 방법
 *                     example: "끓이기"
 *                   ingredient:
 *                     type: string
 *                     description: 주 재료
 *                     example: "파스타"
 *                   etc:
 *                     type: string
 *                     description: 기타 카테고리
 *                     example: "가족모임"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: 레시피 이미지 URL
 *                   example: "http://example.com/new-recipe.jpg"
 *               time:
 *                 type: string
 *                 description: 조리 시간
 *                 example: "25분"
 *               servings:
 *                 type: string
 *                 description: 인원 수
 *                 example: "3인분"
 *               difficulty:
 *                 type: string
 *                 description: 난이도
 *                 example: "쉬움"
 *     responses:
 *       200:
 *         description: 레시피 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: 수정된 레시피 ID
 *                       example: "60f7edc8b637cf0017d8fefb"
 *       400:
 *         description: 레시피 수정 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "레시피를 찾을 수 없습니다."
 */

/**
 * @swagger
 * /api/recipe/{id}:
 *   delete:
 *     summary: 레시피 삭제
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 레시피 ID
 *         example: "60f7edc8b637cf0017d8fefb"
 *     responses:
 *       200:
 *         description: 레시피 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "레시피가 성공적으로 삭제되었습니다."
 *       400:
 *         description: 레시피 삭제 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 error:
 *                   type: string
 *                   example: "레시피를 찾을 수 없습니다."
 */

/**
 * @swagger
 * /api/frige:
 *   post:
 *     summary: 냉장고에 재료 추가
 *     tags: [Frige]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: string
 *                       example: "60f7edc8b637cf0017d8fefb"
 *     responses:
 *       200:
 *         description: 재료 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 userFrige:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ingredientId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "60f7edc8b637cf0017d8fefb"
 *                           name:
 *                             type: string
 *                             example: "파스타"
 *       400:
 *         description: 재료 추가 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "냉장고에 재료가 이미 있습니다."
 */

/**
 * @swagger
 * /api/frige:
 *   get:
 *     summary: 사용자의 냉장고 조회
 *     tags: [Frige]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *         example: 1
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: 재료 이름으로 필터링
 *         example: "파스타"
 *     responses:
 *       200:
 *         description: 냉장고 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     userFrige:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ingredientId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: "60f7edc8b637cf0017d8fefb"
 *                               name:
 *                                 type: string
 *                                 example: "파스타"
 *                     totalPageNum:
 *                       type: integer
 *                       example: 3
 *       400:
 *         description: 냉장고 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "냉장고가 존재하지 않습니다."
 */

/**
 * @swagger
 * /api/frige/{id}:
 *   delete:
 *     summary: 냉장고에서 재료 삭제
 *     tags: [Frige]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 재료 ID
 *         schema:
 *           type: string
 *           example: "60f7edc8b637cf0017d8fefb"
 *     responses:
 *       200:
 *         description: 재료 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 userFrige:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ingredientId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "60f7edc8b637cf0017d8fefb"
 *                           name:
 *                             type: string
 *                             example: "파스타"
 *       400:
 *         description: 재료 삭제 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "냉장고가 존재하지 않습니다."
 */

/**
 * @swagger
 * /api/shopping-list/add:
 *   post:
 *     summary: 쇼핑 리스트에 항목 추가
 *     tags: [Shopping List]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f7edc8b637cf0017d8fefb"
 *                     name:
 *                       type: string
 *                       example: "우유"
 *     responses:
 *       200:
 *         description: 항목 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f7edc8b637cf0017d8fefb"
 *                       name:
 *                         type: string
 *                         example: "우유"
 *                       completed:
 *                         type: boolean
 *                         example: false
 *       400:
 *         description: 항목 추가 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: "항목이 이미 존재합니다."
 */

/**
 * @swagger
 * /api/shopping-list/me:
 *   get:
 *     summary: 사용자의 쇼핑 리스트 조회
 *     tags: [Shopping List]
 *     responses:
 *       200:
 *         description: 쇼핑 리스트 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f7edc8b637cf0017d8fefb"
 *                       name:
 *                         type: string
 *                         example: "우유"
 *                       completed:
 *                         type: boolean
 *                         example: false
 *       400:
 *         description: 쇼핑 리스트를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "쇼핑 리스트를 찾을 수 없습니다."
 */

/**
 * @swagger
 * /api/shopping-list/remove:
 *   post:
 *     summary: 쇼핑 리스트에서 항목 제거
 *     tags: [Shopping List]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 example: "60f7edc8b637cf0017d8fefb"
 *     responses:
 *       200:
 *         description: 항목 제거 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f7edc8b637cf0017d8fefb"
 *                       name:
 *                         type: string
 *                         example: "우유"
 *                       completed:
 *                         type: boolean
 *                         example: false
 *       400:
 *         description: 항목 제거 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "쇼핑 리스트를 찾을 수 없습니다."
 */

/**
 * @swagger
 * /api/shopping-list/moveToShoppingList:
 *   post:
 *     summary: 쇼핑 리스트에서 완료 리스트로 항목 이동
 *     tags: [Shopping List]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60f7edc8b637cf0017d8fefb"
 *                   name:
 *                     type: string
 *                     example: "우유"
 *     responses:
 *       200:
 *         description: 항목 이동 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f7edc8b637cf0017d8fefb"
 *                       name:
 *                         type: string
 *                         example: "우유"
 *                       completed:
 *                         type: boolean
 *                         example: true
 *       400:
 *         description: 항목 이동 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "쇼핑 리스트를 찾을 수 없습니다."
 */

/**
 * @swagger
 * /api/ingredient:
 *   get:
 *     summary: 재료 목록 조회
 *     tags: [Ingredient]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *           example: "재료 이름"
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *           example: "카테고리 이름"
 *     responses:
 *       200:
 *         description: 재료 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "재료 ID"
 *                           name:
 *                             type: string
 *                             example: "재료 이름"
 *                           description:
 *                             type: string
 *                             example: "재료 설명"
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "이미지 URL"
 *                           price:
 *                             type: number
 *                             example: 1000
 *                           discountPrice:
 *                             type: number
 *                             example: 800
 *                           category:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "카테고리 이름"
 *                           stock:
 *                             type: number
 *                             example: 50
 *                           unit:
 *                             type: string
 *                             example: "개"
 *                     totalPageNum:
 *                       type: integer
 *                       example: 5
 *       400:
 *         description: 재료 목록 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/ingredient/{id}:
 *   get:
 *     summary: 특정 재료 조회
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 재료 ID
 *         schema:
 *           type: string
 *           example: "재료 ID"
 *     responses:
 *       200:
 *         description: 재료 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 ingredient:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "재료 ID"
 *                     name:
 *                       type: string
 *                       example: "재료 이름"
 *                     description:
 *                       type: string
 *                       example: "재료 설명"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "이미지 URL"
 *                     price:
 *                       type: number
 *                       example: 1000
 *                     discountPrice:
 *                       type: number
 *                       example: 800
 *                     category:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "카테고리 이름"
 *                     stock:
 *                       type: number
 *                       example: 50
 *                     unit:
 *                       type: string
 *                       example: "개"
 *       400:
 *         description: 재료 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "해당 재료를 찾을 수 없습니다."
 */

/**
 * @swagger
 * /api/ingredient:
 *   post:
 *     summary: 재료 생성
 *     tags: [Ingredient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "재료 이름"
 *               description:
 *                 type: string
 *                 example: "재료 설명"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "이미지 URL"
 *               price:
 *                 type: number
 *                 example: 1000
 *               discountPrice:
 *                 type: number
 *                 example: 800
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "카테고리 이름"
 *               stock:
 *                 type: number
 *                 example: 50
 *               unit:
 *                 type: string
 *                 example: "개"
 *               status:
 *                 type: string
 *                 example: "active"
 *               isDeleted:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: 재료 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 ingredient:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "재료 ID"
 *                     name:
 *                       type: string
 *                       example: "재료 이름"
 *                     description:
 *                       type: string
 *                       example: "재료 설명"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "이미지 URL"
 *                     price:
 *                       type: number
 *                       example: 1000
 *                     discountPrice:
 *                       type: number
 *                       example: 800
 *                     category:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "카테고리 이름"
 *                     stock:
 *                       type: number
 *                       example: 50
 *                     unit:
 *                       type: string
 *                       example: "개"
 *       400:
 *         description: 재료 생성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/ingredient/{id}:
 *   put:
 *     summary: 재료 수정
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 재료 ID
 *         schema:
 *           type: string
 *           example: "재료 ID"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "수정된 재료 이름"
 *               description:
 *                 type: string
 *                 example: "수정된 재료 설명"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "수정된 이미지 URL"
 *               price:
 *                 type: number
 *                 example: 1200
 *               discountPrice:
 *                 type: number
 *                 example: 900
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "수정된 카테고리 이름"
 *               stock:
 *                 type: number
 *                 example: 40
 *               unit:
 *                 type: string
 *                 example: "개"
 *               status:
 *                 type: string
 *                 example: "active"
 *               isDeleted:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: 재료 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 ingredient:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "재료 ID"
 *                     name:
 *                       type: string
 *                       example: "수정된 재료 이름"
 *                     description:
 *                       type: string
 *                       example: "수정된 재료 설명"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "수정된 이미지 URL"
 *                     price:
 *                       type: number
 *                       example: 1200
 *                     discountPrice:
 *                       type: number
 *                       example: 900
 *                     category:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "수정된 카테고리 이름"
 *                     stock:
 *                       type: number
 *                       example: 40
 *                     unit:
 *                       type: string
 *                       example: "개"
 *       400:
 *         description: 재료 수정 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/ingredient/{id}:
 *   delete:
 *     summary: 재료 삭제
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 재료 ID
 *         schema:
 *           type: string
 *           example: "재료 ID"
 *     responses:
 *       200:
 *         description: 재료 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 ingredient:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "재료 ID"
 *                     name:
 *                       type: string
 *                       example: "삭제된 재료 이름"
 *                     isDeleted:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: 재료 삭제 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/review/recipe:
 *   post:
 *     summary: 레시피 리뷰 작성
 *     tags: [RecipeReview]
 *     security:
 *       - bearerAuth: []  # 인증을 위한 Bearer 토큰
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "맛있었어요!"
 *               rating:
 *                 type: number
 *                 example: 5
 *               recipeId:
 *                 type: string
 *                 example: "레시피 ID"
 *     responses:
 *       200:
 *         description: 리뷰 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "리뷰 ID"
 *                     recipeId:
 *                       type: string
 *                       example: "레시피 ID"
 *                     userId:
 *                       type: string
 *                       example: "사용자 ID"
 *                     comment:
 *                       type: string
 *                       example: "맛있었어요!"
 *                     rating:
 *                       type: number
 *                       example: 5
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-05T10:00:00Z"
 *       400:
 *         description: 리뷰 작성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/review/recipe/{id}:
 *   get:
 *     summary: 레시피 리뷰 가져오기
 *     tags: [RecipeReview]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 레시피 ID
 *         schema:
 *           type: string
 *           example: "레시피 ID"
 *     responses:
 *       200:
 *         description: 리뷰 목록 가져오기 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "리뷰 ID"
 *                       recipeId:
 *                         type: string
 *                         example: "레시피 ID"
 *                       userId:
 *                         type: string
 *                         example: "사용자 ID"
 *                       comment:
 *                         type: string
 *                         example: "맛있었어요!"
 *                       rating:
 *                         type: number
 *                         example: 5
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-05T10:00:00Z"
 *                 totalReviews:
 *                   type: number
 *                   example: 10
 *                 allReviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "리뷰 ID"
 *                       recipeId:
 *                         type: string
 *                         example: "레시피 ID"
 *                       userId:
 *                         type: string
 *                         example: "사용자 ID"
 *                       comment:
 *                         type: string
 *                         example: "맛있었어요!"
 *                       rating:
 *                         type: number
 *                         example: 5
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-05T10:00:00Z"
 *       400:
 *         description: 리뷰 목록 가져오기 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/review/recipe/{id}:
 *   delete:
 *     summary: 레시피 리뷰 삭제
 *     tags: [RecipeReview]
 *     security:
 *       - bearerAuth: []  # 인증을 위한 Bearer 토큰
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 레시피 리뷰 ID
 *         schema:
 *           type: string
 *           example: "리뷰 ID"
 *     responses:
 *       200:
 *         description: 리뷰 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 deletedCount:
 *                   type: number
 *                   example: 1
 *       400:
 *         description: 리뷰 삭제 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/review/recipe/{id}:
 *   put:
 *     summary: 레시피 리뷰 수정
 *     tags: [RecipeReview]
 *     security:
 *       - bearerAuth: []  # 인증을 위한 Bearer 토큰
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 레시피 리뷰 ID
 *         schema:
 *           type: string
 *           example: "리뷰 ID"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "리뷰 수정 내용"
 *               rating:
 *                 type: number
 *                 example: 4
 *     responses:
 *       200:
 *         description: 리뷰 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "리뷰 ID"
 *                     recipeId:
 *                       type: string
 *                       example: "레시피 ID"
 *                     userId:
 *                       type: string
 *                       example: "사용자 ID"
 *                     comment:
 *                       type: string
 *                       example: "리뷰 수정 내용"
 *                     rating:
 *                       type: number
 *                       example: 4
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-05T10:00:00Z"
 *       400:
 *         description: 리뷰 수정 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/review/ingredient:
 *   post:
 *     summary: 재료 리뷰 생성
 *     tags: [IngredientReview]
 *     security:
 *       - bearerAuth: []  # 인증을 위한 Bearer 토큰
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "훌륭한 재료입니다!"
 *               rating:
 *                 type: number
 *                 example: 5
 *               recipeId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: 리뷰 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "리뷰 ID"
 *                     ingredientId:
 *                       type: string
 *                       example: "재료 ID"
 *                     userId:
 *                       type: string
 *                       example: "사용자 ID"
 *                     comment:
 *                       type: string
 *                       example: "훌륭한 재료입니다!"
 *                     rating:
 *                       type: number
 *                       example: 5
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-05T10:00:00Z"
 *       400:
 *         description: 리뷰 생성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/review/ingredient/{id}:
 *   get:
 *     summary: 특정 재료의 리뷰 조회
 *     tags: [IngredientReview]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 재료 ID
 *         schema:
 *           type: string
 *           example: "재료 ID"
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 5
 *         description: 한 페이지에 보여줄 리뷰 개수
 *     responses:
 *       200:
 *         description: 리뷰 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "리뷰 ID"
 *                       ingredientId:
 *                         type: string
 *                         example: "재료 ID"
 *                       userId:
 *                         type: string
 *                         example: "사용자 ID"
 *                       comment:
 *                         type: string
 *                         example: "훌륭한 재료입니다!"
 *                       rating:
 *                         type: number
 *                         example: 5
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-05T10:00:00Z"
 *                 totalReviews:
 *                   type: integer
 *                   example: 10
 *                 allReviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/IngredientReview'
 *       400:
 *         description: 리뷰 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/review/ingredient/{id}:
 *   delete:
 *     summary: 특정 재료 리뷰 삭제
 *     tags: [IngredientReview]
 *     security:
 *       - bearerAuth: []  # 인증을 위한 Bearer 토큰
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 재료 리뷰 ID
 *         schema:
 *           type: string
 *           example: "리뷰 ID"
 *     responses:
 *       200:
 *         description: 리뷰 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 deletedCount:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: 리뷰 삭제 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */

/**
 * @swagger
 * /api/review/ingredient/{id}:
 *   put:
 *     summary: 특정 재료 리뷰 수정
 *     tags: [IngredientReview]
 *     security:
 *       - bearerAuth: []  # 인증을 위한 Bearer 토큰
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 재료 리뷰 ID
 *         schema:
 *           type: string
 *           example: "리뷰 ID"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "수정된 리뷰 내용"
 *               rating:
 *                 type: number
 *                 example: 4
 *     responses:
 *       200:
 *         description: 리뷰 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "리뷰 ID"
 *                     ingredientId:
 *                       type: string
 *                       example: "재료 ID"
 *                     userId:
 *                       type: string
 *                       example: "사용자 ID"
 *                     comment:
 *                       type: string
 *                       example: "수정된 리뷰 내용"
 *                     rating:
 *                       type: number
 *                       example: 4
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-05T10:00:00Z"
 *       400:
 *         description: 리뷰 수정 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: "오류 메시지"
 */
