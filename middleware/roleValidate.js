const ADMIN = "ADMIN";
const SUBADMIN = "SUBADMIN";
const CUSTOMER = "CUSTOMER";

const role = [ADMIN, SUBADMIN, CUSTOMER]

export const roleValidate = (req, res, next) => {
    
    next()
}