/* eslint-disable no-mixed-operators, no-console, no-eval */
const makeImageStyles = (photoUrls, initImage) => {
    const img = initImage;
    const scale = 0.2;
    const imageStyles = photoUrls.map((url) => {
        // eslint-disable-next-line max-len
        return `background: url(${url}); font-size: ${img.height * scale}px; padding: ${Math.floor(img.height * scale / 4)}px ${Math.floor(img.width * scale / 2)}px; background-size: ${img.width * scale}px ${img.height * scale}px; display: block !important; margin: 10px 0; background-repeat: no-repeat; background-position: center; background-size: contain;`;
    });
    return imageStyles;
};

const makePayloadString = (formattedUser, imageStyles) => {
    const { photo_urls: photoUrls } = formattedUser;
    // Log all available photos but no more than 6 (to avoid line breaks, see scale)
    const photosQuantity = photoUrls.length > 6 ? 6 : photoUrls.length;

    // Result e.g: "%c "+"%c "+"%c "
    let payloadFirstHalf = '"%c "';
    for (let i = 0; i < photosQuantity - 1; i += 1) {
        payloadFirstHalf = payloadFirstHalf.concat('+"%c "');
    }

    // Result e.g: ,"imgStyleStr0","imgStyleStr1","imgStyleStr2"
    let payloadSecondHalf = '';
    for (let i = 0; i < photosQuantity; i += 1) {
        payloadSecondHalf = payloadSecondHalf.concat(`, "${imageStyles[i]}"`); // Test this!
    }

    // Result e.g: console.log("%c " + "%c " + "%c ", "imgStyleStr0","imgStyleStr1","imgStyleStr2");
    const renderingString = `console.log(${payloadFirstHalf + payloadSecondHalf});`;
    return renderingString;
};

const renderProfile = (formattedUser) => {
    const photoUrls = formattedUser.photo_urls;
    const initImage = new Image();

    initImage.onload = () => {
        // Generate array of images' styles
        const imageStyles = makeImageStyles(formattedUser.photo_urls, initImage);
        // Generate rendering string for future eval() call
        const renderingString = makePayloadString(formattedUser, imageStyles);
        // Render profile block in console
        eval(renderingString);
        console.log(`${formattedUser.name}|${formattedUser.age}: ${formattedUser.about_me}`);
        console.log(formattedUser.profile_url);
        console.log(
            '%c                                                                                                                                                 ',
            'background: linear-gradient(#fafa6e, #2a4858); font-size: 6px;',
        );
    };

    // Get the first photo as initializator for others to load
    [initImage.src] = photoUrls;
};

export default renderProfile;
