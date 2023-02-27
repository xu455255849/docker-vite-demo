module .exports = async function routes(fastify) {
  fastify.get('/base', async (req, res) => {
    res.send({
      code: 200,
      data: { a: 111},
      message: '请求成功'
    })
  })

}