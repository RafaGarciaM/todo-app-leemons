const createErrorResponse = (statusCode, errorMessage) => ({
  error: true,
  code: statusCode,
  message: errorMessage
})

const handleErrors = async (ctx, action) => {
  try {
    return await action(ctx)
  } catch (error) {
    const { code, message } = error
    ctx.meta.$statusCode = code || 500
    ctx.meta.$errorMessage = message || 'Error interno'
    return createErrorResponse(ctx.meta.$statusCode, ctx.meta.$errorMessage)
  }
}

module.exports = {
  createErrorResponse,
  handleErrors
}
