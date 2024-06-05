export const generateSignature = (publicId: string, apiSecret: string) => {
    const timestamp = new Date().getTime()
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
}
