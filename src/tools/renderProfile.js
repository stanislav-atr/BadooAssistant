const renderProfile = (formattedUser) => {
  let img = new Image();
  const scale = 0.3;

  img.onload = () => {
    const imgStyle = `
      display: block !important;
      margin: 10px 0;
      font-size: ${img.height * scale}px;
      padding: ${Math.floor(img.height * scale / 2)}px ${Math.floor(img.width * scale / 2)}px;
      background: url(${formattedUser.avatar_url});
      background-size: ${img.width * scale}px ${img.height * scale}px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    `;
    const textStyle = `
      font-size: 18px;
      color: salmon;
    `;
    const linkStyle = `
      font-size: 18px;
      color: salmon;
    `;  
    console.log('%c ' + `%c\nAbout me: ${formattedUser.about_me}` + `%c${formattedUser.profile_url}`, imgStyle, textStyle, linkStyle);
  }

  img.src = formattedUser.avatar_url;
};

export default renderProfile;