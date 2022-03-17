codes = {}

codes[0] = 'ok'
codes[999] = '服务器未知异常'

codes[10000] = '通用错误'
codes[10001] = '通用参数错误'
codes[10002] = '资源未找到'
codes[10003] = '没有找到合适的登陆处理方法'
codes[10004] = '令牌不合法或者过期'
codes[10005] = '用户未被授权'
codes[10006] = '登陆失败'
codes[10007] = '请求地址错误'

codes[20000] = '用户类通用错误'
codes[20001] = '用户已存在'
codes[20002] = '用户不存在'
codes[20003] = '用户密码错误'
codes[20004] = '获取用户wx openid失败'

module.exports = codes