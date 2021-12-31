const filteringConfig = {
    //age: 25,         // Maximum age for user to pass, inclusive
    height: 167,     // Maximum height in cm for user to pass, inclusive
    // about_me: {      // Pass profile if "About me" field is present. Filter profiles by keywords with include & exclude like ['keyword1', 'keyword2'].
    //     include: [],    // Both are case-insensitive
    //     exclude: [],    // Using excessive amout of keywords or both include and exclude may dramatically decrease number of profiles
    // },
    // can_vote: true, // Only profiles you can vote for pass.
    // online: true, // Only get online users
    // photos: 2, // Minimum number of profile photos
    // relationship: true, // Only get 'Here to date' profiles
};

export default filteringConfig;