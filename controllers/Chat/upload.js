const uploadImage = async(req,res) => {
  const file = req.file

  console.log('999999999999999999999999',file)
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  // res.send()
  return res.status(200).json({
    status: 200,
    message: 'Đăng ký thành công',
    path: process.env.APP_PATH + "/upload/images/" + req.body.fileName
});
}

module.exports = {
  uploadImage
};