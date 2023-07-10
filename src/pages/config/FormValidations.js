import { isEmail } from 'validator';

export const GENERATE_ERROR_MESSAGE = (key, type) => {
    const errorType = [
        {
            type: 'valueMissing',
            text: `Mohon lengkapi ${key}`,
        },
        {
            type: 'validateEmail',
            text: `Format Email untuk ${key} salah`,
        },
    ];

    const errorCode = errorType.find(x => x.type === type);
    return errorCode.text;
};

export const VALIDATE_EMAIL = email => isEmail(email);

export const CATCH_ERROR = (e) => {
    let message = 'Unknown error';
    if (typeof e === 'string') message = e;
    if (Object.prototype.hasOwnProperty.call(e, 'message') && typeof e.message === 'string') ({ message } = e);
    if (Object.prototype.hasOwnProperty.call(e, 'error') && typeof e.error === 'string') ({ error: message } = e);
    if (Object.prototype.hasOwnProperty.call(e, 'msg') && typeof e.msg === 'string') ({ msg: message } = e);
    return message;
};
