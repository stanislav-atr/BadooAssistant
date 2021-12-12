/** TODO
 * Implement config by voting status
 */
const apiConfig = {
    age: 25,         // Maximum age for user to pass, inclusive
    height: 167,     // Maximum height in cm for user to pass, inclusive
    about_me: {      // Pass profile if "About me" field is present. Filter profiles by keywords with include & exclude like ['keyword1', 'keyword2'].
        include: [],    // Both are case-insensitive
        exclude: [],    // Using excessive amout of keywords or both include and exclude may dramatically decrease number of profiles
    },
    // online: true, // Only get online users
    photos: 2, // Minimum number of profile photos
    // relationship: true, // Only get 'Here to date' profiles
};

// Info, not an actual user object
const evaluationConfigTemplate = {
    // Voting status
    status_vote: '1 - not voted, 2 - liked, dislike?',
    their_vote: '1 - not voted, 2 - they liked, 3 - dislike?',
    // User photos and videos
    "albums['0'].count_of_photos": 'amount of profile photos, any whole number',
    "albums['1'].count_of_photos": 'amount of instagram photos, any whole number',
    photo_count: 1,
    video_count: 'whole number',
    // Allowed actions
    allow_chat: 'false - cant be chatted w/o match, true - can be chatted right away',
    allow_vote: 'true - can be (dis)liked',
    // ?Sometimes wrong gender is not filtered out
    gender: '1 - male, 2 - female',
    name: 'string', // users name
    age: 23, // users age
    // Status
    is_blocked: 'boolean',
    is_deleted: 'boolean',
    is_favourite: 'boolean',
    is_match: 'boolean',
    is_verified: 'boolean',
    profile_complete_percent: 'whole number up to 100',
    // Online status
    online_status: 1,
    online_status_text: "Online now!", // 'Online now!' - user.online_status == 1, "Online 55 mins ago" - online_status = 3, "Online 1 hr ago" - online_status = 3б "Online yesterday" - online_status = 3
    // Profile fields, indexes in array are NOT static and are added uniquely for each user
    profile_fields: [
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "location",
            "type": 1,
            "name": "Current location",
            "display_value": "Moscow",
            "value": "None"
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "aboutme_text",
            "type": 2,
            "name": "About me",
            "display_value": "", // or for example display_value: "Добрость"
            "value": "None"
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "relationship",
            "type": 3,
            "name": "Relationship",
            "display_value": "Single",
            "value": "Single",
            "hp_element": 142
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "sexuality",
            "type": 4,
            "name": "Sexuality",
            "display_value": "Straight",
            "value": "Straight",
            "hp_element": 143
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "appearance",
            "type": 5,
            "name": "Appearance",
            "display_value": "159 cm, brown hair and grey eyes",
            "value": "None"
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "children",
            "type": 7,
            "name": "Children",
            "display_value": "Already have",
            "value": "HavePlenty"
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "smoking",
            "type": 8,
            "name": "Smoking",
            "display_value": "No",
            "value": "DontLike",
            "hp_element": 144
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "drinking",
            "type": 9,
            "name": "Drinking",
            "display_value": "Teetotal",
            "value": "No",
            "hp_element": 140
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "education",
            "type": 10,
            "name": "Education",
            "display_value": "РУДН Медицинский институт",
            "value": "РУДН Медицинский институт"
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "languages",
            "type": 11,
            "name": "I speak",
            "display_value": "Russian",
            "value": "ru",
            "hp_element": 28,
            "value_list": [
                {
                    "$gpb": "badoo.bma.FieldValue",
                    "value": "ru",
                    "display_value": "Russian"
                }
            ]
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "work",
            "type": 12,
            "name": "Work",
            "display_value": "Медицинская сестра",
            "value": "None"
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "height",
            "type": 13,
            "name": "Height",
            "display_value": "159 cm",
            "value": "1590",
            "hp_element": 490
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "eyes",
            "type": 16,
            "name": "Eye colour",
            "display_value": "Grey",
            "value": "Grey"
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "hair",
            "type": 17,
            "name": "Hair colour",
            "display_value": "Brown",
            "value": "Brown"
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "2",
            "type": 26,
            "name": "What kind of music do you like to listen to?",
            "display_value": "I’m easy, I like everything",
            "value": "None",
            "other_display_value": "",
            "icon_url": "",
            "hp_element": 0,
            "is_featured": false
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "3",
            "type": 26,
            "name": "What’s your ideal first date?",
            "display_value": "Something active",
            "value": "None",
            "other_display_value": "",
            "icon_url": "",
            "hp_element": 0,
            "is_featured": false
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "7",
            "type": 26,
            "name": "What do you do when your phone dies?",
            "display_value": "Enjoy the moment and my surroundings",
            "value": "None",
            "other_display_value": "",
            "icon_url": "",
            "hp_element": 0,
            "is_featured": false
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "education_level_array",
            "type": 36,
            "name": "Education level",
            "display_value": "Undergrad student",
            "value": "InColledge",
            "hp_element": 912
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "personality",
            "type": 35,
            "name": "Personality",
            "display_value": "Extrovert",
            "value": "Extravert",
            "hp_element": 1579
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "pet",
            "type": 33,
            "name": "Pets",
            "display_value": "Both cats and dogs",
            "value": "Multiple",
            "hp_element": 1571
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "belief",
            "type": 34,
            "name": "Religion",
            "display_value": "Other",
            "value": "Other",
            "hp_element": 914
        },
        {
            "$gpb": "badoo.bma.ProfileField",
            "id": "zodiac",
            "type": 32,
            "name": "Star sign",
            "display_value": "Taurus",
            "value": "Taurus",
            "hp_element": 905
        }
    ],
    //
    "displayed_about_me['0']": 'string; about me text; ', // "I'm single, straight, 153 cm, have children." - if there is no custom text. Better take this from profile fields
    distance_away: 'value template: "~20 km", "~640 km"',
    interests_in_common: 'whole number, matching interests',
    "system_badges['0'].name": 'one of the possible values: "Just joined"',
    "tiw_idea.tiw_phrase": 'examples: "Here to date"", "Ready for a relationship", "Open to chat"',
    "tiw_idea.tiw_pharse_id": '10003 - Here to date, 10005 - Ready for a relationship, 10002 - Open to chat, 10006 - to see what happens',

};

export default apiConfig;