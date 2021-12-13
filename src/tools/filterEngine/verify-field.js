const verifyField = (field, configValue, formattedUser) => {
    switch (field) {
    case 'age':
        if (formattedUser.age > configValue) {
            return false;
        }
        break;
    case 'height':
        // Exclude profiles with height not specified
        if (!formattedUser.height || formattedUser.height > configValue) {
            return false;
        }
        break;
    case 'about_me':
        if (!formattedUser.about_me) {
            return false;
        }
        break;
    case 'online':
        if (!formattedUser.online) {
            return false;
        }
        break;
    case 'photos':
        if (formattedUser.photos < configValue) {
            return false;
        }
        break;
    case 'relationship':
        if (!formattedUser.relationship) {
            return false;
        }
        break;
    default:
        break;
    }
    return true;
};

export default verifyField;
