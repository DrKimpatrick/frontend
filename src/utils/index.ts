import jwt from 'jsonwebtoken';

type errorTypeRegister = {
    username: string;
    email: string;
    password: string;
}

type errorTypeLogin = {
    email: string;
    password: string;
}

type errorAddEmploy = {
    companyName : string;
    title: string;
    responsibilities: string;
    accomplishments: string;
    favoriteProject: string;
    supervisor: string;
    date: string;
    skillsUsed: string
}

export const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const passwordRegex = RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/
)

export const validateForm = (errors:errorTypeRegister | errorTypeLogin | errorAddEmploy) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

export const decodeToken = (token: any) => {
    const decodedToken = jwt.decode(token)

    return decodedToken
}