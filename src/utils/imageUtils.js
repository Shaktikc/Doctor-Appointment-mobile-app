/**
 * Image utilities for user profile images
 */
const userImages = [
  require("../../assets/service-images/elif-gun.jpg"),
  require("../../assets/service-images/emel-kaya.jpg"),
  require("../../assets/service-images/ege-yilmaz.jpg"),
  require("../../assets/service-images/gokce-demir.jpg"),
  require("../../assets/service-images/zeynep-koc.jpg"),
  require("../../assets/service-images/ezgi-yildirim.jpg"),
  require("../../assets/service-images/busra-aydin.jpg"),
  require("../../assets/service-images/rabia-aydin.jpg"),
  require("../../assets/service-images/ozan-arslan.jpg"),
  require("../../assets/service-images/melisa-bulut.jpg"),
  require("../../assets/service-images/irem-oz.jpg"),
];

export const getRandomUserImage = () => {
  return userImages[Math.floor(Math.random() * userImages.length)];
};

export default userImages;
