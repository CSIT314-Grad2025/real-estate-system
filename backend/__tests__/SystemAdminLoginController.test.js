const SystemAdminController = require('./SystemAdminController');
const LoginToken = require('../entities/LoginToken');
const UserAccount = require('../entities/UserAccount');

jest.mock('../entities/LoginToken');
jest.mock('../entities/UserAccount');

describe('SystemAdminController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                email: 'admin@example.com',
                password: 'password',
                accountType: 'systemAdmin'
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
                id: '789',
                email: 'admin@example.com',
                accountType: 'systemAdmin',
            };
            UserAccount.mockReturnValueOnce({
                login: jest.fn().mockResolvedValueOnce(account),
            });

            const token = {
                tokenString: 'adminTokenString',
            };
            LoginToken.mockReturnValueOnce({
                generateToken: jest.fn().mockReturnValueOnce(token),
            });

            const controller = new SystemAdminController();
            await controller.handleLogin(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                token: 'adminTokenString',
                email: 'admin@example.com',
                id: '789',
                accountType: 'systemAdmin',
            });
        });

        it('should return 400 for missing fields', async () => {
            delete req.body.accountType;

            const controller = new SystemAdminController();
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

            const controller = new SystemAdminController();
            await controller.handleLogin(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
            expect(next.mock.calls[0][0].message).toBe(errorMessage);
            expect(next.mock.calls[0][0].status).toBe(400);
        });
    });
});

