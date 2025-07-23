const User = require("../model/User.model")
const respond = require("../../../Helper/Object")
module.exports.GetAll = async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        const Account = await User.findOne({
            email: email,
            password: password,
            status : true,
        })
        console.log(Account)
        if (Account == null) {
            respond.status = false
            respond.error = 100
            respond.data = []
            return res.json(respond)

        }
        else{
            respond.status = true
            respond.data = Account.token
            return res.json(respond)

        }


}

// const sampleUser = {
    //     email: 'nhutphi',
    //     password: '123456', // Hãy mã hóa mật khẩu thực tế trước khi lưu
    //     phone: '1234567890',
    //     token: 'sample_token',
    //     status: 'active',
    //     duration: '30d',
    //     role_id: 'role1',
    //     deleted_at: null,
    //     deleted_by: null,
    //     updated_at: null,
    //     updated_by: null,
    //     created_by: 'admin'
    // };
    
    // const data = new User(sampleUser)
    // await data.save();