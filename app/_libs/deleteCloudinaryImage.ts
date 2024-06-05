import axios from "axios"
import { generateSHA1 } from "./generateSHA1"
import { generateSignature } from "./generateSignature"

export const deleteCloudinaryImage = async (publicId: string | null): Promise<boolean> => {
    if (!publicId) return false

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
    const apiSecret = process.env.CLOUDINARY_API_SECRET!

    const signature = generateSHA1(generateSignature(publicId, apiSecret))
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`

    const timestamp = new Date().getTime()

    try {
        const response = await axios.post(url, {
            public_id: publicId,
            signature: signature,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
            timestamp: timestamp,
        })

        if (response.status !== 200) return false

        return true
    } catch (error) {
        console.error(error)
        return false
    }
}
