export class Utils {
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static capitalizeFirstLetter(str) {
    var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join(' '); 
  }

  static formatIdPrefix(response){
   return  response.region ? `${response.region.prefix.toUpperCase() }-${ String(response.prefix_id ).padStart(5, '0')}`: 'N/A'
  }

  static isInRegion(response, region){
    return response.region && response.region.prefix === region;
  }

  static getFieldCordinates(response){
    let coordinates = [];
    for(let i = 0; i < response.answers.length; i++){
      for(let j = 0; j < response.answers[i].components.length; j++){
        const formField = response.answers[i].components[j];
        if(formField.type === 'area-mapping' && formField.label.toLowerCase() === 'Farm Size'.toLocaleLowerCase()){
          console.log("form  Field Label: ", formField.label.toLowerCase());
          console.log("form  Field  Length ", Array.from(formField.gpsValues).length);
          coordinates = Array.from(formField.gpsValues).map((gpsValue) => {
            console.log("gpsValue: ", gpsValue);
            return {lat: gpsValue.latitude, lng: gpsValue.longitude}
          });
          break;
        }
      }
    }
    return coordinates.map((gpsValue) => {
      console.log("gpsValue: ", gpsValue);
      return {lat: gpsValue['latitude'], lng:gpsValue['longitude']};
    }); 
  }
}