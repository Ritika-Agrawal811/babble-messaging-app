import { useState } from "react"

// components
import Button from "@/app/_components/Button"
import toast from "react-hot-toast"
import { IoMdDownload } from "react-icons/io"

interface DownloadImageButtonProps {
    imageURL: string
}

const DownloadImageButton: React.FC<DownloadImageButtonProps> = ({ imageURL }) => {
    const [url, setUrl] = useState("")

    const downloadImageHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()

        try {
            // making a fetch call to the image endpoint to fetch its details
            const response = await fetch(imageURL)

            if (response.status !== 200) {
                toast.error("Failed to download image")
                return
            }

            // getting image's blob details
            const imageBlob = await response.blob()

            // creating an url based on its blob
            const url = window.URL.createObjectURL(new Blob([imageBlob]))
            setUrl(url)
            toast.success("Image is successfully downloaded!")
        } catch (error) {
            console.log(error, "Failed to download image")
            toast.error("Failed to download image")
        }
    }

    return (
        <Button onClick={(e) => downloadImageHandler(e)} variant='secondary' type='button'>
            <a href={url} download='image.jpg' className='flex items-center gap-2'>
                <IoMdDownload className='text-xl' /> Download
            </a>
        </Button>
    )
}

export default DownloadImageButton
