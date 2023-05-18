import Support from '../../models/mongod/support';

export default async function GetListSupport(req, res) {
    try {
        const supportList = await Support.find({}).sort({
            created_at: -1,
        });
        res.status(200).json({
            status_code: 200,
            message: 'Get list support successfully.',
            data: supportList,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}
