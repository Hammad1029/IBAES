export const responses = {
    badRequest: {
        responseCode: "400",
        responseDescription: "Bad request"
    },
    userNotFound: {
        reponseCode: "404",
        responseDescription: "User Not Found"
    },
    invalidPassword: {
        responseCode: "401",
        responseDescription: "Invalid Password"
    },
    success: {
        responseCode: "00",
        responseDescription: "Success"
    },
    internalServerError: {
        responseCode: "500",
        responseDescription: "Something went wrong"
    }
}

export const responseHandler = (res = {}, response = {}, config = {}) => {
    const finalConfig = { ...defaultConfig, ...config, ...response };
    if (config.error) console.log(`ERROR | ${config.error}`)
    else console.log(`SUCCESS | ${finalConfig.responseCode} | ${finalConfig.responseDescription}`)
    return res.json({ responseCode: finalConfig.responseCode, responseDescription: finalConfig.responseDescription, data: finalConfig.data });
}

const defaultConfig = {
    error: false,
    data: undefined,
    responseCode: responses.success.responseCode,
    responseDescription: responses.success.responseDescription
}