const RealEstateAgentLogoutController = require('../controllers/RealEstateAgentLogoutController');
const UserAccount = require('../entities/UserAccount');

jest.mock('../entities/UserAccount');

describe('RealEstateAgentLogoutController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            requestingUser: {
                accountType: 'realestateagent',
            },
            id: '123',
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

    describe('logout', () => {
        it('should log out successfully and return a message', async () => {
            UserAccount.mockReturnValueOnce({
                logout: jest.fn().mockResolvedValueOnce(),
            });

            const controller = new RealEstateAgentLogoutController();
            await controller.logout(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Logged out successfully"
            });
        });

        it('should return 400 for unauthorized access', async () => {
            req.requestingUser.accountType = 'user';

            const controller = new RealEstateAgentLogoutController();
            await controller.logout(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
            expect(next.mock.calls[0][0].message).toBe('Unauthorized');
            expect(next.mock.calls[0][0].status).toBe(400);
        });

        it('should call next with an error on logout failure', async () => {
            const errorMessage = 'Logout failed';
            UserAccount.mockReturnValueOnce({
                logout: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
            });

            const controller = new RealEstateAgentLogoutController();
            await controller.logout(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
            expect(next.mock.calls[0][0].message).toBe(errorMessage);
            expect(next.mock.calls[0][0].status).toBe(400);
        });
    });
});

