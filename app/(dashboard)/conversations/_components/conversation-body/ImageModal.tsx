"use client"

import clsx from "clsx"

// components
import Modal from "@/app/_components/Modal"
import Image from "next/image"
import DownloadImageButton from "./DownloadImageButton"

interface ImageModalProps {
    isOpen: boolean
    onClose: () => void
    imageURL: string
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageURL }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <DownloadImageButton imageURL={imageURL} />
            <figure className='mt-10 w-full'>
                <Image
                    alt='user sent an image'
                    src={imageURL}
                    width={500}
                    height={500}
                    quality={50}
                    className={clsx("h-auto w-full object-cover")}
                />
            </figure>
        </Modal>
    )
}

export default ImageModal
