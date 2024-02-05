
// eslint-disable-next-line @typescript-eslint/no-var-requires

import { colors, spacing } from "../config/tailwind";

type colorType ='rose50'|'rose100'|'rose200'|'rose300'|'rose400'|'rose500'|'rose600'|'rose700'|'rose800'|'rose900'|'pink50'|'pink100'|'pink200'|'pink300'|'pink400'|'pink500'|'pink600'|'pink700'|'pink800'|'pink900'|'fuchsia50'|'fuchsia100'|'fuchsia200'|'fuchsia300'|'fuchsia400'|'fuchsia500'|'fuchsia600'|'fuchsia700'|'fuchsia800'|'fuchsia900'|'purple50'|'purple100'|'purple200'|'purple300'|'purple400'|'purple500'|'purple600'|'purple700'|'purple800'|'purple900'|'violet50'|'violet100'|'violet200'|'violet300'|'violet400'|'violet500'|'violet600'|'violet700'|'violet800'|'violet900'|'indigo50'|'indigo100'|'indigo200'|'indigo300'|'indigo400'|'indigo500'|'indigo600'|'indigo700'|'indigo800'|'indigo900'|'blue50'|'blue100'|'blue200'|'blue300'|'blue400'|'blue500'|'blue600'|'blue700'|'blue800'|'blue900'|'lightBlue50'|'lightBlue100'|'lightBlue200'|'lightBlue300'|'lightBlue400'|'lightBlue500'|'lightBlue600'|'lightBlue700'|'lightBlue800'|'lightBlue900'|'darkBlue50'|'darkBlue100'|'darkBlue200'|'darkBlue300'|'darkBlue400'|'darkBlue500'|'darkBlue600'|'darkBlue700'|'darkBlue800'|'darkBlue900'|'cyan50'|'cyan100'|'cyan200'|'cyan300'|'cyan400'|'cyan500'|'cyan600'|'cyan700'|'cyan800'|'cyan900'|'teal50'|'teal100'|'teal200'|'teal300'|'teal400'|'teal500'|'teal600'|'teal700'|'teal800'|'teal900'|'emerald50'|'emerald100'|'emerald200'|'emerald300'|'emerald400'|'emerald500'|'emerald600'|'emerald700'|'emerald800'|'emerald900'|'green50'|'green100'|'green200'|'green300'|'green400'|'green500'|'green600'|'green700'|'green800'|'green900'|'lime50'|'lime100'|'lime200'|'lime300'|'lime400'|'lime500'|'lime600'|'lime700'|'lime800'|'lime900'|'yellow50'|'yellow100'|'yellow200'|'yellow300'|'yellow400'|'yellow500'|'yellow600'|'yellow700'|'yellow800'|'yellow900'|'amber50'|'amber100'|'amber200'|'amber300'|'amber400'|'amber500'|'amber600'|'amber700'|'amber800'|'amber900'|'orange50'|'orange100'|'orange200'|'orange300'|'orange400'|'orange500'|'orange600'|'orange700'|'orange800'|'orange900'|'red50'|'red100'|'red200'|'red300'|'red400'|'red500'|'red600'|'red700'|'red800'|'red900'|'warmGray50'|'warmGray100'|'warmGray200'|'warmGray300'|'warmGray400'|'warmGray500'|'warmGray600'|'warmGray700'|'warmGray800'|'warmGray900'|'trueGray50'|'trueGray100'|'trueGray200'|'trueGray300'|'trueGray400'|'trueGray500'|'trueGray600'|'trueGray700'|'trueGray800'|'trueGray900'|'coolGray50'|'coolGray100'|'coolGray200'|'coolGray300'|'coolGray400'|'coolGray500'|'coolGray600'|'coolGray700'|'coolGray800'|'coolGray900'|'blueGray50'|'blueGray100'|'blueGray200'|'blueGray300'|'blueGray400'|'blueGray500'|'blueGray600'|'blueGray700'|'blueGray800'|'blueGray900'|'tertiary50'|'tertiary100'|'tertiary200'|'tertiary300'|'tertiary400'|'tertiary500'|'tertiary600'|'tertiary700'|'tertiary800'|'tertiary900'|'error00'|'error50'|'error100'|'error200'|'error300'|'error400'|'error500'|'error600'|'error700'|'error800'|'error900'|'error950'|'success0'|'success50'|'success100'|'success200'|'success300'|'success400'|'success500'|'success600'|'success700'|'success800'|'success900'|'success950'|'warning50'|'warning100'|'warning200'|'warning300'|'warning400'|'warning500'|'warning600'|'warning700'|'warning800'|'warning900'|'info50'|'info100'|'info200'|'info300'|'info400'|'info500'|'info600'|'info700'|'info800'|'info900'|'light50'|'light100'|'light200'|'light300'|'light400'|'light500'|'light600'|'light700'|'light800'|'light900'|'primary50'|'primary100'|'primary200'|'primary300'|'primary400'|'primary500'|'primary600'|'primary700'|'primary800'|'primary900'|'primary950'|'secondary0'|'secondary50'|'secondary100'|'secondary200'|'secondary300'|'secondary400'|'secondary500'|'secondary600'|'secondary700'|'secondary800'|'secondary900'|'secondary950'|'textLight0'|'textLight50'|'textLight100'|'textLight200'|'textLight300'|'textLight400'|'textLight500'|'textLight600'|'textLight700'|'textLight800'|'textLight900'|'textLight950'|'textDark0'|'textDark50'|'textDark100'|'textDark200'|'textDark300'|'textDark400'|'textDark500'|'textDark600'|'textDark700'|'textDark800'|'textDark900'|'textDark950'|'borderDark0'|'borderDark50'|'borderDark100'|'borderDark200'|'borderDark300'|'borderDark400'|'borderDark500'|'borderDark600'|'borderDark700'|'borderDark800'|'borderDark900'|'borderDark950'|'borderLight0'|'borderLight50'|'borderLight100'|'borderLight200'|'borderLight300'|'borderLight400'|'borderLight500'|'borderLight600'|'borderLight700'|'borderLight800'|'borderLight900'|'borderLight950'|'backgroundDark0'|'backgroundDark50'|'backgroundDark100'|'backgroundDark200'|'backgroundDark300'|'backgroundDark400'|'backgroundDark500'|'backgroundDark600'|'backgroundDark700'|'backgroundDark800'|'backgroundDark900'|'backgroundDark950'|'backgroundLight0'|'backgroundLight50'|'backgroundLight100'|'backgroundLight200'|'backgroundLight300'|'backgroundLight400'|'backgroundLight500'|'backgroundLight600'|'backgroundLight700'|'backgroundLight800'|'backgroundLight900'|'backgroundLight950'|'backgroundLightError'|'backgroundDarkError'|'backgroundLightWarning'|'backgroundDarkWarning'|'backgroundLightSuccess'|'backgroundDarkSuccess'|'backgroundLightInfo'|'backgroundDarkInfo'|'backgroundLightMuted'|'backgroundDarkMuted'|'primary0'|'primary2'|'white'|'black'|'text1'|'text2'|'border'|'input'|'alert'|'bg'|'processing'|'success'|'error'|'disable'|'lightBlue'|'darkBlue'|'modal'
type sizeType = '0'|'0'|'1'|'1'|'2'|'2'|'3'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'14'|'16'|'20'|'24'|'28'|'32'|'36'|'40'|'44'|'48'|'52'|'56'|'60'|'64'|'72'|'80'|'96'
type alphaPercentage = number;

interface ITheme {
    colors:{
        [key:string] : string
    },
    spacing :{
        [key:string] : string
    },
}

const theme:ITheme = {
    colors,
    spacing,
}

export const useToken = (felid: 'colors'|'size', value: colorType | sizeType, alpha?: alphaPercentage):string => {
  
  // handle color
  if(felid==='colors'){
    if(alpha) return hexToRGBA(theme['colors'][value],alpha);
    return theme['colors'][value].toString();
  }

  // handle size
  if(felid ==='size') return theme['spacing'][value].toString()

  return ""
};



function hexToRGBA(hex: string, alpha: number) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (!alpha) alpha = 1;

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha/100 + ')';
}