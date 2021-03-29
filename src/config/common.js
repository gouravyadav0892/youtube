import {APP_NAME} from './constants'

export const FORMAT_STRING = (string, args) => {
    return string
}

export const chooseColor = (seed) => {
    var random = [];
    if(seed < 10) {
        return "#" + ["FF0000","800000","FF00FF","808000","00FF00","008000", "00FFFF", "008080", "0000FF", "FFFF00"][seed];
    } else {
        for (var i = 0; i < 3; i++) {
            random.push(Math.floor(Math.random()*256));
        }
        return 'rgb(' + random.join(', ') + ')';
    }
}

export const hasPermission = (idToken,permission) => {
    var data = idToken.permissions?idToken.permissions:[];
  
    var permission_found = []
    
   
   if(data.length > 0) {
    data = (data)? JSON.parse(data):[]
    
    data.forEach( (element,index) => {
        element.forEach((perm,index)=>{
      //   if(perm['attribute_values']['service_name'] === APP_NAME) {
             if( perm['attribute_values']['service_permissions'].includes(permission)) {
                 permission_found.push(true)
             } else {
                 permission_found.push(false)
             }
      //  }
        })
     });
   }
  
    
    if(permission_found.includes(true)) {
        return true
    } else {
        return false
    }
    
}
   
