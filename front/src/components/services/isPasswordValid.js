const isPasswordValid = (password) => {
    const regex = /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;
    return regex.test(password);
}

export default isPasswordValid;