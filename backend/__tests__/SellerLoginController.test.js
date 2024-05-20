const SellerLoginController = require('../controllers/SellerLoginController');
const LoginToken = require('../entities/LoginToken');
const UserAccount = require('../entities/UserAccount');

jest.mock('../entities/LoginToken');
jest.mock('../entities/UserAccount');

describe('SellerLoginController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                email: 'seller@example.com',
                password: 'password',
                accountType: 'seller'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('handleLogin', () => {
        it('should return a token on successful login', async () => {
            const account = {
                id: '123',
                email: 'seller@example.com',
                accountType: 'seller',
            };
            UserAccount.mockReturnValueOnce({
                login: jest.fn().mockResolvedValueOnce(account),
            });

            const token = {
                tokenString: 'sellerTokenString',
            };
            LoginToken.mockReturnValueOnce({
                generateToken: jest.fn().mockReturnValueOnce(token),
            });

            const controller = new SellerLoginController();
            await controller.handleLogin(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                token: 'sellerTokenString',
                email: 'seller@example.com',
                id: '123',
                accountType: 'seller',
            });
        });

        it('should return 400 for missing fields', async () => {
            delete req.body.accountType;

            const controller = new SellerLoginController();
            await controller.handleLogin(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
            expect(next.mock.calls[0][0].status).toBe(400);
        });

        it('should call next with an error on login failure', async () => {
            const errorMessage = 'Invalid credentials';
            UserAccount.mockReturnValueOnce({
                login: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
            });

            const controller = new SellerLoginController();
            await controller.handleLogin(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
            expect(next.mock.calls[0][0].message).toBe(errorMessage);
            expect(next.mock.calls[0][0].status).toBe(400);
        });
    });
});

