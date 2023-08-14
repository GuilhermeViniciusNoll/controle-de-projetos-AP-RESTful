const validEmailSchema = (data: String): boolean => {
    if (data.includes("@") && data.includes(".") && (data !== "@." && data !== ".@")) return true
    return false
}

export default validEmailSchema