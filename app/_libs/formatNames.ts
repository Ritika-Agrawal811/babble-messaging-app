export const formatNames = (name: string) => {
    const nameArray = name.split(" ")
    const formattedName = nameArray[0].length > 7 ? `${nameArray[0].slice(0, 7)}...` : nameArray[0]

    return formattedName
}
