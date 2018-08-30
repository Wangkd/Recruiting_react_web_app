

export function getRedirectPath({type, avatar}) {
    //determine the redirect location based on user data
    let url = (type === 'boss') ? '/boss' : '/genius';

    if(!avatar) {
        url += 'info';
    }

    return url;
}