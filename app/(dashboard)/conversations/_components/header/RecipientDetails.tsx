interface RecipientDetailsProps {
    details: {
        title: string
        content: string | null
    }[]
}

const RecipientDetails: React.FC<RecipientDetailsProps> = ({ details }) => {
    return (
        <section className='mx-auto mt-4 w-full xs:w-4/5'>
            {details.map((item, index) => {
                const { title, content } = item

                return (
                    content && (
                        <div key={index} className='mb-2 flex justify-between'>
                            <h3 className='text-gray-800'>{title}</h3>
                            <p className='text-sm italic text-sky-500'>{content}</p>
                        </div>
                    )
                )
            })}
        </section>
    )
}

export default RecipientDetails
