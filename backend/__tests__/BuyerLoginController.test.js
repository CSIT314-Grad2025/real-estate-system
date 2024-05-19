const BuyerLoginController = require('./BuyerLoginController');
const LoginToken = require('../entities/LoginToken');
const UserAccount = require('../entities/UserAccount');

jest.mock('../entities/LoginToken');
jest.mock('../entities/UserAccount');

describe('BuyerLoginController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                email: 'buyer@example.com',
                password: 'password',
                accountType: 'buyer'
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
                email: 'buyer@example.com',
                accountType: 'buyer',
            };
            UserAccount.mockReturnValueOnce({
                login: jest.fn().mockResolvedValueOnce(account),
            });

            const token = {
                tokenString: 'buyerTokenString',
            };
            LoginToken.mockReturnValueOnce({
                generateToken: jest.fn().mockReturnValueOnce(token),
            });

            const controller = new BuyerLoginController();
            await controller.handleLogin(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                token: 'buyerTokenString',
                email: 'buyer@example.com',
                id: '123',
                accountType: 'buyer',
            });
        });

        it('should return 400 for missing fields', async () => {
            delete req.body.email;

            const controller = new BuyerLoginController();
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

            const controller = new BuyerLoginController();
            await controller.handleLogin(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
            expect(next.mock.calls[0][0].message).toBe(errorMessage);
            expect(next.mock.calls[0][0].status).toBe(400);
        });
    });
});
