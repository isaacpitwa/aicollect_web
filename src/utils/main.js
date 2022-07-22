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
          if(typeof formField.gpsValues !== 'string'){ 
            coordinates = formField.gpsValues.map((gpsValue) => {
              console.log("Utility gpsValue: ", gpsValue);
              return {lat: gpsValue.latitude, lng: gpsValue.longitude}
            });
            break;
          }
        }
      }
    }
    return coordinates
  }

  static getFieldCenter(response){
    let latSum = 0, lngSum =0;
    let coordinates =[];
    for(let i = 0; i < response.answers.length; i++){
      for(let j = 0; j < response.answers[i].components.length; j++){
        const formField = response.answers[i].components[j];
        if(formField.type === 'area-mapping' && formField.label.toLowerCase() === 'Farm Size'.toLocaleLowerCase()){
          if(typeof formField.gpsValues !== 'string'){ 
            coordinates = formField.gpsValues.map((gpsValue) => {
              latSum += gpsValue.latitude;
              lngSum += gpsValue.longitude;
              return {lat: gpsValue.latitude, lng: gpsValue.longitude}
            });
            
            break;
          }
        }
      }
    }
    return {
      lat: latSum/coordinates.length,
      lng: lngSum/coordinates.length
    }
  }
}