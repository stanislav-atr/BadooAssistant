const formatUser = (key, value, formattedUser, user) => {
    switch (key) {
    // Formatted user's keys should match corresponding config keys
    case 'age':
        formattedUser.age = user.age;
        break;
    case 'height':
        formattedUser.height = formatHeight(user);
        break;
    case 'about_me':
        formattedUser.about_me = formatAboutMe(value, user);
        break;
    case 'can_vote':
        formattedUser.can_vote = user.my_vote === 2 ? false : true;
        break;
    case 'online':
        formattedUser.online = formatOnlineStatus(user);
        break;
    case 'photos':
        formattedUser.photos = formatPhotoCount(user);
        break;
    case 'relationship':
        formattedUser.relationship = formatRelationship(user);
        break;
    default:
        break;
    }
};

function formatAboutMe(configValue, user) {
    const { include, exclude } = configValue;
    const profileFields = user.profile_fields;
    let profileAboutMe = '';
    // Get profile's about_me text
    for (const field of profileFields) {
        if (field.id && field.id === 'aboutme_text') {
            if (field.display_value === '') {
                return '';
            }
            profileAboutMe = field.display_value.toLowerCase();
        }
    }
    // If there are no keywords to match, return raw string
    if (!include.length && !exclude.length) {
        return profileAboutMe.replace(/\n/g, '');
    }
    // If there are keywords to search for
    if (include.length) {
        for (const keyword of include) {
            if (!profileAboutMe.includes(keyword.toLowerCase())) {
                // There are no keywords that should be included
                return '';
            }
        }
    }
    // If there are keywords to exclude
    if (exclude.length) {
        for (const keyword of exclude) {
            if (profileAboutMe.includes(keyword.toLowerCase())) {
                // There are words that should be excluded
                return '';
            }
        }
    }
    return profileAboutMe.replace(/\n/g, '');
}

function formatHeight(user) {
    // Loop through profile_fields array to find 'appearance' object, get it's display_value
    const profileFields = user.profile_fields;
    let rawAppearance = '';
    for (const field of profileFields) {
        if (field.id && field.id === 'appearance') {
            rawAppearance = field.display_value;
        }
    }
    // Format display_value into height number;
    // Height numbers are the first three characters of rawApearance string;
    // Returns NaN if height is not specified
    const height = parseInt(rawAppearance.substring(0, 3), 10);

    return height;
}

function formatOnlineStatus(user) {
    if (user.online_status === 1) {
        return true;
    }
    return false;
}

function formatPhotoCount(user) {
    const { albums } = user;
    for (const album of albums) {
        // Get native photos count
        if (album.album_type && album.album_type === 2) {
            return album.count_of_photos;
        }
    }
    return 0;
}

function formatRelationship(user) {
    // 10005 - Ready for a relationship
    const tiw = user.tiw_idea.tiw_phrase_id;
    if (tiw && tiw === 10005) {
        return true;
    }
    return false;
}

export default formatUser;
