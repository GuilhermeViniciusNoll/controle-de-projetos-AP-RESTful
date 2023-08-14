const validIdSchema = (data: string): boolean => {
    return isNaN(Number(data))
}

export default validIdSchema