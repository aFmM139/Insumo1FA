import React from 'react';
import { Text } from 'react-native';
interface CustomTextProps{
    variant:"small"|"medium"|"large"|"title"|"name"|"nivel"; //tamaño del texto
    dark?:boolean;// Color claro u oscuro
    children: React.ReactNode;//Va dentro de la etiqueta
}

const CustomText = ({variant, dark=false, children}:CustomTextProps) => {
  return (
     <Text className={styleSelector(variant,dark)}>
        {children}
    </Text>
 )
}

function styleSelector(variant:any,dark:boolean){
    let style = ""
    if(dark == false){
        style += "text-white "
    }else{
        style += "text-[#0F172B] "
    }
    
    switch(variant){
        case "small":
            return style + "font-semibold text-sm" ;
        case "medium":
            return style + "font-semibold text-base" ;
        case "large":
            return style + " font-semibold text-xl" ;
        case "title":
            return style + " font-semibold text-3xl text-center " ;
        case "name":
            return style + " mt-2 font-semibold text-xl text-center" ;
        case "nivel":
            return style + " font-semibold text-base text-center text-[#CAD5E2]" ;
    }
}

export default CustomText